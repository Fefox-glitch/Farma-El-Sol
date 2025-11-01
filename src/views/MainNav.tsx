import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { Category } from '../lib/supabase';
import * as Icons from 'lucide-react';
interface MainNavProps {
  categories: Category[];
  onCategorySelect: (categoryId: string) => void;
}

export const MainNav = ({ categories, onCategorySelect }: MainNavProps) => {
  const [open, setOpen] = useState(false);
  const [prodOpen, setProdOpen] = useState(false);

  const getIcon = (iconName: string) => {
    const IconComponent = Icons[iconName as keyof typeof Icons] as React.ComponentType<{ size?: number; className?: string }>;
    return IconComponent ? <IconComponent size={16} className="text-gray-600" /> : <Icons.Tag size={16} className="text-gray-600" />;
  };

  return (
    <nav className="bg-white border-b">
      <div className="container mx-auto px-4">
        <ul className="flex items-center gap-4 py-3">
          {/* Productos primero */}
          <li className="relative">
            <button
              onClick={() => setProdOpen(v => !v)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200"
            >
              Productos
              <ChevronDown size={16} />
            </button>
            <div
              className={`absolute left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50 ${prodOpen ? 'block' : 'hidden'}`}
            >
              <ul className="py-2 max-h-96 overflow-auto">
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link
                      to="/productos#catalogo"
                      className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
                      onClick={() => { onCategorySelect(category.id); setProdOpen(false); }}
                    >
                      {getIcon(category.icon)}
                      <span>{category.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>

          {/* Servicios segundo */}
          <li className="relative">
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-brand-blue text-white hover:opacity-90"
            >
              Servicios
              <ChevronDown size={16} />
            </button>
            <div
              className={`absolute left-0 mt-2 w-72 bg-white rounded-lg shadow-lg border z-50 ${
                open ? 'block' : 'hidden'
              }`}
            >
              <ul className="py-2">
                <li>
                  <Link to="/servicios/venta" className="block px-3 py-2 hover:bg-gray-100" onClick={() => setOpen(false)}>Venta de medicamentos</Link>
                </li>
                <li>
                  <Link to="/servicios/encargos" className="block px-3 py-2 hover:bg-gray-100" onClick={() => setOpen(false)}>Encargos y reservas</Link>
                </li>
                <li>
                  <Link to="/servicios/enviar-receta" className="block px-3 py-2 hover:bg-gray-100" onClick={() => setOpen(false)}>Enviar receta</Link>
                </li>
                <li>
                  <Link to="/servicios/recetas-controladas" className="block px-3 py-2 hover:bg-gray-100" onClick={() => setOpen(false)}>Recetas retenidas y controladas</Link>
                </li>
                <li>
                  <Link to="/servicios/asesoria" className="block px-3 py-2 hover:bg-gray-100" onClick={() => setOpen(false)}>Asesoría farmacéutica</Link>
                </li>
                <li>
                  <Link to="/servicios/cuidado" className="block px-3 py-2 hover:bg-gray-100" onClick={() => setOpen(false)}>Productos de cuidado personal</Link>
                </li>
              </ul>
            </div>
          </li>

          {/* Contacto removido del menú */}
        </ul>
      </div>
    </nav>
  );
};