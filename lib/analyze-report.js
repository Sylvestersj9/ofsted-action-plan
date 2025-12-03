// Dynamic import based on AI_PROVIDER environment variable

export async function analyzeReport(reportText) {
  const provider = process.env.AI_PROVIDER || 'gemini';
  
  if (provider === 'anthropic') {
    const { analyzeReport: anthropicAnalyze } = await import('./analyze-report-anthropic.js');
    return anthropicAnalyze(reportText);
  } else if (provider === 'openai') {
    const { analyzeReport: openaiAnalyze } = await import('./analyze-report-openai.js');
    return openaiAnalyze(reportText);
  } else {
    // Default to Gemini (free!)
    const { analyzeReport: geminiAnalyze } = await import('./analyze-report-gemini.js');
    return geminiAnalyze(reportText);
  }
}
