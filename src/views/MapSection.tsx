export const MapSection = () => {
  return (
    <section id="ubicacion" className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-brand-blue mb-4">Ubicación</h2>
      <p className="mb-6">Encuéntranos en Lontué y Sagrada Familia.</p>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="w-full h-64">
          <iframe
            title="Mapa Lontué"
            className="w-full h-full rounded-lg border"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=Luz%20Pereira%202020,%20Lontu%C3%A9,%20Molina&output=embed"
          />
        </div>
        <div className="w-full h-64">
          <iframe
            title="Mapa Sagrada Familia"
            className="w-full h-full rounded-lg border"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=Valdivia%20157,%20Sagrada%20Familia,%20Maule&output=embed"
          />
        </div>
      </div>
    </section>
  );
};