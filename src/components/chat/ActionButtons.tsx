
import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield, ShieldOff, FileText, Phone, CheckCircle, BookOpen } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ActionButtonsProps {
  isAnonymous: boolean;
  isDarkMode: boolean;
  translations: {
    anonymous: string;
    exitAnonymous: string;
    document: string;
    call: string;
    allSet: string;
    caseStudy: string;
  };
  onToggleAnonymous: () => void;
  onActionClick: (action: string) => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  isAnonymous,
  isDarkMode,
  translations,
  onToggleAnonymous,
  onActionClick
}) => {
  const isMobile = useIsMobile();

  const buttons = [
    { 
      key: 'anonymous', 
      icon: isAnonymous ? ShieldOff : Shield, 
      text: isAnonymous ? translations.exitAnonymous : translations.anonymous,
      onClick: onToggleAnonymous,
      variant: isAnonymous ? 'destructive' as const : 'outline' as const
    },
    { key: 'document', icon: FileText, text: translations.document, onClick: () => onActionClick('document'), variant: 'outline' as const },
    { key: 'casestudy', icon: BookOpen, text: translations.caseStudy, onClick: () => onActionClick('casestudy'), variant: 'outline' as const },
    { key: 'call', icon: Phone, text: translations.call, onClick: () => onActionClick('call'), variant: 'outline' as const },
    { key: 'allset', icon: CheckCircle, text: translations.allSet, onClick: () => onActionClick('allset'), variant: 'outline' as const }
  ];

  return (
    <div className={`flex justify-center items-center gap-2 px-4 py-6 ${isMobile ? 'flex-wrap' : ''}`}>
      {buttons.map(button => (
        <Button
          key={button.key}
          variant={button.variant}
          onClick={button.onClick}
          className={`flex items-center gap-2 rounded-full border ${
            isDarkMode 
              ? 'border-gray-600 bg-gray-800 text-white hover:bg-gray-700' 
              : 'border-gray-300 bg-white text-black hover:bg-gray-50'
          } ${isMobile ? 'px-3 py-2 text-xs' : 'px-6 py-2 text-sm'}`}
        >
          <button.icon className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
          <span className={isMobile ? 'text-xs' : 'text-sm'}>{button.text}</span>
        </Button>
      ))}
    </div>
  );
};

export default ActionButtons;
