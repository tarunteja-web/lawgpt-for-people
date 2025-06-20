
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTranslations } from '@/utils/translations';

const Launch = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('selectedLanguage') || 'en';
  });
  
  const t = getTranslations(language);

  useEffect(() => {
    // Navigate to login page after animation completes (3 seconds)
    const timer = setTimeout(() => {
      navigate('/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 border border-gray-700 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 border border-gray-700 rounded-full animate-pulse delay-1000"></div>
      </div>
      
      <div className="text-center z-10">
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent animate-[fadeInScale_3s_ease-out_forwards] opacity-0">
            LawGPT
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 animate-[fadeInUp_3s_ease-out_0.5s_forwards] opacity-0">
            {t.welcomeSubtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Launch;
