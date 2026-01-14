import React, { useState } from 'react';
import { X, Minus, Plus, Heart, ShoppingBag, Truck, Shield, RotateCcw } from 'lucide-react';
import { Product } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${product.name} agregado al carrito`);
    onClose();
    setQuantity(1);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(
      isWishlisted ? 'Eliminado de favoritos' : 'Agregado a favoritos'
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-fade-in">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 p-2 bg-white/80 hover:bg-white rounded-full transition-colors"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5 text-[#6b6b6b]" />
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="relative aspect-square bg-[#f5f1ed]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span
                className={`absolute top-4 left-4 px-3 py-1 text-xs font-medium rounded ${
                  product.badge === 'nuevo'
                    ? 'bg-[#1a1a1a] text-white'
                    : 'bg-[#c9a961] text-[#1a1a1a]'
                }`}
              >
                {product.badge === 'nuevo' ? 'Nuevo' : 'Bestseller'}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="p-6 md:p-8 overflow-y-auto max-h-[90vh] md:max-h-none">
            <p className="text-xs text-[#c9a961] font-medium uppercase tracking-wide mb-2">
              {product.category === 'bolsas'
                ? 'Bolsa'
                : product.category === 'billeteras'
                ? 'Billetera'
                : 'Accesorio'}
            </p>

            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-[#1a1a1a] mb-3">
              {product.name}
            </h2>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl font-semibold text-[#1a1a1a]">
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-[#999] line-through">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                  <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-medium rounded">
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </span>
                </>
              )}
            </div>

            <p className="text-[#6b6b6b] leading-relaxed mb-6">
              {product.description}
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-[#6b6b6b]">Color:</span>
                <span className="font-medium text-[#1a1a1a]">{product.color}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-[#6b6b6b]">Material:</span>
                <span className="font-medium text-[#1a1a1a]">{product.material}</span>
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm text-[#6b6b6b]">Cantidad:</span>
              <div className="flex items-center border border-[#e8e4e0] rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-[#f5f1ed] transition-colors"
                  aria-label="Reducir cantidad"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-[#f5f1ed] transition-colors"
                  aria-label="Aumentar cantidad"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#1a1a1a] text-white font-semibold rounded hover:bg-[#333] transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                Agregar al Carrito
              </button>
              <button
                onClick={handleWishlist}
                className={`p-3 border rounded transition-colors ${
                  isWishlisted
                    ? 'bg-red-50 border-red-200 text-red-500'
                    : 'border-[#e8e4e0] text-[#6b6b6b] hover:border-red-200 hover:text-red-500'
                }`}
                aria-label={isWishlisted ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Features */}
            <div className="border-t border-[#e8e4e0] pt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="w-5 h-5 text-[#c9a961]" />
                <span className="text-[#6b6b6b]">Envío gratis en compras mayores a $2,000</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="w-5 h-5 text-[#c9a961]" />
                <span className="text-[#6b6b6b]">Garantía de 1 año en todos los productos</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <RotateCcw className="w-5 h-5 text-[#c9a961]" />
                <span className="text-[#6b6b6b]">30 días para cambios y devoluciones</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
