import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem } from '../lib/supabase';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  total: number;
}

export const Cart = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  total,
}: CartProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Mi Carro</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <ShoppingBag size={64} className="text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg text-center">Tu carro está vacío</p>
            <p className="text-gray-400 text-sm text-center mt-2">
              Agrega productos para comenzar tu compra
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                {cartItems.map((item) => {
                  const product = item.products;
                  if (!product) return null;

                  const price = product.discount_price || product.price;
                  const subtotal = price * item.quantity;

                  return (
                    <div key={item.id} className="flex gap-4 bg-gray-50 p-4 rounded-lg">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
                        <p className="text-emerald-600 font-bold mb-2">
                          ${price.toLocaleString('es-CL')}
                        </p>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-1 bg-white border border-gray-300 rounded hover:bg-gray-100"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 bg-white border border-gray-300 rounded hover:bg-gray-100"
                          >
                            <Plus size={16} />
                          </button>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="ml-auto p-1 text-red-500 hover:bg-red-50 rounded"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-800">
                          ${subtotal.toLocaleString('es-CL')}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {cartItems.length > 0 && (
                <button
                  onClick={onClearCart}
                  className="mt-4 w-full text-red-500 hover:bg-red-50 py-2 rounded-lg transition-colors"
                >
                  Vaciar Carro
                </button>
              )}
            </div>

            <div className="border-t p-6 bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold text-gray-700">Total:</span>
                <span className="text-2xl font-bold text-emerald-600">
                  ${total.toLocaleString('es-CL')}
                </span>
              </div>
              <button className="w-full bg-emerald-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-emerald-700 transition-colors">
                Finalizar Compra
              </button>
              <button
                onClick={onClose}
                className="w-full mt-2 text-gray-600 py-2 hover:text-gray-800 transition-colors"
              >
                Seguir Comprando
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};
