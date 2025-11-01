import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">CV</span>
              </div>
              <span className="text-xl font-bold">Cruz Verde</span>
            </div>
            <p className="text-gray-400 mb-4">
              Tu farmacia de confianza, siempre cerca de ti.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-emerald-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-emerald-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-emerald-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-emerald-400 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Compra</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Medicamentos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Belleza</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cuidado Personal</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Bebé y Mamá</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Ofertas</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Ayuda</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Centro de Ayuda</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Seguimiento de Pedidos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Devoluciones</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Política de Privacidad</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contacto</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start gap-2">
                <Phone size={18} className="mt-1 flex-shrink-0" />
                <span>600 600 2000</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={18} className="mt-1 flex-shrink-0" />
                <span>contacto@cruzverde.cl</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>Santiago, Chile</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; 2024 Cruz Verde. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
