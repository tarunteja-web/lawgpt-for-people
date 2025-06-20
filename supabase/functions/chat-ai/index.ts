
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

    // Enhanced system prompt for concise legal guidance
    const systemPrompt = `You are LawGPT, a concise legal AI assistant. Give SHORT, DIRECT answers.

    Current Context:
    - Legal Issue: ${legalIssue}
    - Language: ${language === 'hi' ? 'Hindi' : language === 'te' ? 'Telugu' : 'English'}
    
    Instructions:
    1. Keep responses under 150 words
    2. Get straight to the point - no lengthy introductions
    3. Provide only essential legal information relevant to ${legalIssue}
    4. Use bullet points for multiple items
    5. Respond in ${language === 'hi' ? 'Hindi' : language === 'te' ? 'Telugu' : 'English'}
    6. Include brief disclaimer: "Consult a qualified attorney for specific advice"
    7. Be direct and actionable
    
    Focus: Main legal points, key steps, and essential requirements only.`;

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
        temperature: 0.5,
        max_tokens: 200, // Reduced for shorter responses
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
    const fallbackResponse = `Technical issue. For ${legalIssue}, consult a qualified attorney. Try again shortly.`;
    
    return new Response(JSON.stringify({ 
      response: fallbackResponse,
      error: 'Technical difficulties - please try again'
    }), {
      status: 200, // Return 200 to show fallback message instead of error
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
