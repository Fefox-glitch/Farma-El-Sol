import { useState, useEffect } from 'react';
import { CartModel } from '../models/CartModel';
import { CartItem } from '../lib/supabase';

export const useCartController = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [reservation, setReservation] = useState<null | { buyer_code: string; seller_code: string; order_id: string; total: number; items: CartItem[]; buyer: { name: string; phone: string }; reserved_at: string; expires_at: string }>(null);
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      setLoading(true);
      const data = await CartModel.getCartItems();
      setCartItems(data);
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: string, quantity: number = 1) => {
    try {
      await CartModel.addToCart(productId, quantity);
      await loadCart();
      setIsCartOpen(true);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      await CartModel.updateQuantity(itemId, quantity);
      await loadCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      await CartModel.removeFromCart(itemId);
      await loadCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const clearCart = async () => {
    try {
      await CartModel.clearCart();
      await loadCart();
      setReservation(null);
      setBuyerName('');
      setBuyerPhone('');
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.products?.discount_price || item.products?.price || 0;
      return total + price * item.quantity;
    }, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const checkout = async () => {
    try {
      const result = await CartModel.createReservation({ name: buyerName.trim(), phone: buyerPhone.trim() });
      setReservation({ buyer_code: result.buyer_code, seller_code: result.seller_code, order_id: result.order_id, total: result.total, items: result.items, buyer: result.buyer, reserved_at: result.reserved_at, expires_at: result.expires_at });
      await loadCart(); // carrito queda vacío
      setIsCartOpen(true);
    } catch (error) {
      console.error('Error creating reservation:', error);
    }
  };

  return {
    cartItems,
    loading,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    checkout,
    getCartTotal,
    getCartCount,
    reservation,
    buyerName,
    buyerPhone,
    setBuyerName,
    setBuyerPhone,
  };
};
