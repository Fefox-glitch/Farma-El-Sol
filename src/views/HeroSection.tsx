import { MapPin, Phone, Clock } from 'lucide-react';

export const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-brand-primary to-brand-accent text-brand-blue py-16" id="inicio">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Tu farmacia de confianza en Lontué — atención cercana y profesional.
            </h1>
            <p className="text-lg mb-6">
              Venta de medicamentos, cuidado personal y orientación farmacéutica. Encargos y reservas disponibles.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://maps.google.com/?q=Luz%20Pereira%202020%2C%20Lontu%C3%A9%2C%20Molina"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir mapa: Luz Pereira 2020, Lontué"
                className="inline-flex items-center gap-2 bg-brand-blue text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90"
              >
                <MapPin size={16} />
                <span>Luz Pereira 2020, Lontué</span>
              </a>
              <a
                href="tel:+56975564584"
                aria-label="Llamar a +56 9 7556 4584"
                className="inline-flex items-center gap-2 bg-brand-accent text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90"
              >
                <Phone size={16} />
                <span>+56 9 7556 4584</span>
              </a>
              <a
                href="https://maps.google.com/?q=Valdivia%20157%2C%20Sagrada%20Familia%2C%20Maule"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir mapa: Valdivia 157, Sagrada Familia"
                className="inline-flex items-center gap-2 bg-brand-blue text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90"
              >
                <MapPin size={16} />
                <span>Valdivia 157, Sagrada Familia</span>
              </a>
              <a
                href="tel:+56979002753"
                aria-label="Llamar a +56 9 7900 2753"
                className="inline-flex items-center gap-2 bg-brand-accent text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90"
              >
                <Phone size={16} />
                <span>+56 9 7900 2753</span>
              </a>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold bg-white text-brand-blue">
                <Clock size={16} />
                <span>Lunes a sábado 9:00–20:00</span>
              </span>
            </div>
          </div>
          <div className="hidden md:block">
            <img
              src="https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Farmacia"
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
