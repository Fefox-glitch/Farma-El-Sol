export const ServiceAsesoriaSection = () => {
  return (
    <section id="servicios-asesoria" className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-brand-blue mb-4">Asesoría farmacéutica</h2>
      <p className="mb-6">
        Orientación profesional sobre uso correcto de medicamentos, interacciones y cuidado personal. Consulta con nuestro equipo
        para recomendaciones seguras y personalizadas.
      </p>
      <div className="flex gap-3">
        <a href="#contacto" className="bg-brand-blue text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90">Contacto</a>
        <a href="#ubicacion" className="bg-brand-accent text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90">Visítanos</a>
      </div>
    </section>
  );
};