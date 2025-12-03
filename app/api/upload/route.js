import { extractTextFromPDF } from '@/lib/extract-pdf';
import { analyzeReport } from '@/lib/analyze-report';
import { sendActionPlan } from '@/lib/send-email';

export async function POST(request) {
  console.log('=== Upload API called ===');
  
  try {
    // 1. Extract form data
    const formData = await request.formData();
    const file = formData.get('file');
    const email = formData.get('email');
    const sessionId = formData.get('session_id');
    
    console.log('Received:', { 
      filename: file?.name, 
      size: file?.size, 
      email, 
      sessionId 
    });
    
    // 2. Validation
    if (!file || !email || !sessionId) {
      return Response.json(
        { error: 'Missing required fields' }, 
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
    
    // 3. Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    console.log('File converted to buffer');
    
    // 4. Extract text from PDF
    console.log('Extracting text from PDF...');
    const extraction = await extractTextFromPDF(buffer);
    
    if (!extraction.success) {
      return Response.json(
        { error: `PDF extraction failed: ${extraction.error}` }, 
        { status: 500 }
      );
    }
    
    console.log(`Extracted ${extraction.text.length} characters from ${extraction.pages} pages`);
    
    // 5. Analyze with AI
    console.log('Analyzing report with AI...');
    const analysis = await analyzeReport(extraction.text);
    
    if (!analysis.success) {
      return Response.json(
        { error: `AI analysis failed: ${analysis.error}` }, 
        { status: 500 }
      );
    }
    
    console.log(`Analysis complete: ${analysis.data.action_items?.length || 0} action items`);
    
    // 6. Send email
    console.log('Sending email...');
    const emailResult = await sendActionPlan(email, analysis.data);
    
    if (!emailResult.success) {
      return Response.json(
        { error: `Email delivery failed: ${emailResult.error}` }, 
        { status: 500 }
      );
    }
    
    console.log('=== Processing complete ===');
    
    // 7. Success response
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
    return Response.json(
      { error: 'Processing failed. Please try again or contact support.' }, 
      { status: 500 }
    );
  }
}
