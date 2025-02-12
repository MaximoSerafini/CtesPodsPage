import React, { useState } from 'react';
import { Menu, X, ShoppingCart, Instagram, Facebook } from 'lucide-react';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import { products } from './data/products';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-gray-900/95 backdrop-blur-sm z-40 border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <ShoppingCart className="h-8 w-8 text-purple-500" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                CtesPods
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#home" className="hover:text-purple-500 px-3 py-2 transition-colors">Inicio</a>
                <a href="#products" className="hover:text-purple-500 px-3 py-2 transition-colors">Productos</a>
                <a href="#contact" className="hover:text-purple-500 px-3 py-2 transition-colors">Contacto</a>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-400 hover:text-white focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900/95 backdrop-blur-sm">
              <a href="#home" className="block px-3 py-2 hover:text-purple-500 transition-colors">Inicio</a>
              <a href="#products" className="block px-3 py-2 hover:text-purple-500 transition-colors">Productos</a>
              <a href="#contact" className="block px-3 py-2 hover:text-purple-500 transition-colors">Contacto</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen animated-gradient">
        <div className="relative h-full flex items-center justify-center text-center">
          <div className="max-w-4xl px-4">
            <div className="glow-effect">
              <img 
                src="https://i.imgur.com/flGoTUF.png"
                alt="CtesPods Logo"
                className="mx-auto mb-12 w-96 h-96 object-contain animate-pulse-glow"
              />
            </div>
            <a
              href="#products"
              className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 rounded-full text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Ver Productos
            </a>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
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
      <footer id="contact" className="bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
                CtesPods
              </h3>
              <p className="text-gray-400">Tu tienda premium de vapeo</p>
            </div>
            <div className="flex space-x-6">
              <a href="https://www.instagram.com/ctespods/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-500 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} CtesPods. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      <Cart />
    </div>
  );
}

export default App;