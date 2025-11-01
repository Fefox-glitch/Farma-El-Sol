import { X, Minus, Plus, Trash2, ShoppingBag, Copy } from 'lucide-react';
import { CartItem } from '../lib/supabase';

interface ReservationBuyer {
  name: string;
  phone: string;
}

interface ReservationItem {
  id: string;
  quantity: number;
  products?: {
    id: string;
    name: string;
    price: number;
    discount_price: number | null;
    image_url: string;
  } | null;
}

interface Reservation {
  order_id: string;
  buyer_code: string;
  seller_code: string;
  total: number;
  reserved_at: string;
  expires_at: string;
  buyer?: ReservationBuyer | null;
  items?: ReservationItem[] | null;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  total: number;
  onCheckout?: () => void;
  reservation?: Reservation | null;
  buyerName?: string;
  buyerPhone?: string;
  onBuyerNameChange?: (v: string) => void;
  onBuyerPhoneChange?: (v: string) => void;
}

export const Cart = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  total,
  onCheckout,
  reservation,
  buyerName = '',
  buyerPhone = '',
  onBuyerNameChange,
  onBuyerPhoneChange,
}: CartProps) => {
  const formatPhoneCL = (raw: string) => {
    const digits = String(raw).replace(/\D/g, '');
    // Formato simple: +56 9 XXXX XXXX o fallback al original
    if (digits.length >= 8) {
      const last8 = digits.slice(-8);
      const part1 = last8.slice(0, 4);
      const part2 = last8.slice(4);
      return `+56 9 ${part1} ${part2}`;
    }
    return raw;
  };

  const normalizeToWhatsAppDigits = (raw: string) => {
    const digits = String(raw).replace(/\D/g, '');
    // Si es un móvil chileno, asegurar prefijo 56
    // Casos: '9XXXXXXXX' (9 + 8 dígitos) -> '569XXXXXXXX'
    //        '56XXXXXXXXX' ya está correcto
    if (digits.length === 9 && digits.startsWith('9')) {
      return `56${digits}`;
    }
    if (digits.length === 11 && digits.startsWith('56')) {
      return digits;
    }
    // Fallback: retornar dígitos sin cambios
    return digits;
  };

  const buildReceiptMessage = (res: Reservation) => {
    const name = res?.buyer?.name ? ` ${res.buyer!.name}` : '';
    const order = res?.order_id || '';
    const buyerCode = res?.buyer_code || '';
    const sellerCode = res?.seller_code || '';
    const total = `$${Number(res?.total || 0).toLocaleString('es-CL')}`;
    const expires = res?.expires_at ? new Date(res.expires_at).toLocaleString('es-CL') : '';
    const items = Array.isArray(res?.items)
      ? res.items!
          .map((it: ReservationItem) => {
            const p = it.products;
            if (!p) return null;
            return `${it.quantity}x ${p.name}`;
          })
          .filter(Boolean)
          .join(', ')
      : '';

    return [
      `Reserva Farmacias El Sol${name}`,
      `Orden: ${order}`,
      `Códigos: ${buyerCode} / ${sellerCode}`,
      `Total: ${total}`,
      expires ? `Validez: 12h (${expires})` : `Validez: 12h`,
      items ? `Items: ${items}` : '',
      `Gracias por preferirnos`
    ]
      .filter(Boolean)
      .join('\n');
  };
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

        {reservation ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-brand-blue mb-2">Reserva generada</h3>
              <p className="text-gray-600 mb-4">Presenta estos códigos en la farmacia</p>
            </div>
              <div className="w-full max-w-sm bg-gray-50 border rounded-lg p-4 printable">
              {/* Encabezado con logo y dirección */}
              <div className="flex items-center gap-3 mb-4">
                <img src="/vite.svg" alt="Farmacias El Sol" className="w-10 h-10" onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }} />
                <div>
                  <p className="font-bold text-brand-blue leading-tight">Farmacias El Sol LTDA.</p>
                  <p className="text-xs text-gray-600">Luz Pereira 2020, Lontué, Molina</p>
                  <p className="text-xs text-gray-600">Valdivia 157, Sagrada Familia, Maule</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Orden</span>
                  <span className="font-mono text-sm text-gray-800">{reservation.order_id}</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm text-gray-600">Fecha</span>
                  <span className="text-sm text-gray-800">{new Date(reservation.reserved_at).toLocaleString('es-CL')}</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm text-gray-600">Expira</span>
                  <span className="text-sm text-gray-800">{new Date(reservation.expires_at).toLocaleString('es-CL')}</span>
                </div>
                <p className="mt-1 text-xs text-gray-600">Validez: 12 horas</p>
              </div>
              <div className="mb-3">
                <p className="text-sm text-gray-600">Código comprador</p>
                <div className="flex items-center justify-between bg-white border rounded px-3 py-2">
                  <span className="font-mono font-bold text-brand-blue">{reservation.buyer_code}</span>
                  <button className="p-1 text-gray-600 hover:text-gray-900" onClick={() => navigator.clipboard?.writeText(reservation.buyer_code)} aria-label="Copiar código comprador">
                    <Copy size={18} />
                  </button>
                </div>
              </div>
              <div className="mb-3">
                <p className="text-sm text-gray-600">Código vendedor</p>
                <div className="flex items-center justify-between bg-white border rounded px-3 py-2">
                  <span className="font-mono font-bold text-brand-blue">{reservation.seller_code}</span>
                  <button className="p-1 text-gray-600 hover:text-gray-900" onClick={() => navigator.clipboard?.writeText(reservation.seller_code)} aria-label="Copiar código vendedor">
                    <Copy size={18} />
                  </button>
                </div>
              </div>
              {!!reservation?.buyer && (
                <div className="mb-3 text-sm text-gray-700">
                  <p><span className="text-gray-600">Comprador:</span> {reservation.buyer!.name}</p>
                  <p><span className="text-gray-600">Teléfono:</span> {formatPhoneCL(reservation.buyer!.phone)}</p>
                </div>
              )}
              {/* Detalle de productos */}
              {Array.isArray(reservation?.items) && reservation!.items!.length > 0 && (
                <div className="mb-3">
                  <p className="text-sm text-gray-600 mb-1">Detalle de productos</p>
                  <div className="divide-y border rounded bg-white">
                    {reservation!.items!.map((it: ReservationItem) => {
                      const product = it.products;
                      if (!product) return null;
                      const price = product.discount_price || product.price;
                      const subtotal = price * it.quantity;
                      return (
                        <div key={it.id} className="flex items-center justify-between px-3 py-2">
                          <div className="text-sm">
                            <p className="font-medium text-gray-800">{product.name}</p>
                            <p className="text-gray-600">x{it.quantity} · ${price.toLocaleString('es-CL')}</p>
                          </div>
                          <div className="text-sm font-bold text-gray-800">${subtotal.toLocaleString('es-CL')}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              <div className="mt-2 text-sm text-gray-700 flex items-center justify-between">
                <span>Total referencial</span>
                <span className="font-bold">${reservation.total.toLocaleString('es-CL')}</span>
              </div>
              <p className="mt-3 text-xs text-gray-500">La venta se efectúa presencialmente. Los precios son en CLP.</p>
              <button onClick={() => window.print()} className="mt-4 w-full bg-gray-800 text-white py-2 rounded-lg font-semibold hover:bg-gray-900">
                Imprimir comprobante
              </button>
              {Boolean(reservation?.buyer?.phone) && (
                <a
                  href={`https://wa.me/${normalizeToWhatsAppDigits(reservation!.buyer!.phone)}?text=${encodeURIComponent(buildReceiptMessage(reservation!))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 w-full inline-flex items-center justify-center bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700"
                  aria-label="Enviar comprobante por WhatsApp"
                >
                  Enviar comprobante por WhatsApp
                </a>
              )}
            </div>
          </div>
        ) : cartItems.length === 0 ? (
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
                        <p className="text-brand-blue font-bold mb-2">
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
                  className="mt-4 w-full text-brand-danger hover:bg-brand-danger/10 py-2 rounded-lg transition-colors"
                >
                  Vaciar Carro
                </button>
              )}
            </div>

            <div className="border-t p-6 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="text-sm text-gray-700">Nombre del comprador</label>
                  <input
                    value={buyerName}
                    onChange={(e) => onBuyerNameChange?.(e.target.value)}
                    className="mt-1 w-full border rounded px-3 py-2"
                    placeholder="Ej: Juan Pérez"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-700">Teléfono</label>
                  <input
                    value={buyerPhone}
                    onChange={(e) => onBuyerPhoneChange?.(e.target.value)}
                    className="mt-1 w-full border rounded px-3 py-2"
                    placeholder="Ej: +56 9 1234 5678"
                  />
                  <p className="text-xs text-gray-500 mt-1">Se usará para validar la reserva presencialmente.</p>
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold text-gray-700">Total:</span>
                <span className="text-2xl font-bold text-brand-blue">
                  ${total.toLocaleString('es-CL')}
                </span>
              </div>
              <button
                onClick={onCheckout}
                disabled={!buyerName || !buyerPhone || buyerPhone.replace(/\D/g, '').length < 8}
                className={`w-full py-4 rounded-lg font-bold text-lg transition-colors ${(!buyerName || !buyerPhone || buyerPhone.replace(/\D/g, '').length < 8) ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-brand-accent text-white hover:opacity-90'}`}
              >
                Generar Código de Reserva
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
