import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

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
    console.log('Sending to Google Gemini...');
    
    // Use gemini-2.0-flash - free and fast model
    const model = genAI.getGenerativeModel({ 
      model: 'models/gemini-2.0-flash',
      generationConfig: {
        temperature: 0.3,
        responseMimeType: "application/json"
      }
    });
    
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    // Parse JSON from response
    const data = JSON.parse(text);
    console.log(`Analysis complete: ${data.action_items?.length || 0} items found`);
    
    return { success: true, data: data };
  } catch (error) {
    console.error('Gemini analysis failed:', error);
    return { success: false, error: error.message };
  }
}
