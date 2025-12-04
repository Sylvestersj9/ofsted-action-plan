import { extractTextFromPDF } from '@/lib/extract-pdf';
import { analyzeReport } from '@/lib/analyze-report';
import { sendActionPlan } from '@/lib/send-email';
import { recordPayment, markPaymentAsUsed, validatePaymentUsage, recordUpload, updateUploadStatus, countUploadsByEmail } from '@/lib/db';
import { validateOFSTEDReport } from '@/lib/validate-pdf';
import { checkRateLimit } from '@/lib/rate-limit';

export async function POST(request) {
  console.log('=== Upload API called ===');
  
  try {
    // 1. Extract form data
    const formData = await request.formData();
    const file = formData.get('file');
    const email = formData.get('email');
    const homeName = formData.get('homeName');
    const sessionId = formData.get('session_id');
    
    console.log('Received:', { 
      filename: file?.name, 
      size: file?.size, 
      email, 
      sessionId 
    });
    
    // 2. Check rate limit (now using persistent Vercel KV in prod, Map fallback in dev)
    const rateLimitOk = await checkRateLimit(email);
    if (!rateLimitOk) {
      return Response.json(
        { error: 'Too many upload attempts. Please wait a minute before trying again.' }, 
        { status: 429 }
      );
    }
    
    // 3. Validation (note: sessionId may be omitted for first-time free users)
    if (!file || !email || !homeName) {
      return Response.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      );
    }

    // Determine if this is the user's first report (eligible for free report)
    const uploadsCount = await countUploadsByEmail(email);
    const isFirstReport = uploadsCount === 0;

    // If this is NOT the first report, sessionId is required
    if (!isFirstReport && !sessionId) {
      return Response.json(
        { error: 'Missing payment session. Please complete payment.' },
        { status: 400 }
      );
    }
    
    if (file.type !== 'application/pdf') {
      return Response.json(
        { error: 'Only PDF files allowed' }, 
        { status: 400 }
      );
    }
    
    if (file.size > 10 * 1024 * 1024) {
      return Response.json(
        { error: 'File too large (max 10MB)' }, 
        { status: 400 }
      );
    }

    if (file.size < 10000) {
      return Response.json(
        { error: 'File too small. Please upload a valid OFSTED report.' }, 
        { status: 400 }
      );
    }
    
    // 4. Verify payment session (unless this is the user's first free report)
    let isFreeReport = false;
    if (isFirstReport) {
      console.log(`First report for ${email} — processing as free report`);
      isFreeReport = true;
    } else {
      console.log('Verifying payment session with Stripe...');
      try {
        const verifyResponse = await fetch(new URL('/api/verify-payment', request.url), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId })
        });
        
        const verifyData = await verifyResponse.json();
        
        // STRICT: If verification fails for ANY reason, reject the upload
        if (!verifyData.verified || verifyResponse.status !== 200) {
          console.error(`SECURITY: Payment verification failed for session: ${sessionId}`);
          console.error(`Verification response: ${JSON.stringify(verifyData)}`);
          return Response.json(
            { error: 'Payment verification failed. Please ensure you have completed payment.' }, 
            { status: 403 }
          );
        }
        
        console.log(`✓ Payment verified for session ${sessionId}`);
      } catch (verifyError) {
        // FAIL SECURE: If verification endpoint is unreachable, deny access
        console.error('CRITICAL: Payment verification endpoint error:', verifyError);
        return Response.json(
          { error: 'Payment verification service unavailable. Please try again.' }, 
          { status: 503 }
        );
      }
    }
    
    // 4.5. Record payment to database (for fraud prevention and auditing)
    if (!isFreeReport) {
      console.log('Recording payment to database...');
      try {
        await recordPayment(sessionId, email);
        console.log(`✓ Payment recorded: ${sessionId}`);
      } catch (dbError) {
        console.error('Warning: Failed to record payment:', dbError);
        // Don't fail the request, but log it - database recording is best-effort
      }
    }
    
    // 4.6. Validate payment hasn't been used (prevent session reuse fraud)
    if (!isFreeReport) {
      console.log('Validating payment usage...');
      const paymentUsageValidation = await validatePaymentUsage(sessionId, email);
      if (!paymentUsageValidation.valid) {
        console.warn('Payment usage validation failed:', paymentUsageValidation.reason);
        return Response.json(
          { error: paymentUsageValidation.reason }, 
          { status: 403 }
        );
      }
      console.log(`✓ Payment session ${sessionId} cleared for use`);
    }
    
    // 5. Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    console.log('File converted to buffer');
    
    // 6. Extract text from PDF
    console.log('Extracting text from PDF...');
    const extraction = await extractTextFromPDF(buffer);
    
    if (!extraction.success) {
      console.error('PDF extraction failed:', extraction.error);
      return Response.json(
        { error: 'Could not read PDF. Please ensure it is a valid OFSTED report.' }, 
        { status: 422 }
      );
    }

    if (extraction.text.length < 500) {
      return Response.json(
        { error: 'PDF does not contain enough text. Please check if it is a valid OFSTED report.' }, 
        { status: 422 }
      );
    }
    
    console.log(`Extracted ${extraction.text.length} characters from ${extraction.pages} pages`);
    
    // 7. Validate PDF is actually an OFSTED report (before wasting AI credits)
    console.log('Validating PDF content...');
    const pdfValidation = validateOFSTEDReport(extraction.text);
    
    if (!pdfValidation.valid) {
      console.warn('PDF validation failed:', pdfValidation.reason);
      return Response.json(
        { error: pdfValidation.reason }, 
        { status: 422 }
      );
    }
    
    console.log(`✓ PDF validated as OFSTED report (confidence: ${Math.round(pdfValidation.confidence)}%)`);
    
    // 8. Analyze with AI
    console.log('Analyzing report with AI...');
    const analysis = await analyzeReport(extraction.text);
    
    if (!analysis.success) {
      console.error('AI analysis failed:', analysis.error);
      return Response.json(
        { error: 'Analysis failed. Please check your PDF and try again.' }, 
        { status: 500 }
      );
    }
    
    console.log(`Analysis complete: ${analysis.data.action_items?.length || 0} action items`);
    
    // 9. Mark payment as used (prevent reuse) — only for paid reports
    if (!isFreeReport) {
      await markPaymentAsUsed(sessionId);
      console.log(`Payment ${sessionId} marked as used`);
    } else {
      console.log('Free report processed — no payment to mark as used');
    }
    
    // 10. Send email
    console.log('Sending email...');
    const emailResult = await sendActionPlan({
      email,
      homeName,
      analysis: analysis.data
    });
    
    if (!emailResult.success) {
      console.error('Email delivery failed:', emailResult.error);
      return Response.json(
        { error: 'Email delivery failed. Your action plan was generated but could not be sent. Please try again.' }, 
        { status: 500 }
      );
    }
    
    // Record upload to database for audit trail (mark as free if applicable)
    await recordUpload(isFreeReport ? null : sessionId, email, file.name, file.size, isFreeReport);
    console.log(`Upload recorded: ${sessionId || 'free'} from ${email}`);
    
    console.log('=== Processing complete ===');
    
    // 11. Success response
    return Response.json({ 
      success: true, 
      message: 'Your action plan has been sent to your email.',
      summary: {
        action_items: analysis.data.action_items?.length || 0,
        pages_analyzed: extraction.pages,
        email_sent: true
      }
    });
    
  } catch (error) {
    console.error('=== Upload error ===', error);
    
    // Return user-friendly error
    const errorMessage = error.message || 'Processing failed';
    if (errorMessage.includes('timeout') || errorMessage.includes('deadline')) {
      return Response.json(
        { error: 'Processing took too long. Please try again with a smaller PDF or shorter report.' }, 
        { status: 504 }
      );
    }
    
    return Response.json(
      { error: 'Processing failed. Please try again or contact support@ziantra.co.uk.' }, 
      { status: 500 }
    );
  }
}
