import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, items } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const cartItem = items.find(item => item.product.id === product.id);
  const currentQuantity = cartItem?.quantity || 0;
  const isStockAvailable = currentQuantity < product.stock;

  return (
    <div className="relative flex flex-col items-center pt-32">
      <img
        src={product.image}
        alt={product.name}
        className="absolute -top-4 w-64 h-64 object-contain product-image z-10"
      />
      <div className="bg-gray-800 rounded-xl overflow-hidden shadow-xl pt-24 w-full">
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <div className="flex flex-col items-end">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                product.available 
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-red-500/20 text-red-400'
              }`}>
                {product.available ? 'Disponible' : 'Sin stock'}
              </span>
            </div>
          </div>
          <p className="text-gray-400 mb-4 text-center">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-purple-500">{formatPrice(product.price)}</span>
            <button
              onClick={() => addToCart(product)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-white font-medium transition-colors ${
                product.available && isStockAvailable
                  ? 'bg-purple-500 hover:bg-purple-600'
                  : 'bg-gray-600 cursor-not-allowed'
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