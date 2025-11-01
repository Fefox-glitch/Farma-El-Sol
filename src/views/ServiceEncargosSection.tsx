export const ServiceEncargosSection = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Solicitud de encargo enviada. Te contactaremos para confirmar.');
  };

  return (
    <section id="servicios-encargos" className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-brand-blue mb-4">Encargos y reservas</h2>
      <p className="mb-6">Puedes solicitar productos no disponibles hoy o reservar para retiro. Completa el formulario:</p>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium mb-1">Nombre</label>
          <input type="text" required className="w-full border rounded px-3 py-2 focus:outline-none focus:border-brand-blue" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Teléfono</label>
          <input type="tel" required className="w-full border rounded px-3 py-2 focus:outline-none focus:border-brand-blue" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Producto solicitado</label>
          <input type="text" required className="w-full border rounded px-3 py-2 focus:outline-none focus:border-brand-blue" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Comentarios (presentación, cantidad, etc.)</label>
          <textarea rows={4} className="w-full border rounded px-3 py-2 focus:outline-none focus:border-brand-blue" />
        </div>
        <div className="md:col-span-2">
          <button type="submit" className="bg-brand-accent text-white px-5 py-3 rounded-lg font-semibold hover:opacity-90">Enviar solicitud</button>
        </div>
      </form>
    </section>
  );
};