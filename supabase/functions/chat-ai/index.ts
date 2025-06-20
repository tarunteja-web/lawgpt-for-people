
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
    const { message, legalIssue, language, messageHistory } = await req.json();

    console.log('Received chat request:', { message, legalIssue, language });

    // Check if this is early in the conversation (first few exchanges)
    const userMessages = messageHistory?.filter((msg: any) => msg.isUser) || [];
    const isEarlyConversation = userMessages.length <= 3;
    
    // Enhanced system prompt for intelligent follow-up questioning
    const systemPrompt = `You are LawGPT, a skilled legal AI assistant specializing in ${legalIssue} cases. Your goal is to gather essential information through intelligent follow-up questions.

    Current Context:
    - Legal Issue: ${legalIssue}
    - Language: ${language === 'hi' ? 'Hindi' : language === 'te' ? 'Telugu' : 'English'}
    - User Messages So Far: ${userMessages.length}
    
    Instructions:
    1. Keep responses under 150 words and conversational
    2. Respond in ${language === 'hi' ? 'Hindi' : language === 'te' ? 'Telugu' : 'English'}
    3. Ask ONE specific follow-up question based on what the user just shared
    4. Show empathy and understanding
    5. Focus on gathering key details about their ${legalIssue} situation
    
    ${isEarlyConversation ? `
    EARLY CONVERSATION STRATEGY:
    - Ask specific questions based on what they've shared
    - If they mention a problem, ask about timeline, location, or parties involved
    - If they give basic info, dig deeper into the most important aspect
    - If they seem unsure, help them clarify their situation
    - Prioritize: What happened? When? Who was involved? What outcome do they want?
    ` : `
    ONGOING CONVERSATION STRATEGY:
    - Build on information already gathered
    - Ask about documentation, evidence, or steps taken
    - Clarify any unclear points from previous responses
    - Focus on actionable legal advice and next steps
    `}
    
    IMPORTANT: 
    - Always ask exactly ONE follow-up question
    - Make questions specific to their situation
    - Don't repeat questions already asked
    - Be helpful and provide brief relevant advice before asking
    - Include disclaimer: "For specific legal advice, consult a qualified attorney"`;

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
          // Include recent conversation history for context
          ...messageHistory.slice(-6).map((msg: any) => ({
            role: msg.isUser ? 'user' : 'assistant',
            content: msg.text
          })),
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 250,
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
    const fallbackResponse = `I understand you need help with ${legalIssue}. Could you tell me more about your specific situation? For instance, what exactly happened and when did it occur? For specific legal advice, consult a qualified attorney.`;
    
    return new Response(JSON.stringify({ 
      response: fallbackResponse,
      error: 'Technical difficulties - please try again'
    }), {
      status: 200, // Return 200 to show fallback message instead of error
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
