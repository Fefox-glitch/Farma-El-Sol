import { ShoppingCart, Search, MapPin, User, Menu } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onSearchChange: (query: string) => void;
  searchQuery: string;
}

export const Header = ({ cartCount, onCartClick, onSearchChange, searchQuery }: HeaderProps) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="bg-emerald-600 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 hover:text-emerald-100">
              <MapPin size={16} />
              <span>Encuentra tu tienda</span>
            </button>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-emerald-100">Servicio al Cliente</a>
            <a href="#" className="hover:text-emerald-100">Regístrate</a>
            <button className="flex items-center gap-1 hover:text-emerald-100">
              <User size={16} />
              <span>Ingresar</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <button className="lg:hidden">
            <Menu size={24} />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">CV</span>
            </div>
            <span className="text-2xl font-bold text-emerald-600">Cruz Verde</span>
          </div>

          <div className="flex-1 max-w-2xl mx-8 relative hidden md:block">
            <input
              type="text"
              placeholder="Buscar productos, marcas..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>

          <button
            onClick={onCartClick}
            className="relative flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <ShoppingCart size={20} />
            <span className="hidden lg:inline">Mi Carro</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
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
              className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
      </div>
    </header>
  );
};
