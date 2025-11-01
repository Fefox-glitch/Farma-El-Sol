export const ServiceRecetasSection = () => {
  return (
    <section id="servicios-recetas" className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-brand-blue mb-4">Recetas retenidas y controladas</h2>
      <p className="mb-4">
        La dispensación de medicamentos sujetos a control requiere receta médica y cumplimiento estricto de normativa ISP.
        Puedes enviar tu receta desde el formulario y coordinar la entrega segura.
      </p>
      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
        <p className="text-yellow-800 text-sm">Venta sujeta a receta retenida / receta médica.</p>
      </div>
      <a href="#enviar-receta" className="bg-brand-primary text-white px-5 py-3 rounded-lg font-semibold hover:opacity-90">Enviar receta</a>
    </section>
  );
};