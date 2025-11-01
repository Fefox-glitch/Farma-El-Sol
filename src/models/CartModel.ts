import { supabase, CartItem } from '../lib/supabase';

export class CartModel {
  private static getSessionId(): string {
    let sessionId = localStorage.getItem('cart_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('cart_session_id', sessionId);
    }
    return sessionId;
  }

  static async getCartItems(): Promise<CartItem[]> {
    const sessionId = this.getSessionId();
    const { data, error } = await supabase
      .from('cart_items')
      .select('*, products(*)')
      .eq('session_id', sessionId);

    if (error) throw error;
    return data || [];
  }

  static async addToCart(productId: string, quantity: number = 1): Promise<void> {
    const sessionId = this.getSessionId();

    const { data: existing } = await supabase
      .from('cart_items')
      .select('*')
      .eq('session_id', sessionId)
      .eq('product_id', productId)
      .maybeSingle();

    if (existing) {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity: existing.quantity + quantity })
        .eq('id', existing.id);

      if (error) throw error;
    } else {
      const { error } = await supabase
        .from('cart_items')
        .insert({ session_id: sessionId, product_id: productId, quantity });

      if (error) throw error;
    }
  }

  static async updateQuantity(itemId: string, quantity: number): Promise<void> {
    if (quantity <= 0) {
      await this.removeFromCart(itemId);
      return;
    }

    const { error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', itemId);

    if (error) throw error;
  }

  static async removeFromCart(itemId: string): Promise<void> {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', itemId);

    if (error) throw error;
  }

  static async clearCart(): Promise<void> {
    const sessionId = this.getSessionId();
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('session_id', sessionId);

    if (error) throw error;
  }
}
