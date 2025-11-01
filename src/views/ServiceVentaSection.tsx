export const ServiceVentaSection = () => {
  return (
    <section id="servicios-venta" className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-brand-blue mb-4">Venta de medicamentos</h2>
      <p className="mb-6">
        Contamos con amplio stock de medicamentos éticos y bioequivalentes. Si buscas un producto específico,
        utiliza el catálogo y el buscador. Para medicamentos con receta, puedes enviarla desde la opción
        “Enviar receta”.
      </p>
      <div className="flex gap-3">
        <a href="#catalogo" className="bg-brand-blue text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90">Ver catálogo</a>
        <a href="#enviar-receta" className="bg-brand-primary text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90">Enviar receta</a>
      </div>
    </section>
  );
};