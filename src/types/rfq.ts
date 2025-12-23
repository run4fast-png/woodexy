export interface RFQThread {
  id: string;
  created_at: string;
  status: 'open' | 'replied' | 'closed' | 'cancelled';
  product_id?: string;
  buyer_id: string;
  supplier_id: string;
  subject: string;
  last_message_at: string;
  buyer_unread_count: number;
  supplier_unread_count: number;
  product?: {
      name: string;
      images: string[];
  }
}

export interface RFQMessage {
  id: string;
  created_at: string;
  thread_id: string;
  sender_id: string;
  message: string;
  attachments?: Record<string, unknown> | null;
  meta?: Record<string, unknown> | null;
  read_at?: string;
}
