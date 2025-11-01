export const PrescriptionFormSection = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Receta enviada. Te contactaremos para confirmar y coordinar.');
  };

  return (
    <section id="enviar-receta" className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-brand-blue mb-4">Enviar receta</h2>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 grid gap-4 md:grid-cols-2">
        <div className="md:col-span-1">
          <label className="block text-sm font-medium mb-1">Nombre</label>
          <input type="text" required className="w-full border rounded px-3 py-2 focus:outline-none focus:border-brand-blue" />
        </div>
        <div className="md:col-span-1">
          <label className="block text-sm font-medium mb-1">Teléfono</label>
          <input type="tel" required className="w-full border rounded px-3 py-2 focus:outline-none focus:border-brand-blue" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Adjuntar receta (foto o PDF)</label>
          <input type="file" required accept="image/*,application/pdf" className="w-full border rounded px-3 py-2" />
        </div>
        <div className="md:col-span-2">
          <button type="submit" className="bg-brand-primary text-white px-5 py-3 rounded-lg font-semibold hover:opacity-90">Enviar receta</button>
        </div>
      </form>
    </section>
  );
};