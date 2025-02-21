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
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(
      'Hola! Me gustaría comprar:\n' + message + totalMessage + paymentMessage
    )}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!isCartOpen) {
    return (
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 right-6 bg-[#A31621] p-4 rounded-full shadow-lg hover:bg-[#A31621]/90 transition-colors z-50"
      >
        <ShoppingCart className="h-6 w-6 text-white" />
        {items.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center border-2 border-[#A31621]">
            {items.length}
          </span>
        )}
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-end z-50">
      <div className="bg-black w-full max-w-md p-6 overflow-y-auto border-l border-[#A31621]/20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Carrito</h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-[#A31621]/10 rounded-full text-gray-400 hover:text-white transition-colors"
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
                <div key={item.product.id} className="flex items-center gap-4 bg-gray-900 p-4 rounded-lg border border-[#A31621]/20">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-contain"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{item.product.name}</h3>
                    <p className="text-[#A31621]">{formatPrice(item.product.price)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 hover:bg-[#A31621]/10 rounded text-gray-400 hover:text-white transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className={`p-1 rounded text-gray-400 hover:text-white transition-colors ${
                          item.quantity >= item.product.stock 
                            ? 'opacity-50 cursor-not-allowed' 
                            : 'hover:bg-[#A31621]/10'
                        }`}
                        disabled={item.quantity >= item.product.stock}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                      {item.quantity >= item.product.stock && (
                        <span className="text-xs text-yellow-500 ml-2">
                          Stock máximo alcanzado
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-[#A31621] hover:text-[#A31621]/80 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-[#A31621]/20 pt-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-white mb-2">Método de pago</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="efectivo"
                      checked={paymentMethod === 'efectivo'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-[#A31621] focus:ring-[#A31621] focus:ring-offset-black"
                    />
                    <span className="text-gray-300">Efectivo</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="mercadopago"
                      checked={paymentMethod === 'mercadopago'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-[#A31621] focus:ring-[#A31621] focus:ring-offset-black"
                    />
                    <span className="text-gray-300">Mercado Pago</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold text-white">Total:</span>
                <span className="text-2xl font-bold text-[#A31621]">
                  {formatPrice(total)}
                </span>
              </div>
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full bg-[#A31621] hover:bg-[#A31621]/90 py-3 rounded-full font-semibold transition-colors text-white"
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