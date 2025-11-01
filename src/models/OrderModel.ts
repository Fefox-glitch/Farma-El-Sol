import { supabase } from '../lib/supabase';

export type Order = {
  id: string;
  session_id: string;
  buyer_code: string;
  seller_code: string;
  total: number;
  status: string;
  buyer_name: string;
  buyer_phone: string;
  reserved_at: string;
  expires_at: string;
  buyer_receipt_text?: string;
  seller_receipt_text?: string;
  items: Array<{ id: string; product_id: string; quantity: number }>;
  created_at?: string;
};

export class OrderModel {
  static async getAllOrders(): Promise<Order[]> {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []) as Order[];
  }

  static async updateOrderStatus(id: string, status: 'pending' | 'completed' | 'canceled'): Promise<void> {
    const { error } = await supabase
      .from('orders')
      .eq('id', id)
      .update({ status });
    if (error) throw error;
  }
}