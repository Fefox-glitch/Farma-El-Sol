import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Clock } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-brand-blue text-white pt-12 pb-6" id="contacto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center">
                <span className="text-brand-blue font-bold">FS</span>
              </div>
              <span className="text-xl font-bold">Farmacias El Sol LTDA.</span>
            </div>
            <p className="text-white/80 mb-4">
              Tu farmacia de confianza en Lontué — atención cercana y profesional.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-brand-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-brand-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-brand-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-brand-primary transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Menú</h3>
            <ul className="space-y-2 text-white/80">
              <li><a href="#inicio" className="hover:text-brand-primary transition-colors">Inicio</a></li>
              <li><a href="#catalogo" className="hover:text-brand-primary transition-colors">Productos / Catálogo</a></li>
              <li><a href="#servicios" className="hover:text-brand-primary transition-colors">Servicios</a></li>
              <li><a href="#ubicacion" className="hover:text-brand-primary transition-colors">Ubicación</a></li>
              <li><a href="#contacto" className="hover:text-brand-primary transition-colors">Contacto</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contacto</h3>
            <ul className="space-y-3 text-white/80">
              <li className="flex items-start gap-2">
                <Phone size={18} className="mt-1 flex-shrink-0" />
                <span>+56 9 7556 4584 · Lontué</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={18} className="mt-1 flex-shrink-0" />
                <span>+56 9 7900 2753 · Sagrada Familia</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={18} className="mt-1 flex-shrink-0" />
                <span>contacto@farmaciaselsol.cl</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Dirección y Horarios</h3>
            <ul className="space-y-3 text-white/80">
              <li className="flex items-start gap-2">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>Luz Pereira 2020, Lontué, Molina</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>Valdivia 157, Sagrada Familia, Maule</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={18} className="mt-1 flex-shrink-0" />
                <span>Lunes a sábado 9:00–20:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6 text-center text-white/80 text-sm">
          <p>&copy; 2024 Farmacias El Sol LTDA. RUT 76.123.456-7 — Autorizado ISP. Cumplimiento normativo y atención profesional.</p>
          <p>
            <a href="#" className="underline">Política de privacidad</a> · <a href="#" className="underline">Términos de servicio</a>
          </p>
        </div>
      </div>
    </footer>
  );
};
