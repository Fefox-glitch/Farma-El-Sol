import { Product } from '../lib/supabase';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const hasDiscount = product.discount_price !== null && product.discount_price < product.price;
  const displayPrice = hasDiscount ? product.discount_price : product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((product.price - product.discount_price!) / product.price) * 100)
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden group">
      <div className="relative overflow-hidden bg-gray-100">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {hasDiscount && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            -{discountPercentage}%
          </div>
        )}
        {product.stock < 10 && product.stock > 0 && (
          <div className="absolute top-2 left-2 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            ¡Últimas unidades!
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Agotado</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 h-12">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

        <div className="mb-3">
          {hasDiscount && (
            <span className="text-gray-400 line-through text-sm mr-2">
              ${product.price.toLocaleString('es-CL')}
            </span>
          )}
          <span className="text-2xl font-bold text-emerald-600">
            ${displayPrice?.toLocaleString('es-CL')}
          </span>
        </div>

        <button
          onClick={() => onAddToCart(product.id)}
          disabled={product.stock === 0}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-colors ${
            product.stock === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-emerald-600 text-white hover:bg-emerald-700'
          }`}
        >
          <ShoppingCart size={18} />
          <span>{product.stock === 0 ? 'Agotado' : 'Agregar al Carro'}</span>
        </button>
      </div>
    </div>
  );
};
