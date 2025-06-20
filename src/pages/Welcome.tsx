
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();
  const [selectedIssue, setSelectedIssue] = useState('');
  const userName = localStorage.getItem('userName') || 'User';

  const legalIssues = [
    'Divorce',
    'Property Disputes',
    'Criminal Defense',
    'Business Law',
    'Employment Issues',
    'Personal Injury',
    'Family Law',
    'Contract Disputes'
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
            Welcome to LawGPT, {userName}!
          </h1>
          <p className="text-gray-600 text-lg">
            Let's help you with your legal concerns
          </p>
        </div>
        
        <div className="space-y-4">
          <label className="block text-left text-black font-medium">
            Select your legal issue:
          </label>
          <Select value={selectedIssue} onValueChange={setSelectedIssue}>
            <SelectTrigger className="w-full bg-white border-gray-300 text-black focus:border-gray-400">
              <SelectValue placeholder="Choose a legal area..." />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-300">
              {legalIssues.map((issue) => (
                <SelectItem key={issue} value={issue} className="text-black hover:bg-gray-50">
                  {issue}
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
          Continue to Chat
        </Button>
      </div>
    </div>
  );
};

export default Welcome;
