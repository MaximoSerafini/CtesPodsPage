import React, { useState } from 'react';
import { ShoppingCart, X, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, total, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('efectivo');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleWhatsAppCheckout = () => {
    const message = items
      .map(item => `${item.quantity}x ${item.product.name} (${formatPrice(item.product.price)})`)
      .join('\n');
    const totalMessage = `\n\nTotal: ${formatPrice(total)}`;
    const paymentMessage = `\nMétodo de pago: ${paymentMethod === 'efectivo' ? 'Efectivo' : 'Mercado Pago'}`;
    const whatsappUrl = `https://wa.me/+543794222701?text=${encodeURIComponent(
      'Hola! Me gustaría comprar:\n' + message + totalMessage + paymentMessage
    )}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!isCartOpen) {
    return (
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 right-6 bg-purple-500 p-4 rounded-full shadow-lg hover:bg-purple-600 transition-colors z-50"
      >
        <ShoppingCart className="h-6 w-6" />
        {items.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
            {items.length}
          </span>
        )}
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-end z-50">
      <div className="bg-gray-900 w-full max-w-md p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Carrito</h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-gray-800 rounded-full"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {items.length === 0 ? (
          <p className="text-gray-400 text-center py-8">El carrito está vacío</p>
        ) : (
          <>
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.product.id} className="flex items-center gap-4 bg-gray-800 p-4 rounded-lg">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-contain"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.product.name}</h3>
                    <p className="text-purple-500">{formatPrice(item.product.price)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-700 rounded"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-700 rounded"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-red-500 hover:text-red-400"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-gray-800 pt-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Método de pago</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="efectivo"
                      checked={paymentMethod === 'efectivo'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-purple-500 focus:ring-purple-500"
                    />
                    <span>Efectivo</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="mercadopago"
                      checked={paymentMethod === 'mercadopago'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-purple-500 focus:ring-purple-500"
                    />
                    <span>Mercado Pago</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold">Total:</span>
                <span className="text-2xl font-bold text-purple-500">
                  {formatPrice(total)}
                </span>
              </div>
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full bg-green-500 hover:bg-green-600 py-3 rounded-full font-semibold transition-colors"
              >
                Comprar por WhatsApp
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}