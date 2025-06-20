
export interface LegalConsultation {
  id: string;
  client_id: string;
  lawyer_id?: string;
  title: string;
  description?: string;
  legal_area: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  created_at: string;
  updated_at: string;
}

export interface ConsultationMessage {
  id: string;
  consultation_id: string;
  sender_id: string;
  content: string;
  message_type: 'text' | 'document' | 'voice' | 'video';
  is_read: boolean;
  created_at: string;
}

export interface ConsultationDocument {
  id: string;
  consultation_id: string;
  uploaded_by: string;
  file_name: string;
  file_size?: number;
  file_type?: string;
  storage_path: string;
  is_confidential: boolean;
  created_at: string;
}

export interface LawyerStatus {
  id: string;
  lawyer_id: string;
  is_online: boolean;
  is_available: boolean;
  current_clients: number;
  max_clients: number;
  specializations: string[];
  hourly_rate?: number;
  last_seen: string;
  updated_at: string;
}

export interface UserNotification {
  id: string;
  user_id: string;
  type: 'message' | 'consultation_request' | 'consultation_update' | 'document_shared' | 'payment';
  title: string;
  content?: string;
  is_read: boolean;
  related_consultation_id?: string;
  created_at: string;
}
