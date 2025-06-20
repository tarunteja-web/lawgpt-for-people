
-- Create table for real-time legal consultations
CREATE TABLE public.legal_consultations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  lawyer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  legal_area TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'completed', 'cancelled')),
  priority TEXT NOT NULL DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for real-time messages in consultations
CREATE TABLE public.consultation_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  consultation_id UUID REFERENCES public.legal_consultations(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  message_type TEXT NOT NULL DEFAULT 'text' CHECK (message_type IN ('text', 'document', 'voice', 'video')),
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for document sharing
CREATE TABLE public.consultation_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  consultation_id UUID REFERENCES public.legal_consultations(id) ON DELETE CASCADE NOT NULL,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER,
  file_type TEXT,
  storage_path TEXT NOT NULL,
  is_confidential BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for lawyer availability and status
CREATE TABLE public.lawyer_status (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lawyer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  is_online BOOLEAN NOT NULL DEFAULT false,
  is_available BOOLEAN NOT NULL DEFAULT false,
  current_clients INTEGER NOT NULL DEFAULT 0,
  max_clients INTEGER NOT NULL DEFAULT 5,
  specializations TEXT[] NOT NULL DEFAULT '{}',
  hourly_rate DECIMAL(10,2),
  last_seen TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for real-time notifications
CREATE TABLE public.user_notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('message', 'consultation_request', 'consultation_update', 'document_shared', 'payment')),
  title TEXT NOT NULL,
  content TEXT,
  is_read BOOLEAN NOT NULL DEFAULT false,
  related_consultation_id UUID REFERENCES public.legal_consultations(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.legal_consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultation_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultation_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lawyer_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for legal_consultations
CREATE POLICY "Users can view their own consultations" ON public.legal_consultations
  FOR SELECT USING (auth.uid() = client_id OR auth.uid() = lawyer_id);

CREATE POLICY "Clients can create consultations" ON public.legal_consultations
  FOR INSERT WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Participants can update consultations" ON public.legal_consultations
  FOR UPDATE USING (auth.uid() = client_id OR auth.uid() = lawyer_id);

-- RLS Policies for consultation_messages
CREATE POLICY "Consultation participants can view messages" ON public.consultation_messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.legal_consultations 
      WHERE id = consultation_id 
      AND (client_id = auth.uid() OR lawyer_id = auth.uid())
    )
  );

CREATE POLICY "Consultation participants can send messages" ON public.consultation_messages
  FOR INSERT WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM public.legal_consultations 
      WHERE id = consultation_id 
      AND (client_id = auth.uid() OR lawyer_id = auth.uid())
    )
  );

CREATE POLICY "Senders can update their messages" ON public.consultation_messages
  FOR UPDATE USING (auth.uid() = sender_id);

-- RLS Policies for consultation_documents
CREATE POLICY "Consultation participants can view documents" ON public.consultation_documents
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.legal_consultations 
      WHERE id = consultation_id 
      AND (client_id = auth.uid() OR lawyer_id = auth.uid())
    )
  );

CREATE POLICY "Consultation participants can upload documents" ON public.consultation_documents
  FOR INSERT WITH CHECK (
    auth.uid() = uploaded_by AND
    EXISTS (
      SELECT 1 FROM public.legal_consultations 
      WHERE id = consultation_id 
      AND (client_id = auth.uid() OR lawyer_id = auth.uid())
    )
  );

-- RLS Policies for lawyer_status
CREATE POLICY "Anyone can view lawyer status" ON public.lawyer_status
  FOR SELECT USING (true);

CREATE POLICY "Lawyers can update their own status" ON public.lawyer_status
  FOR ALL USING (auth.uid() = lawyer_id);

-- RLS Policies for user_notifications
CREATE POLICY "Users can view their own notifications" ON public.user_notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" ON public.user_notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- Enable real-time for all tables
ALTER TABLE public.legal_consultations REPLICA IDENTITY FULL;
ALTER TABLE public.consultation_messages REPLICA IDENTITY FULL;
ALTER TABLE public.consultation_documents REPLICA IDENTITY FULL;
ALTER TABLE public.lawyer_status REPLICA IDENTITY FULL;
ALTER TABLE public.user_notifications REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.legal_consultations;
ALTER PUBLICATION supabase_realtime ADD TABLE public.consultation_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.consultation_documents;
ALTER PUBLICATION supabase_realtime ADD TABLE public.lawyer_status;
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_notifications;

-- Create indexes for better performance
CREATE INDEX idx_legal_consultations_client_id ON public.legal_consultations(client_id);
CREATE INDEX idx_legal_consultations_lawyer_id ON public.legal_consultations(lawyer_id);
CREATE INDEX idx_legal_consultations_status ON public.legal_consultations(status);
CREATE INDEX idx_consultation_messages_consultation_id ON public.consultation_messages(consultation_id);
CREATE INDEX idx_consultation_messages_created_at ON public.consultation_messages(created_at);
CREATE INDEX idx_lawyer_status_is_available ON public.lawyer_status(is_available);
CREATE INDEX idx_user_notifications_user_id_is_read ON public.user_notifications(user_id, is_read);
