import React, { useState } from 'react';
import { Menu, X, ShoppingCart, Instagram } from 'lucide-react';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import { products } from './data/products';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/95 backdrop-blur-sm z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <ShoppingCart className="h-8 w-8 text-purple-600" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                CtesPods
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#home" className="text-gray-600 hover:text-purple-600 px-3 py-2 transition-colors">Inicio</a>
                <a href="#products" className="text-gray-600 hover:text-purple-600 px-3 py-2 transition-colors">Productos</a>
                <a href="#contact" className="text-gray-600 hover:text-purple-600 px-3 py-2 transition-colors">Contacto</a>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-400 hover:text-purple-600 focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-sm">
              <a href="#home" className="block px-3 py-2 text-gray-600 hover:text-purple-600 transition-colors">Inicio</a>
              <a href="#products" className="block px-3 py-2 text-gray-600 hover:text-purple-600 transition-colors">Productos</a>
              <a href="#contact" className="block px-3 py-2 text-gray-600 hover:text-purple-600 transition-colors">Contacto</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center" />
        <div className="relative h-full flex items-center justify-center text-center">
          <div className="max-w-4xl px-4 animate-[fadeIn_1s_ease-out]">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              Bienvenido a CtesPods
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Descubre nuestra exclusiva colección de vapes de alta calidad
            </p>
            <div className="glow-effect mb-12">
              <img 
                src="https://i.imgur.com/flGoTUF.png"
                alt="CtesPods Logo"
                className="mx-auto w-72 h-72 md:w-96 md:h-96 object-contain hover:scale-105 transition-transform duration-500"
              />
            </div>
            <a
              href="#products"
              className="inline-block bg-white px-8 py-3 rounded-full text-purple-600 font-semibold hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Ver Productos
            </a>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            className="relative block w-full h-[100px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="fill-gray-50"
            />
          </svg>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            Nuestras Colecciones
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-purple-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <h3 className="text-2xl font-bold text-white mb-4">
                CtesPods
              </h3>
              <p className="text-white/80">Tu tienda premium de vapeo</p>
            </div>
            <div className="flex space-x-6">
              <a href="https://www.instagram.com/ctespods/" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="mt-8 border-t border-white/20 pt-8 text-center text-white/80">
            <p>&copy; {new Date().getFullYear()} CtesPods. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      <Cart />
    </div>
  );
}

export default App;