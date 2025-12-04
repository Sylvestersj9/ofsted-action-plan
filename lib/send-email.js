import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendActionPlan(params) {
  // Handle both old format (email, analysisData) and new format ({ email, homeName, analysis })
  let email, analysisData, homeName;
  
  if (typeof params === 'string') {
    // Old format: sendActionPlan(email, analysisData)
    email = params;
    analysisData = arguments[1];
    homeName = 'Your Home';
  } else {
    // New format: sendActionPlan({ email, homeName, analysis })
    email = params.email;
    analysisData = params.analysis;
    homeName = params.homeName || 'Your Home';
  }
  
  const { report_metadata, action_items, strengths, critical_issues } = analysisData;
  
  // Categorize by priority
  const immediate = action_items.filter(i => i.priority === 'immediate');
  const shortTerm = action_items.filter(i => i.priority === 'short-term');
  const ongoing = action_items.filter(i => i.priority === 'ongoing');
  
  // Generate action item rows
  let actionItemRows = '';
  action_items.forEach((item, index) => {
    const priorityBadge = item.priority === 'immediate' 
      ? '<span style="display: inline-block; padding: 4px 12px; background: #fee2e2; color: #991b1b; border-radius: 4px; font-size: 12px; font-weight: 600;">IMMEDIATE</span>'
      : item.priority === 'short-term'
      ? '<span style="display: inline-block; padding: 4px 12px; background: #fef3c7; color: #92400e; border-radius: 4px; font-size: 12px; font-weight: 600;">SHORT-TERM</span>'
      : '<span style="display: inline-block; padding: 4px 12px; background: #dbeafe; color: #1e40af; border-radius: 4px; font-size: 12px; font-weight: 600;">ONGOING</span>';
    
    const confidenceWarning = item.confidence < 0.85 
      ? `<div style="margin-top: 8px; padding: 6px 10px; background: #fef3c7; border-left: 3px solid #f59e0b; font-size: 12px; color: #92400e;">Confidence: ${Math.round(item.confidence * 100)}% - Verify manually</div>`
      : '';
    
    actionItemRows += `
      <tr style="background: ${index % 2 === 0 ? '#ffffff' : '#f9fafb'};">
        <td style="padding: 16px 12px; border: 1px solid #e5e7eb; font-weight: 600; color: #6b7280; font-size: 13px; vertical-align: top;">AI${index + 1}</td>
        <td style="padding: 16px 12px; border: 1px solid #e5e7eb; vertical-align: top;">
          <div style="font-weight: 600; color: #111827; margin-bottom: 8px; font-size: 14px;">${item.task}</div>
          <div style="font-style: italic; color: #6b7280; font-size: 13px; line-height: 1.5;">"${item.quote}"</div>
          ${confidenceWarning}
        </td>
        <td style="padding: 16px 12px; border: 1px solid #e5e7eb; color: #374151; font-size: 13px; vertical-align: top;">${item.category}</td>
        <td style="padding: 16px 12px; border: 1px solid #e5e7eb; vertical-align: top; text-align: center;">${priorityBadge}</td>
        <td style="padding: 16px 12px; border: 1px solid #e5e7eb; color: #374151; font-size: 13px; line-height: 1.5; vertical-align: top;">${item.evidence_needed}</td>
      </tr>
    `;
  });
  
  const htmlEmail = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OFSTED Action Plan Report</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" style="max-width: 900px; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
          
          <!-- Header with Logo -->
          <tr>
            <td style="text-align: center; padding: 32px 40px; background-color: #ffffff; border-bottom: 2px solid #e5e7eb;">
              <img src="https://ziantra.co.uk/favicon.svg" alt="Ziantra" style="height: 60px; width: 60px; margin-bottom: 10px; border-radius: 50%;" />
              <h1 style="margin: 8px 0 0 0; font-size: 24px; color: #1f2937; font-weight: 600;">Ofsted Action Plan Report</h1>
              <p style="margin: 5px 0 0 0; font-size: 14px; color: #6b7280;">Powered by Ziantra</p>
            </td>
          </tr>
          
          <!-- Report Metadata -->
          <tr>
            <td style="padding: 24px 40px; background-color: #f9fafb;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e5e7eb; background-color: #ffffff;">
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151; font-size: 13px; width: 180px;">Children's Home</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; color: #111827; font-size: 14px;">${report_metadata.home_name || 'Not specified'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151; font-size: 13px;">Inspection Date</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; color: #111827; font-size: 14px;">${report_metadata.inspection_date || 'Not specified'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151; font-size: 13px;">Overall Grade</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; color: #111827; font-size: 14px;">${report_metadata.overall_grade || 'Not specified'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; font-weight: 600; color: #374151; font-size: 13px;">Total Action Items</td>
                  <td style="padding: 12px 16px; color: #111827; font-size: 14px; font-weight: 600;">${action_items.length}</td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Summary Stats -->
          <tr>
            <td style="padding: 20px 40px; background-color: #ffffff;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 12px; text-align: center; border: 1px solid #e5e7eb; background-color: #fee2e2;">
                    <div style="font-size: 28px; font-weight: 700; color: #991b1b; margin-bottom: 4px;">${immediate.length}</div>
                    <div style="font-size: 12px; font-weight: 600; color: #991b1b; text-transform: uppercase;">Immediate</div>
                  </td>
                  <td style="width: 16px;"></td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #e5e7eb; background-color: #fef3c7;">
                    <div style="font-size: 28px; font-weight: 700; color: #92400e; margin-bottom: 4px;">${shortTerm.length}</div>
                    <div style="font-size: 12px; font-weight: 600; color: #92400e; text-transform: uppercase;">Short-Term</div>
                  </td>
                  <td style="width: 16px;"></td>
                  <td style="padding: 12px; text-align: center; border: 1px solid #e5e7eb; background-color: #dbeafe;">
                    <div style="font-size: 28px; font-weight: 700; color: #1e40af; margin-bottom: 4px;">${ongoing.length}</div>
                    <div style="font-size: 12px; font-weight: 600; color: #1e40af; text-transform: uppercase;">Ongoing</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Action Items Table -->
          <tr>
            <td style="padding: 32px 40px;">
              <h2 style="margin: 0 0 20px 0; font-size: 18px; font-weight: 700; color: #111827;">Action Items</h2>
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border: 1px solid #e5e7eb;">
                <thead>
                  <tr style="background-color: #f9fafb;">
                    <th style="padding: 12px; border: 1px solid #e5e7eb; text-align: left; font-weight: 600; color: #374151; font-size: 13px; text-transform: uppercase;">ID</th>
                    <th style="padding: 12px; border: 1px solid #e5e7eb; text-align: left; font-weight: 600; color: #374151; font-size: 13px; text-transform: uppercase;">Action Item</th>
                    <th style="padding: 12px; border: 1px solid #e5e7eb; text-align: left; font-weight: 600; color: #374151; font-size: 13px; text-transform: uppercase;">Category</th>
                    <th style="padding: 12px; border: 1px solid #e5e7eb; text-align: left; font-weight: 600; color: #374151; font-size: 13px; text-transform: uppercase;">Priority</th>
                    <th style="padding: 12px; border: 1px solid #e5e7eb; text-align: left; font-weight: 600; color: #374151; font-size: 13px; text-transform: uppercase;">Evidence Needed</th>
                  </tr>
                </thead>
                <tbody>
                  ${actionItemRows}
                </tbody>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 32px 40px; background-color: #f9fafb; border-top: 1px solid #e5e7eb; text-align: center;">
              <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: #374151;">Generated by Ziantra Ofsted Action Plan Generator</p>
              <p style="margin: 0 0 16px 0; font-size: 13px; color: #6b7280;">
                Support: <a href="mailto:support@ziantra.co.uk" style="color: #2563eb; text-decoration: none;">support@ziantra.co.uk</a>
              </p>
              <p style="margin: 0; font-size: 12px; color: #9ca3af; line-height: 1.6;">
                This is an AI-generated action plan. Always verify critical items manually.<br>
                Report generated on ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  // Generate plain text version
  const plainText = `
Ofsted ACTION PLAN REPORT
Generated by Ziantra

REPORT DETAILS
Children's Home: ${report_metadata.home_name || 'Not specified'}
Inspection Date: ${report_metadata.inspection_date || 'Not specified'}
Overall Grade: ${report_metadata.overall_grade || 'Not specified'}
Total Action Items: ${action_items.length}

SUMMARY
Immediate Actions: ${immediate.length}
Short-Term Actions: ${shortTerm.length}
Ongoing Actions: ${ongoing.length}

ACTION ITEMS
${action_items.map((item, index) => `
AI${index + 1} | ${item.priority.toUpperCase()}
Task: ${item.task}
Category: ${item.category}
Quote: "${item.quote}"
Evidence Needed: ${item.evidence_needed}
${item.confidence < 0.85 ? `⚠ Confidence: ${Math.round(item.confidence * 100)}% - Verify manually` : ''}
`).join('\n---\n')}

---
Generated by Ziantra Ofsted Action Plan Generator
Support: support@ziantra.co.uk
This is an AI-generated action plan. Always verify critical items manually.
Report generated on ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
`;

  try {
    console.log(`Sending email to ${email}...`);
    
    const { data, error } = await resend.emails.send({
      from: 'Ziantra Reports <reports@ziantra.co.uk>',
      to: [email],
      subject: 'Your Ofsted Inspection Action Plan Report',
      html: htmlEmail,
      text: plainText,
      replyTo: 'support@ziantra.co.uk',
      tags: [
        { name: 'category', value: 'action-plan' },
        { name: 'type', value: 'ofsted-report' }
      ],
    });
    
    if (error) {
      console.error('Email send failed:', error);
      return { success: false, error: error.message };
    }
    
    console.log('Email sent successfully:', data.id);
    return { success: true, id: data.id };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error: error.message };
  }
}
