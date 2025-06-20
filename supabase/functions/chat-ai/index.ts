
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openRouterApiKey = Deno.env.get('OPENAI_API_KEY'); // Using the same secret name for simplicity

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, legalIssue, language } = await req.json();

    console.log('Received chat request:', { message, legalIssue, language });

    // Enhanced system prompt for better legal guidance
    const systemPrompt = `You are LawGPT, an expert legal AI assistant specializing in providing comprehensive legal guidance and information. 

    Current Context:
    - Legal Issue: ${legalIssue}
    - Language: ${language === 'hi' ? 'Hindi' : language === 'te' ? 'Telugu' : 'English'}
    
    Instructions:
    1. Provide detailed, accurate legal information relevant to the user's specific legal issue
    2. Respond in ${language === 'hi' ? 'Hindi' : language === 'te' ? 'Telugu' : 'English'} language
    3. Structure your responses clearly with actionable guidance
    4. Include relevant legal concepts, procedures, and potential next steps
    5. Always include a disclaimer that this is informational guidance and users should consult qualified attorneys for specific legal matters
    6. Be empathetic and professional in your tone
    7. If the question is not legal-related, gently redirect to legal topics while still being helpful
    
    Focus areas for ${legalIssue}:
    - Relevant laws and regulations
    - Common procedures and requirements
    - Rights and obligations
    - Potential remedies and solutions
    - Documentation requirements
    - Timeline considerations`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openRouterApiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://lovable.dev',
        'X-Title': 'LawGPT Legal Assistant',
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3.5-sonnet',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      console.error('OpenRouter API error:', response.status, response.statusText);
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('OpenRouter API response received');
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Unexpected API response structure:', data);
      throw new Error('Invalid response structure from OpenRouter API');
    }

    const aiResponse = data.choices[0].message.content;
    console.log('AI response generated successfully');

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat-ai function:', error);
    
    // Provide a helpful fallback response
    const fallbackResponse = `I apologize, but I'm experiencing technical difficulties at the moment. For ${legalIssue} related questions, I recommend consulting with a qualified attorney who can provide specific guidance for your situation. Please try again in a moment, or contact legal aid services in your area for immediate assistance.`;
    
    return new Response(JSON.stringify({ 
      response: fallbackResponse,
      error: 'Technical difficulties - please try again'
    }), {
      status: 200, // Return 200 to show fallback message instead of error
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
