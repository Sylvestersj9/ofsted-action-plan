// Domain warmup script - send test emails to establish sender reputation
import { Resend } from 'resend';

const resend = new Resend('re_i9EYY36q_3h51se7ULyetXn2kL5wySD45');

async function sendWarmupEmail(toEmail, count) {
  try {
    console.log(`\nSending warmup email ${count}...`);
    
    const { data, error } = await resend.emails.send({
      from: 'Ziantra Reports <reports@ziantra.co.uk>',
      to: [toEmail],
      subject: `Domain Warmup Test ${count} - Ziantra Reports`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>Domain Warmup Test Email ${count}</h2>
          <p>This is a test email to warm up the reports@ziantra.co.uk domain.</p>
          <p>If you receive this email in your inbox (not spam), the domain is working correctly!</p>
          <p><strong>Test Number:</strong> ${count}</p>
          <p><strong>Sent from:</strong> Ziantra Reports &lt;reports@ziantra.co.uk&gt;</p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px;">
            This is a test email for domain warmup. You can safely ignore or delete this message.
          </p>
        </div>
      `,
      text: `
Domain Warmup Test Email ${count}

This is a test email to warm up the reports@ziantra.co.uk domain.
If you receive this email in your inbox (not spam), the domain is working correctly!

Test Number: ${count}
Sent from: Ziantra Reports <reports@ziantra.co.uk>

---
This is a test email for domain warmup. You can safely ignore or delete this message.
      `,
      replyTo: 'reports@ziantra.co.uk',
    });
    
    if (error) {
      console.error(`❌ Email ${count} failed:`, error);
      return false;
    }
    
    console.log(`✅ Email ${count} sent successfully! ID: ${data.id}`);
    return true;
  } catch (error) {
    console.error(`❌ Error sending email ${count}:`, error.message);
    return false;
  }
}

async function warmupDomain() {
  console.log('🔥 Starting domain warmup for reports@ziantra.co.uk\n');
  console.log('This will send 5 test emails to janvesylvester@gmail.com');
  console.log('Wait 30 seconds between each email to simulate natural sending patterns.\n');
  
  const testEmail = 'janvesylvester@gmail.com';
  const emailCount = 5;
  const delaySeconds = 30;
  
  for (let i = 1; i <= emailCount; i++) {
    await sendWarmupEmail(testEmail, i);
    
    if (i < emailCount) {
      console.log(`⏳ Waiting ${delaySeconds} seconds before next email...`);
      await new Promise(resolve => setTimeout(resolve, delaySeconds * 1000));
    }
  }
  
  console.log('\n✅ Domain warmup complete!');
  console.log('\nNext steps:');
  console.log('1. Check your inbox for all 5 test emails');
  console.log('2. Mark them as "Not Spam" if they land in spam');
  console.log('3. Reply to one or two of them (helps with reputation)');
  console.log('4. Wait 24 hours before sending production emails');
  console.log('\nThis helps establish sender reputation and improves deliverability.');
}

warmupDomain();
