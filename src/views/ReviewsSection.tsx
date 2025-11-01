export const ReviewsSection = () => {
  return (
    <section id="reseñas" className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-brand-blue mb-4">Reseñas de Google</h2>
      <p className="mb-6">Lee lo que nuestros clientes opinan de nosotros.</p>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-sm text-gray-600 mb-3">Integración directa con Google próximamente.</p>
        <a
          href="https://www.google.com/maps/search/?api=1&query=Farmacias%20El%20Sol%20Lontu%C3%A9"
          target="_blank"
          rel="noopener"
          className="inline-block bg-brand-blue text-white px-4 py-2 rounded hover:opacity-90"
        >
          Ver reseñas en Google
        </a>
      </div>
    </section>
  );
};