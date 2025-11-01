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
  const waText = encodeURIComponent(`Hola, quisiera consultar por: ${product.name}`);

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden group">
      <div className="relative overflow-hidden bg-gray-100">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {hasDiscount && (
          <div className="absolute top-2 right-2 bg-brand-danger text-white px-3 py-1 rounded-full text-sm font-bold">
            -{discountPercentage}%
          </div>
        )}
        {product.stock < 10 && product.stock > 0 && (
          <div className="absolute top-2 left-2 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            ¡Últimas unidades!
          </div>
        )}
        {product.requires_prescription && (
          <div className="absolute top-12 left-2 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Requiere receta
          </div>
        )}
        {product.requires_retention && (
          <div className="absolute top-20 left-2 bg-yellow-700 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Retención de receta
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

        {(product.requires_prescription || product.requires_retention) && (
          <div className="mb-3 border-l-4 border-yellow-500 bg-yellow-50 text-yellow-700 p-3 rounded">
            <p className="text-sm font-semibold">Medicamento controlado</p>
            {product.requires_prescription && (
              <p className="text-sm">Este producto requiere receta médica para su venta.</p>
            )}
            {product.requires_retention && (
              <p className="text-sm">La receta debe ser retenida en farmacia según normativa.</p>
            )}
            <a href="/servicios/enviar-receta" className="inline-block mt-2 text-brand-blue font-semibold underline">Enviar receta</a>
          </div>
        )}

        <div className="mb-3">
          {hasDiscount && (
            <span className="text-gray-400 line-through text-sm mr-2">
              ${product.price.toLocaleString('es-CL')}
            </span>
          )}
          <span className="text-2xl font-bold text-brand-blue">
            ${displayPrice?.toLocaleString('es-CL')}
          </span>
        </div>

        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            onClick={() => onAddToCart(product.id)}
            disabled={product.stock === 0}
            className={`flex items-center justify-center gap-2 py-2 rounded-lg font-semibold transition-colors ${
              product.stock === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-brand-accent text-white hover:opacity-90'
            }`}
          >
            <ShoppingCart size={18} />
            <span>{product.stock === 0 ? 'Agotado' : 'Reservar'}</span>
          </button>
          <a
            href={`https://wa.me/?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white py-2 px-4 rounded-lg font-semibold text-center hover:bg-green-700"
          >
            WhatsApp
          </a>
          {product.requires_prescription && (
            <a
              href="#enviar-receta"
              className="bg-brand-danger text-white py-2 px-4 rounded-lg font-semibold text-center hover:opacity-90"
            >
              Enviar receta
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
