import { supabase, CartItem } from '../lib/supabase';
import type { Order } from './OrderModel';

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
        .eq('id', existing.id)
        .update({ quantity: existing.quantity + quantity });

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
      .eq('id', itemId)
      .update({ quantity });

    if (error) throw error;
  }

  static async removeFromCart(itemId: string): Promise<void> {
    const { error } = await supabase
      .from('cart_items')
      .eq('id', itemId)
      .delete();

    if (error) throw error;
  }

  static async clearCart(): Promise<void> {
    const sessionId = this.getSessionId();
    const { error } = await supabase
      .from('cart_items')
      .eq('session_id', sessionId)
      .delete();

    if (error) throw error;
  }

  // Genera una reserva con códigos para comprador y vendedor y vacía el carrito
  static async createReservation(buyer: { name: string; phone: string }): Promise<{ buyer_code: string; seller_code: string; order_id: string; total: number; items: CartItem[]; buyer: { name: string; phone: string }; reserved_at: string; expires_at: string }> {
    const sessionId = this.getSessionId();
    // Obtener items actuales con productos
    const { data: items, error } = await supabase
      .from('cart_items')
      .select('*, products(*)')
      .eq('session_id', sessionId);

    if (error) throw error;
    const cartItems: CartItem[] = items || [];
    const total = cartItems.reduce((sum: number, it: CartItem) => {
      const price = (it.products?.discount_price ?? it.products?.price ?? 0) as number;
      return sum + price * it.quantity;
    }, 0);

    // Generar códigos legibles
    const rand = () => Math.random().toString(36).toUpperCase().slice(2, 8);
    const buyer_code = `B-${rand()}-${rand()}`;
    const seller_code = `V-${rand()}-${rand()}`;
    const reserved_at = new Date().toISOString();
    const expires_at = new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString();

    // Construir texto de comprobante para comprador y vendedor
    const itemsSummary = cartItems
      .map((it: CartItem) => {
        const p = it.products;
        if (!p) return null;
        return `${it.quantity}x ${p.name}`;
      })
      .filter(Boolean)
      .join(', ');

    const totalCL = `$${Number(total || 0).toLocaleString('es-CL')}`;
    const expiresLocal = new Date(expires_at).toLocaleString('es-CL');
    const baseLines = [
      `Reserva Farmacias El Sol`,
      `Orden: `,
      `Códigos: ${buyer_code} / ${seller_code}`,
      `Total: ${totalCL}`,
      `Validez: 12h (${expiresLocal})`,
      itemsSummary ? `Items: ${itemsSummary}` : '',
      `Gracias por preferirnos`
    ].filter(Boolean);
    const buyer_receipt_text = baseLines.join('\n');
    const seller_receipt_text = baseLines.join('\n');

    // Insertar orden/reserva en tabla 'orders' (JSON-friendly)
    const orderPayload: Omit<Order, 'id' | 'created_at'> = {
      session_id: sessionId,
      buyer_code,
      seller_code,
      total,
      status: 'reserved',
      buyer_name: buyer.name,
      buyer_phone: buyer.phone,
      reserved_at,
      expires_at,
      buyer_receipt_text,
      seller_receipt_text,
      items: cartItems.map((it: CartItem) => ({ id: it.id, product_id: it.product_id, quantity: it.quantity })),
    };

    const { data: inserted, error: insertError } = await supabase
      .from('orders')
      .insert(orderPayload);

    if (insertError) throw insertError;
    const order_id = Array.isArray(inserted) && inserted[0]?.id ? inserted[0].id : `order_${Date.now()}`;

    // Vaciar carrito tras crear la reserva
    await this.clearCart();

    return { buyer_code, seller_code, order_id, total, items: cartItems, buyer, reserved_at, expires_at };
  }
}
