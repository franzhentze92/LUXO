import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Product } from '@/lib/types';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const handleClick = () => {
    if (isNavigating) return;
    setIsNavigating(true);
    navigate(`/productos/${product.id}`);
    // Reset after a short delay to allow navigation
    setTimeout(() => setIsNavigating(false), 500);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast.success(
      isWishlisted
        ? 'Eliminado de favoritos'
        : 'Agregado a favoritos'
    );
  };

  return (
    <div
      className="group relative bg-white rounded overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#c9a961]/20 hover:-translate-y-1 cursor-pointer border border-transparent hover:border-[#e8e4e0]"
      onClick={handleClick}
      style={{ touchAction: 'manipulation' }}
    >
      {/* Image Container */}
      <div className="relative aspect-square bg-[#f5f1ed] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 px-3 py-1 text-xs font-medium rounded ${
              product.badge === 'nuevo'
                ? 'bg-[#1a1a1a] text-white'
                : 'bg-[#c9a961] text-[#1a1a1a]'
            }`}
          >
            {product.badge === 'nuevo' ? 'Nuevo' : 'Bestseller'}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
            isWishlisted
              ? 'bg-red-500 text-white'
              : 'bg-white/80 text-[#6b6b6b] hover:bg-white hover:text-red-500'
          }`}
          aria-label={isWishlisted ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <p className="text-xs text-[#c9a961] font-medium uppercase tracking-wide mb-1">
          {product.category === 'bolsas'
            ? 'Bolsa'
            : product.category === 'billeteras'
            ? 'Billetera'
            : 'Accesorio'}
        </p>
        <h3 className="font-serif text-lg font-semibold text-[#1a1a1a] mb-1 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-[#6b6b6b] mb-2 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[#1a1a1a]">
            Q. {product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-[#999] line-through">
              Q. {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
        <p className="text-xs text-[#999] mt-1">
          {product.color} • {product.material}
        </p>
      </div>
    </div>
  );
}
