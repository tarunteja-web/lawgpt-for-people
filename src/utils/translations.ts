
export const translations = {
  en: {
    anonymous: 'Anonymous',
    exitAnonymous: 'Exit Anonymous',
    document: 'Document',
    call: 'Call',
    allSet: "We're All Set",
    options: 'Options',
    listening: 'Listening...',
    typeMessage: 'Type your message...',
    anonymousMode: 'You are now in Anonymous Mode. Your identity is hidden.',
    exitingAnonymous: 'Exiting Anonymous Mode. Returning to your previous session.'
  },
  hi: {
    anonymous: 'गुमनाम',
    exitAnonymous: 'गुमनाम से बाहर निकलें',
    document: 'दस्तावेज़',
    call: 'कॉल',
    allSet: 'हम सब तैयार हैं',
    options: 'विकल्प',
    listening: 'सुन रहे हैं...',
    typeMessage: 'अपना संदेश टाइप करें...',
    anonymousMode: 'आप अब गुमनाम मोड में हैं। आपकी पहचान छुपी है।',
    exitingAnonymous: 'गुमनाम मोड से बाहर निकल रहे हैं। आपके पिछले सेशन पर वापस जा रहे हैं।'
  },
  te: {
    anonymous: 'అజ్ఞాత',
    exitAnonymous: 'అజ్ఞాత నుండి నిష్క్రమించు',
    document: 'పత్రం',
    call: 'కాల్',
    allSet: 'మేము అన్నీ సిద్ధం చేసాము',
    options: 'ఎంపికలు',
    listening: 'వింటున్నాము...',
    typeMessage: 'మీ సందేశాన్ని టైప్ చేయండి...',
    anonymousMode: 'మీరు ఇప్పుడు అజ్ఞాత మోడ్‌లో ఉన్నారు. మీ గుర్తింపు దాచబడింది.',
    exitingAnonymous: 'అజ్ఞాత మోడ్ నుండి నిష్క్రమిస్తున్నారు. మీ మునుపటి సెషన్‌కు తిరిగి వెళ్లుతున్నారు.'
  }
};

export const getTranslations = (language: string) => {
  return translations[language as keyof typeof translations] || translations.en;
};
