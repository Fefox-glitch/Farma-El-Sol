export const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Tu salud, nuestra prioridad
            </h1>
            <p className="text-lg mb-6 text-emerald-50">
              Encuentra todos tus medicamentos, productos de belleza y bienestar en un solo lugar
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-bold hover:bg-emerald-50 transition-colors">
                Ver Ofertas
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-emerald-600 transition-colors">
                Receta Digital
              </button>
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
