import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function analyzeReport(reportText) {
  const prompt = `You are analyzing an OFSTED children's home inspection report.
Extract ALL requirements, recommendations, and areas for improvement.

REPORT TEXT:
${reportText.substring(0, 50000)}

For each action item, provide:
1. Exact quote from report
2. Specific actionable task (clear, measurable)
3. Priority level
4. Category
5. Evidence needed
6. Confidence score (0-1)

Return ONLY valid JSON in this format:
{
  "report_metadata": {
    "home_name": "string or Unknown",
    "inspection_date": "string or Unknown",
    "overall_grade": "Outstanding|Good|Requires Improvement|Inadequate|Unknown"
  },
  "action_items": [
    {
      "quote": "exact text from report",
      "task": "specific measurable task",
      "priority": "immediate|short-term|ongoing",
      "category": "Safeguarding|Health & Safety|Education|Behavior Support|Leadership|Premises|Staffing",
      "evidence_needed": "what documentation proves completion",
      "confidence": 0.95
    }
  ],
  "strengths": ["list of positive findings"],
  "critical_issues": ["list of urgent concerns"]
}

RULES:
- Only extract what's explicitly in the report
- Be specific in tasks (not generic)
- Flag items with confidence < 0.85
- Do not hallucinate`;

  try {
    console.log('Sending to OpenAI...');
    
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      response_format: { type: 'json_object' }
    });
    
    const result = JSON.parse(response.choices[0].message.content);
    console.log(`Analysis complete: ${result.action_items?.length || 0} items found`);
    
    return { success: true, data: result };
  } catch (error) {
    console.error('OpenAI analysis failed:', error);
    return { success: false, error: error.message };
  }
}
