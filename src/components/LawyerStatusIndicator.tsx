
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { LawyerStatus } from '@/types/consultation';
import { Badge } from '@/components/ui/badge';
import { Circle } from 'lucide-react';

interface LawyerStatusIndicatorProps {
  lawyerId: string;
  showDetails?: boolean;
}

const LawyerStatusIndicator: React.FC<LawyerStatusIndicatorProps> = ({ 
  lawyerId, 
  showDetails = false 
}) => {
  const [status, setStatus] = useState<LawyerStatus | null>(null);

  useEffect(() => {
    // Fetch initial status
    const fetchStatus = async () => {
      try {
        const { data, error } = await supabase
          .from('lawyer_status')
          .select('*')
          .eq('lawyer_id', lawyerId)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching lawyer status:', error);
          return;
        }

        setStatus(data);
      } catch (error) {
        console.error('Error fetching lawyer status:', error);
      }
    };

    fetchStatus();

    // Subscribe to status updates
    const channel = supabase
      .channel(`lawyer-status-${lawyerId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'lawyer_status',
          filter: `lawyer_id=eq.${lawyerId}`
        },
        (payload) => {
          if (payload.eventType === 'DELETE') {
            setStatus(null);
          } else {
            setStatus(payload.new as LawyerStatus);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [lawyerId]);

  if (!status) {
    return (
      <Badge variant="secondary" className="flex items-center gap-1">
        <Circle className="h-2 w-2 fill-gray-400 text-gray-400" />
        Offline
      </Badge>
    );
  }

  const getStatusColor = () => {
    if (!status.is_online) return 'text-gray-400 fill-gray-400';
    if (status.is_available) return 'text-green-500 fill-green-500';
    return 'text-yellow-500 fill-yellow-500';
  };

  const getStatusText = () => {
    if (!status.is_online) return 'Offline';
    if (status.is_available) return 'Available';
    return 'Busy';
  };

  return (
    <div className="flex items-center gap-2">
      <Badge variant="secondary" className="flex items-center gap-1">
        <Circle className={`h-2 w-2 ${getStatusColor()}`} />
        {getStatusText()}
      </Badge>
      
      {showDetails && status.is_online && (
        <span className="text-xs text-gray-500">
          {status.current_clients}/{status.max_clients} clients
        </span>
      )}
    </div>
  );
};

export default LawyerStatusIndicator;
