import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, Heart, ShoppingBag, Truck, Shield, RotateCcw } from 'lucide-react';
import { products } from '@/lib/data';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import ProductCard from '@/components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();

  const product = products.find(p => p.id === id);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 2);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen pt-20 lg:pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-[#1a1a1a] mb-4">Producto no encontrado</h1>
          <button
            onClick={() => navigate('/productos')}
            className="text-[#c9a961] font-medium hover:text-[#b8954f]"
          >
            Volver a productos
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${product.name} agregado al carrito`);
    setQuantity(1);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(
      isWishlisted ? 'Eliminado de favoritos' : 'Agregado a favoritos'
    );
  };

  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/productos')}
          className="flex items-center gap-2 text-[#6b6b6b] hover:text-[#1a1a1a] mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a productos
        </button>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div className="relative aspect-square bg-[#f5f1ed] rounded-lg overflow-hidden">
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
          <div>
            <p className="text-xs text-[#c9a961] font-medium uppercase tracking-wide mb-2">
              {product.category === 'bolsas'
                ? 'Bolsa'
                : product.category === 'billeteras'
                ? 'Billetera'
                : 'Accesorio'}
            </p>

            <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-[#1a1a1a] mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-semibold text-[#1a1a1a]">
                Q. {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-[#999] line-through">
                    Q. {product.originalPrice.toLocaleString()}
                  </span>
                  <span className="px-2 py-1 bg-red-100 text-red-600 text-sm font-medium rounded">
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </span>
                </>
              )}
            </div>

            <p className="text-[#6b6b6b] leading-relaxed mb-6">
              {product.description}
            </p>

            <div className="space-y-3 mb-8">
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
            <div className="flex items-center gap-4 mb-8">
              <span className="text-sm font-medium text-[#1a1a1a]">Cantidad:</span>
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
            <div className="flex gap-3 mb-8">
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
            <div className="border-t border-[#e8e4e0] pt-6 space-y-4">
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

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-12 pt-8 border-t border-[#e8e4e0]">
            <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-6">Productos relacionados</h2>
            <div className="grid grid-cols-2 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                />
              ))}
            </div>
          </section>
        )}

        {/* Payment Methods */}
        <section className="mt-12 pt-8 border-t border-[#e8e4e0]">
          <h2 className="text-xl font-semibold text-[#1a1a1a] mb-4">Métodos de pago</h2>
          <div className="bg-[#f5f1ed] rounded-lg p-6">
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="w-16 h-10 bg-white rounded flex items-center justify-center">
                <span className="text-xs font-bold text-blue-600">AMEX</span>
              </div>
              <div className="w-16 h-10 bg-white rounded flex items-center justify-center">
                <div className="flex">
                  <div className="w-6 h-6 bg-red-500 rounded-full -mr-2"></div>
                  <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
                </div>
              </div>
              <div className="w-16 h-10 bg-white rounded flex items-center justify-center">
                <span className="text-xl font-bold text-blue-600">VISA</span>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-[#6b6b6b]">
              <li>• Tarjeta (contado y cuotas sin recargo)</li>
              <li>• Efectivo contra entrega</li>
              <li>• Depósito o transferencia bancaria (5% de descuento)</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
