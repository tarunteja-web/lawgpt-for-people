
import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield, ShieldOff, FileText, Phone, BookOpen } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ActionButtonsProps {
  isAnonymous: boolean;
  isDarkMode: boolean;
  translations: {
    anonymous: string;
    exitAnonymous: string;
    document: string;
    call: string;
    caseStudy: string;
    allSet?: string;
  };
  onToggleAnonymous: () => void;
  onActionClick: (action: string) => void;
  hideAllSetButton?: boolean;
  isLawyerChat?: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  isAnonymous,
  isDarkMode,
  translations,
  onToggleAnonymous,
  onActionClick,
  hideAllSetButton = false,
  isLawyerChat = false
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
    { key: 'call', icon: Phone, text: translations.call, onClick: () => onActionClick('call'), variant: 'outline' as const }
  ];

  // Only add the "We're All Set" button if hideAllSetButton is false
  if (!hideAllSetButton) {
    buttons.push({
      key: 'allset', 
      icon: Phone, // Using Phone as placeholder since CheckCircle isn't in the allowed icons
      text: translations.allSet || "We're All Set", 
      onClick: () => onActionClick('allset'), 
      variant: 'outline' as const
    });
  }

  return (
    <div className="flex justify-center items-center gap-1 sm:gap-2 px-2 sm:px-4 py-3 sm:py-6 overflow-x-auto">
      <div className="flex gap-1 sm:gap-2 min-w-max">
        {buttons.map(button => (
          <Button
            key={button.key}
            variant={button.variant}
            onClick={button.onClick}
            className={`flex items-center gap-1 sm:gap-2 rounded-full border whitespace-nowrap ${
              isDarkMode 
                ? 'border-gray-600 bg-gray-800 text-white hover:bg-gray-700' 
                : 'border-gray-300 bg-white text-black hover:bg-gray-50'
            } px-2 sm:px-4 md:px-6 py-1 sm:py-2 text-xs sm:text-sm`}
          >
            {/* Show icons on mobile for regular chat, hide for lawyer chat */}
            {(isMobile && !isLawyerChat) || !isMobile ? (
              <button.icon className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
            ) : null}
            <span>{button.text}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ActionButtons;
