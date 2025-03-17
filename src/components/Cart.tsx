import React, { useState } from 'react';
import { ShoppingCart, X, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, total, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('efectivo');
  const [deliveryMethod, setDeliveryMethod] = useState('pickup');
  const [deliveryAddress, setDeliveryAddress] = useState('');

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
      .map(item => `${item.quantity}x ${item.product.name} - ${item.product.flavors[item.selectedFlavorIndex].name} (${formatPrice(item.product.price)})`)
      .join('\n');
    const totalMessage = `\n\nTotal: ${formatPrice(total)}`;
    const paymentMessage = `\nMétodo de pago: ${paymentMethod === 'efectivo' ? 'Efectivo' : 'Mercado Pago'}`;
    const deliveryMessage = `\nMétodo de entrega: ${deliveryMethod === 'pickup' ? 'Retiro en el local' : 'Envío a domicilio (costo adicional a coordinar)'}`;
    const addressMessage = deliveryMethod === 'delivery' ? `\nDirección de envío: ${deliveryAddress}` : '';
    const whatsappUrl = `https://wa.me/+543794222701?text=${encodeURIComponent(
      'Hola! Me gustaría comprar:\n' + message + totalMessage + paymentMessage + deliveryMessage + addressMessage
    )}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!isCartOpen) {
    return (
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 right-6 bg-purple-500 p-4 rounded-full shadow-lg hover:bg-purple-600 transition-colors z-50"
      >
        <ShoppingCart className="h-6 w-6 text-white" />
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
      <div className="bg-gray-900 w-full max-w-md p-6 overflow-y-auto text-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Carrito</h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
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
                <div key={`${item.product.id}-${item.selectedFlavorIndex}`} className="flex items-center gap-4 bg-gray-800 p-4 rounded-lg">
                  <img
                    src={item.product.flavors[item.selectedFlavorIndex].image}
                    alt={`${item.product.name} - ${item.product.flavors[item.selectedFlavorIndex].name}`}
                    className="w-20 h-20 object-contain"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.product.name}</h3>
                    <p className="text-sm text-gray-400">{item.product.flavors[item.selectedFlavorIndex].name}</p>
                    <p className="text-purple-500">{formatPrice(item.product.price)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedFlavorIndex, item.quantity - 1)}
                        className="p-1 hover:bg-gray-700 rounded transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedFlavorIndex, item.quantity + 1)}
                        className={`p-1 rounded transition-colors ${
                          item.quantity >= item.product.stock 
                            ? 'opacity-50 cursor-not-allowed' 
                            : 'hover:bg-gray-700'
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
                    onClick={() => removeFromCart(item.product.id, item.selectedFlavorIndex)}
                    className="text-red-500 hover:text-red-400 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-gray-800 pt-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Método de entrega</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="pickup"
                      checked={deliveryMethod === 'pickup'}
                      onChange={(e) => setDeliveryMethod(e.target.value)}
                      className="text-purple-500 focus:ring-purple-500"
                    />
                    <span>Retiro en el local</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="delivery"
                      checked={deliveryMethod === 'delivery'}
                      onChange={(e) => setDeliveryMethod(e.target.value)}
                      className="text-purple-500 focus:ring-purple-500"
                    />
                    <div>
                      <span>Envío a domicilio</span>
                      <p className="text-sm text-gray-400">Costo adicional a coordinar</p>
                    </div>
                  </label>
                </div>

                {deliveryMethod === 'delivery' && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Dirección de envío
                    </label>
                    <textarea
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="Ingresa tu dirección completa..."
                      className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
                      rows={3}
                    />
                  </div>
                )}
              </div>

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
                className="w-full bg-green-500 hover:bg-green-600 py-3 rounded-full font-semibold transition-colors text-white"
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