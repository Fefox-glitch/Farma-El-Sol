import { useProductController } from './controllers/ProductController';
import { useCartController } from './controllers/CartController';
import { Header } from './views/Header';
import { CategoryNav } from './views/CategoryNav';
import { HeroSection } from './views/HeroSection';
import { PromoBanner } from './views/PromoBanner';
import { ProductGrid } from './views/ProductGrid';
import { Cart } from './views/Cart';
import { Footer } from './views/Footer';

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

  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount,
  } = useCartController();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartCount={getCartCount()}
        onCartClick={() => setIsCartOpen(true)}
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
      />

      <CategoryNav
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

      {!searchQuery && !selectedCategory && (
        <>
          <HeroSection />
          <PromoBanner />
        </>
      )}

      <main className="container mx-auto px-4 py-8">
        {searchQuery && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Resultados para "{searchQuery}"
            </h2>
            <p className="text-gray-600 mt-1">
              {products.length} producto{products.length !== 1 ? 's' : ''} encontrado{products.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}

        {selectedCategory && !searchQuery && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {categories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <p className="text-gray-600 mt-1">
              {products.length} producto{products.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}

        {!searchQuery && !selectedCategory && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Todos los Productos</h2>
          </div>
        )}

        <ProductGrid
          products={products}
          loading={loading}
          onAddToCart={addToCart}
        />
      </main>

      <Footer />

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
        total={getCartTotal()}
      />
    </div>
  );
}

export default App;
