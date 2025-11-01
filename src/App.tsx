import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useProductController } from './controllers/ProductController';
import { useCartController } from './controllers/CartController';
import { Header } from './views/Header';
import { MainNav } from './views/MainNav';
import { HeroSection } from './views/HeroSection';
import { PromoBanner } from './views/PromoBanner';
import { ProductGrid } from './views/ProductGrid';
import { FiltersBar } from './views/FiltersBar';
import { Cart } from './views/Cart';
import { Footer } from './views/Footer';
import { ServicesSection } from './views/ServicesSection';
import { ServiceVentaSection } from './views/ServiceVentaSection';
import { ServiceEncargosSection } from './views/ServiceEncargosSection';
import { ServiceRecetasSection } from './views/ServiceRecetasSection';
import { ServiceAsesoriaSection } from './views/ServiceAsesoriaSection';
import { ServiceCuidadoSection } from './views/ServiceCuidadoSection';
import { MapSection } from './views/MapSection';
import { ReviewsSection } from './views/ReviewsSection';
import { WhatsAppButton } from './views/WhatsAppButton';
import { ContactFormSection } from './views/ContactFormSection';
import { PrescriptionFormSection } from './views/PrescriptionFormSection';
import { AdminOrders } from './views/AdminOrders';
import { AdminProducts } from './views/AdminProducts';
import { AdminLogin } from './views/AdminLogin';
import { RequireAdmin } from './views/RequireAdmin';

function App() {
  const {
    products,
    categories,
    loading,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
  } = useProductController();

  const [sortKey, setSortKey] = useState<'relevance' | 'price_asc' | 'price_desc'>('relevance');
  const [prescriptionFilter, setPrescriptionFilter] = useState<'all' | 'requires' | 'no_requires'>('all');

  const applyFilters = (list: typeof products) => {
    let res = list;
    if (prescriptionFilter === 'requires') res = res.filter(p => p.requires_prescription);
    if (prescriptionFilter === 'no_requires') res = res.filter(p => !p.requires_prescription);
    if (sortKey === 'price_asc') res = [...res].sort((a, b) => a.price - b.price);
    if (sortKey === 'price_desc') res = [...res].sort((a, b) => b.price - a.price);
    return res;
  };

  const displayProducts = applyFilters(products);

  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    checkout,
    getCartTotal,
    getCartCount,
    reservation,
    buyerName,
    buyerPhone,
    setBuyerName,
    setBuyerPhone,
  } = useCartController();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartCount={getCartCount()}
        onCartClick={() => setIsCartOpen(true)}
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
      />

      <MainNav categories={categories} onCategorySelect={(id) => setSelectedCategory(id)} />


      <Routes>
        <Route
          path="/"
          element={(
            <>
              <HeroSection />
              <PromoBanner />
              <ServicesSection />
              <MapSection />
              <ReviewsSection />
              <ContactFormSection />
            </>
          )}
        />

        <Route
          path="/productos"
          element={(
            <main id="catalogo" className="container mx-auto px-4 py-8">
              <FiltersBar
                sortKey={sortKey}
                onSortChange={setSortKey}
                prescriptionFilter={prescriptionFilter}
                onPrescriptionFilterChange={setPrescriptionFilter}
              />
              {searchQuery && (
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Resultados para "{searchQuery}"
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {displayProducts.length} producto{displayProducts.length !== 1 ? 's' : ''} encontrado{displayProducts.length !== 1 ? 's' : ''}
                  </p>
                </div>
              )}

              {selectedCategory && !searchQuery && (
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {categories.find(c => c.id === selectedCategory)?.name}
                    </h2>
                    <p className="text-gray-600 mt-1">
                      {displayProducts.length} producto{displayProducts.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedCategory(null)}
                    className="ml-4 inline-flex items-center px-3 py-2 rounded-md text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                  >
                    Quitar filtro
                  </button>
                </div>
              )}

              {!searchQuery && !selectedCategory && (
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Todos los Productos</h2>
                </div>
              )}

              {selectedCategory && categories.find(c => c.id === selectedCategory)?.slug.includes('controlados') && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
                  <p className="text-yellow-800 text-sm">Venta sujeta a receta retenida / receta médica.</p>
                </div>
              )}

              <ProductGrid
                products={displayProducts}
                loading={loading}
                onAddToCart={addToCart}
              />
            </main>
          )}
        />

        <Route path="/servicios/venta" element={<ServiceVentaSection />} />
        <Route path="/servicios/encargos" element={<ServiceEncargosSection />} />
        <Route path="/servicios/recetas-controladas" element={<ServiceRecetasSection />} />
        <Route path="/servicios/asesoria" element={<ServiceAsesoriaSection />} />
        <Route path="/servicios/cuidado" element={<ServiceCuidadoSection />} />
        <Route path="/servicios/enviar-receta" element={<PrescriptionFormSection />} />
      </Routes>
      {/* Rutas de administración con acceso controlado */}
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<RequireAdmin><AdminOrders /></RequireAdmin>} />
        <Route path="/admin/reservas" element={<RequireAdmin><AdminOrders /></RequireAdmin>} />
        <Route path="/admin/productos" element={<RequireAdmin><AdminProducts /></RequireAdmin>} />
      </Routes>

      <Footer />

      <WhatsAppButton />

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
        total={getCartTotal()}
        onCheckout={checkout}
        reservation={reservation}
        buyerName={buyerName}
        buyerPhone={buyerPhone}
        onBuyerNameChange={setBuyerName}
        onBuyerPhoneChange={setBuyerPhone}
      />
    </div>
  );
}

export default App;
