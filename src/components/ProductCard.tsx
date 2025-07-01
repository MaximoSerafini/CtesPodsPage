import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, items } = useCart();
  const [selectedFlavorIndex, setSelectedFlavorIndex] = useState(0);
  const [isFlavorMenuOpen, setIsFlavorMenuOpen] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const cartItem = items.find(item => 
    item.product.id === product.id && 
    item.selectedFlavorIndex === selectedFlavorIndex
  );
  const currentQuantity = cartItem?.quantity || 0;
  const isStockAvailable = currentQuantity < product.stock;

  const handleAddToCart = () => {
    addToCart(product, selectedFlavorIndex);
  };

  return (
    <div className="relative flex flex-col items-center pt-32">
      <img
        src={product.flavors[selectedFlavorIndex].image}
        alt={`${product.name} - ${product.flavors[selectedFlavorIndex].name}`}
        className="absolute -top-4 w-64 h-64 object-contain hover:scale-105 transition-transform duration-300 z-10"
      />
      <div className="bg-white rounded-xl overflow-hidden shadow-lg pt-24 w-full">
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
            <div className="flex flex-col items-end">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                product.available 
                  ? 'bg-purple-100 text-purple-600'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {product.available ? 'Disponible' : 'Sin stock'}
              </span>
              <span className="text-sm text-gray-500 mt-1">
                
              </span>
            </div>
          </div>
          <p className="text-gray-600 mb-4">{product.description}</p>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Sabor Seleccionado
              </label>
              <button
                onClick={() => setIsFlavorMenuOpen(!isFlavorMenuOpen)}
                className="text-sm text-purple-600 hover:text-purple-700 transition-colors"
              >
                {isFlavorMenuOpen ? 'Cerrar' : 'Cambiar sabor'}
              </button>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-3 cursor-pointer transition-all duration-300 hover:bg-purple-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-lg p-1 shadow-sm">
                  <img
                    src={product.flavors[selectedFlavorIndex].image}
                    alt={product.flavors[selectedFlavorIndex].name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="font-medium text-purple-900">
                  {product.flavors[selectedFlavorIndex].name}
                </span>
              </div>
            </div>

            <div className={`mt-3 grid grid-cols-2 gap-4 transition-all duration-300 ease-in-out overflow-y-auto overflow-x-hidden ${
              isFlavorMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
            }`} style={{ minHeight: isFlavorMenuOpen ? '120px' : '0' }}>
              {product.flavors.map((flavor, index) => (
                <button
                  key={flavor.name}
                  onClick={() => {
                    setSelectedFlavorIndex(index);
                    setIsFlavorMenuOpen(false);
                  }}
                  className={`p-3 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                    selectedFlavorIndex === index
                      ? 'bg-purple-100 border-2 border-purple-500'
                      : 'bg-white border border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 flex items-center justify-center">
                      <img
                        src={flavor.image}
                        alt={flavor.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-sm font-medium text-center line-clamp-2">
                      {flavor.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-purple-600">
              {formatPrice(product.price)}
            </span>
            <button
              onClick={handleAddToCart}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-white font-medium transition-all duration-300 transform hover:scale-105 ${
                product.available && isStockAvailable
                  ? 'bg-purple-600 hover:bg-purple-700'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
              disabled={!product.available || !isStockAvailable}
            >
              {!product.available ? 'Sin stock' : 
               !isStockAvailable ? 'Stock máximo' : 'Agregar'}
              <ShoppingCart className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}