export const ContactFormSection = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Gracias por contactarnos. Te responderemos pronto.');
  };

  return (
    <section id="contacto" className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-brand-blue mb-4">Contacto</h2>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 grid gap-4 md:grid-cols-2">
        <div className="md:col-span-1">
          <label className="block text-sm font-medium mb-1">Nombre</label>
          <input type="text" required className="w-full border rounded px-3 py-2 focus:outline-none focus:border-brand-blue" />
        </div>
        <div className="md:col-span-1">
          <label className="block text-sm font-medium mb-1">Email o Teléfono</label>
          <input type="text" required className="w-full border rounded px-3 py-2 focus:outline-none focus:border-brand-blue" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Mensaje</label>
          <textarea rows={4} required className="w-full border rounded px-3 py-2 focus:outline-none focus:border-brand-blue" />
        </div>
        <div className="md:col-span-2">
          <button type="submit" className="bg-brand-accent text-white px-5 py-3 rounded-lg font-semibold hover:opacity-90">Enviar</button>
        </div>
      </form>
    </section>
  );
};