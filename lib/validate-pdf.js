/**
 * PDF Content Validation
 * Ensures uploaded PDF is actually an OFSTED report
 * Prevents waste of AI credits on random PDFs
 */

/**
 * Validate that PDF content is an OFSTED report
 */
export function validateOFSTEDReport(textContent) {
  if (!textContent || textContent.length < 500) {
    return {
      valid: false,
      reason: 'PDF does not contain enough text',
      code: 'TEXT_TOO_SHORT'
    };
  }

  // Check for OFSTED indicators
  const indicators = [
    'ofsted',
    'inspection',
    'children\'s home',
    'quality standard',
    'judgement',
    'overall effectiveness',
  ];

  const lowerText = textContent.toLowerCase();
  const foundIndicators = indicators.filter(indicator => 
    lowerText.includes(indicator)
  );

  if (foundIndicators.length < 2) {
    return {
      valid: false,
      reason: 'PDF does not appear to be an OFSTED inspection report. Please check you\'ve uploaded the correct document.',
      code: 'NOT_OFSTED_REPORT',
      details: `Expected keywords: ${foundIndicators.join(', ')}`
    };
  }

  // Check for typical OFSTED report length (usually 20-100KB of text)
  const textLength = textContent.length;
  if (textLength < 5000) {
    return {
      valid: false,
      reason: 'PDF is too short to be a complete OFSTED report',
      code: 'REPORT_TOO_SHORT',
      details: `Report should be ~5000-50000 characters, got ${textLength}`
    };
  }

  if (textLength > 500000) {
    return {
      valid: false,
      reason: 'PDF is too large (possibly corrupted or wrong file)',
      code: 'REPORT_TOO_LARGE',
      details: `Report should be ~5000-50000 characters, got ${textLength}`
    };
  }

  return {
    valid: true,
    indicators: foundIndicators,
    textLength,
    confidence: (foundIndicators.length / indicators.length) * 100
  };
}
