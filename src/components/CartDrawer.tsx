import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, Tag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    couponCode,
    setCouponCode,
    appliedDiscount,
    applyCoupon,
    clearCart
  } = useCart();
  const navigate = useNavigate();
  const [showCouponInput, setShowCouponInput] = useState(false);

  const shipping = subtotal >= 2000 ? 0 : 150;
  const discount = subtotal * appliedDiscount;
  const total = subtotal - discount + shipping;

  const handleApplyCoupon = () => {
    if (applyCoupon()) {
      toast.success('¡Cupón aplicado correctamente!');
    } else {
      toast.error('Cupón inválido');
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl animate-slide-in-right flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8e4e0]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#c9a961]" />
            <h2 className="font-serif text-xl font-semibold text-[#1a1a1a]">
              Tu Carrito
            </h2>
            <span className="text-sm text-[#6b6b6b]">({items.length})</span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-[#f5f1ed] rounded-full transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5 text-[#6b6b6b]" />
          </button>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <ShoppingBag className="w-16 h-16 text-[#e8e4e0] mb-4" />
            <h3 className="font-serif text-xl font-semibold text-[#1a1a1a] mb-2">
              Tu carrito está vacío
            </h3>
            <p className="text-[#6b6b6b] text-sm mb-6">
              Descubre nuestra colección y encuentra tu próxima pieza favorita.
            </p>
            <button
              onClick={() => {
                setIsCartOpen(false);
                navigate('/productos');
              }}
              className="px-6 py-3 bg-[#1a1a1a] text-white font-medium rounded hover:bg-[#333] transition-colors"
            >
              Ver Productos
            </button>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.map(item => (
                <div
                  key={item.product.id}
                  className="flex gap-4 pb-4 border-b border-[#e8e4e0] last:border-0"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded bg-[#f5f1ed]"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-[#1a1a1a] text-sm truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-[#6b6b6b] text-xs mt-0.5">
                      {item.product.color} • {item.product.material}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-[#e8e4e0] rounded">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="p-1.5 hover:bg-[#f5f1ed] transition-colors"
                          aria-label="Reducir cantidad"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="p-1.5 hover:bg-[#f5f1ed] transition-colors"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-semibold text-[#1a1a1a]">
                        Q. {(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-1.5 text-[#999] hover:text-red-500 transition-colors self-start"
                    aria-label="Eliminar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-[#e8e4e0] px-6 py-4 space-y-4 bg-[#faf9f7]">
              {/* Coupon */}
              {!showCouponInput ? (
                <button
                  onClick={() => setShowCouponInput(true)}
                  className="flex items-center gap-2 text-sm text-[#c9a961] hover:text-[#b8954f] transition-colors"
                >
                  <Tag className="w-4 h-4" />
                  <span>¿Tienes un cupón?</span>
                </button>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="Código de cupón"
                    className="flex-1 px-3 py-2 text-sm border border-[#e8e4e0] rounded focus:outline-none focus:ring-2 focus:ring-[#c9a961]"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 text-sm font-medium bg-[#1a1a1a] text-white rounded hover:bg-[#333] transition-colors"
                  >
                    Aplicar
                  </button>
                </div>
              )}

              {/* Summary */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-[#6b6b6b]">
                  <span>Subtotal</span>
                  <span>Q. {subtotal.toLocaleString()}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Descuento ({appliedDiscount * 100}%)</span>
                    <span>-Q. {discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#6b6b6b]">
                  <span>Envío</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-600">Gratis</span>
                    ) : (
                      `Q. ${shipping}`
                    )}
                  </span>
                </div>
                {subtotal < 2000 && (
                  <p className="text-xs text-[#c9a961]">
                    ¡Agrega Q. {(2000 - subtotal).toLocaleString()} más para envío gratis!
                  </p>
                )}
                <div className="flex justify-between font-semibold text-[#1a1a1a] text-base pt-2 border-t border-[#e8e4e0]">
                  <span>Total</span>
                  <span>Q. {total.toLocaleString()}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <button
                  onClick={handleCheckout}
                  className="w-full py-3 bg-[#c9a961] text-[#1a1a1a] font-semibold rounded hover:bg-[#d4b572] transition-colors"
                >
                  Proceder al Pago
                </button>
                <button
                  onClick={clearCart}
                  className="w-full py-2 text-sm text-[#999] hover:text-red-500 transition-colors"
                >
                  Vaciar carrito
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
