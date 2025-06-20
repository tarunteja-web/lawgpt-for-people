
import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy, ThumbsUp, ThumbsDown, Volume, RefreshCcw, Edit } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ActionButtonsProps {
  isAnonymous: boolean;
  translations: {
    anonymous: string;
    exitAnonymous: string;
    document: string;
    call: string;
    allSet: string;
  };
  onToggleAnonymous: () => void;
  onActionClick: (action: string) => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  isAnonymous,
  translations,
  onToggleAnonymous,
  onActionClick
}) => {
  const isMobile = useIsMobile();

  const actionButtons = [
    { icon: Copy, onClick: () => onActionClick('copy') },
    { icon: ThumbsUp, onClick: () => onActionClick('like') },
    { icon: ThumbsDown, onClick: () => onActionClick('dislike') },
    { icon: Volume, onClick: () => onActionClick('volume') },
    { icon: RefreshCcw, onClick: () => onActionClick('refresh') },
    { icon: Edit, onClick: () => onActionClick('edit') }
  ];

  return (
    <div className="bg-gray-900 px-8 pb-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-2 ml-12">
          {actionButtons.map((button, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              onClick={button.onClick}
              className="text-gray-400 hover:text-white hover:bg-gray-800 p-2"
            >
              <button.icon className="h-4 w-4" />
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActionButtons;
