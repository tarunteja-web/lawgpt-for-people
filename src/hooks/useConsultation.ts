
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { LegalConsultation, ConsultationMessage } from '@/types/consultation';
import { useToast } from '@/hooks/use-toast';

export const useConsultation = (consultationId?: string) => {
  const [consultation, setConsultation] = useState<LegalConsultation | null>(null);
  const [messages, setMessages] = useState<ConsultationMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Fetch consultation details
  const fetchConsultation = async (id: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('legal_consultations')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setConsultation(data);
    } catch (error) {
      console.error('Error fetching consultation:', error);
      toast({
        title: "Error",
        description: "Failed to load consultation details",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch messages for consultation
  const fetchMessages = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('consultation_messages')
        .select('*')
        .eq('consultation_id', id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Send a new message
  const sendMessage = async (content: string, messageType: 'text' | 'document' | 'voice' | 'video' = 'text') => {
    if (!consultationId) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('consultation_messages')
        .insert({
          consultation_id: consultationId,
          sender_id: user.id,
          content,
          message_type: messageType
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive"
      });
    }
  };

  // Create new consultation
  const createConsultation = async (title: string, description: string, legalArea: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('legal_consultations')
        .insert({
          client_id: user.id,
          title,
          description,
          legal_area: legalArea
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating consultation:', error);
      toast({
        title: "Error",
        description: "Failed to create consultation",
        variant: "destructive"
      });
      return null;
    }
  };

  // Set up real-time subscriptions
  useEffect(() => {
    if (!consultationId) return;

    // Fetch initial data
    fetchConsultation(consultationId);
    fetchMessages(consultationId);

    // Subscribe to new messages
    const messageChannel = supabase
      .channel('consultation-messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'consultation_messages',
          filter: `consultation_id=eq.${consultationId}`
        },
        (payload) => {
          const newMessage = payload.new as ConsultationMessage;
          setMessages(prev => [...prev, newMessage]);
        }
      )
      .subscribe();

    // Subscribe to consultation updates
    const consultationChannel = supabase
      .channel('consultation-updates')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'legal_consultations',
          filter: `id=eq.${consultationId}`
        },
        (payload) => {
          const updatedConsultation = payload.new as LegalConsultation;
          setConsultation(updatedConsultation);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(messageChannel);
      supabase.removeChannel(consultationChannel);
    };
  }, [consultationId]);

  return {
    consultation,
    messages,
    isLoading,
    sendMessage,
    createConsultation,
    fetchConsultation
  };
};
