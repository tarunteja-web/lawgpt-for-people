
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { getTranslations } from '@/utils/translations';

const Welcome = () => {
  const navigate = useNavigate();
  const [selectedIssue, setSelectedIssue] = useState('');
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('selectedLanguage') || 'en';
  });
  const userName = localStorage.getItem('userName') || 'User';
  
  const t = getTranslations(language);

  useEffect(() => {
    localStorage.setItem('selectedLanguage', language);
  }, [language]);

  const legalIssues = [
    { key: 'divorce', label: t.divorce },
    { key: 'propertyDisputes', label: t.propertyDisputes },
    { key: 'criminalDefense', label: t.criminalDefense },
    { key: 'businessLaw', label: t.businessLaw },
    { key: 'employmentIssues', label: t.employmentIssues },
    { key: 'personalInjury', label: t.personalInjury },
    { key: 'familyLaw', label: t.familyLaw },
    { key: 'contractDisputes', label: t.contractDisputes }
  ];

  const handleContinue = () => {
    if (selectedIssue) {
      localStorage.setItem('selectedLegalIssue', selectedIssue);
      navigate('/chat');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="text-center max-w-md w-full space-y-8 animate-fade-in">
        <div>
          <h1 className="text-4xl font-bold text-black mb-4">
            {t.welcomeToLawGPT}, {userName}!
          </h1>
          <p className="text-gray-600 text-lg">
            {t.helpWithLegal}
          </p>
        </div>
        
        <div className="space-y-4">
          <label className="block text-left text-black font-medium">
            {t.selectLegalIssue}
          </label>
          <Select value={selectedIssue} onValueChange={setSelectedIssue}>
            <SelectTrigger className="w-full bg-white border-gray-300 text-black focus:border-gray-400">
              <SelectValue placeholder={t.chooseLegalArea} />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-300">
              {legalIssues.map((issue) => (
                <SelectItem key={issue.key} value={issue.label} className="text-black hover:bg-gray-50">
                  {issue.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button
          onClick={handleContinue}
          disabled={!selectedIssue}
          className="w-full bg-black hover:bg-gray-800 text-white py-3 text-lg disabled:bg-gray-300 disabled:text-gray-500"
        >
          {t.continueToChat}
        </Button>
      </div>
    </div>
  );
};

export default Welcome;
