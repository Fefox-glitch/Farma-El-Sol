import { ShoppingCart, Search, MapPin, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onSearchChange: (query: string) => void;
  searchQuery: string;
}

export const Header = ({ cartCount, onCartClick, onSearchChange, searchQuery }: HeaderProps) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="bg-brand-blue text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 hover:opacity-90">
              <MapPin size={16} />
              <a href="#ubicacion" className="underline">Ubicación</a>
            </button>
          </div>
          <div className="flex items-center gap-4">
            <a href="#contacto" className="hover:opacity-90">Contacto</a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <button className="lg:hidden">
            <Menu size={24} />
          </button>

          <Link to="/" className="flex items-center gap-2 hover:opacity-90" aria-label="Ir a la página principal">
            <div className="w-12 h-12 bg-brand-primary rounded-lg flex items-center justify-center">
              <span className="text-brand-blue font-bold text-xl">FS</span>
            </div>
            <span className="text-2xl font-bold text-brand-blue">Farmacias El Sol LTDA.</span>
          </Link>

          <div className="flex-1 max-w-2xl mx-8 relative hidden md:block">
            <input
              type="text"
              placeholder="Buscar productos, marcas..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-lg focus:border-brand-blue focus:outline-none"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>

          <button
            onClick={onCartClick}
            className="relative flex items-center gap-2 bg-brand-accent text-white px-6 py-3 rounded-lg hover:opacity-90 transition-colors"
          >
            <ShoppingCart size={20} />
            <span className="hidden lg:inline">Mi Carro</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-danger text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        <div className="mt-4 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-lg focus:border-brand-blue focus:outline-none"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
      </div>
    </header>
  );
};
