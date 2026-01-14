import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  const handleClick = () => {
    navigate(`/productos/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} agregado al carrito`);
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
      className="group relative bg-white rounded overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
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

        {/* Hover Actions */}
        <div
          className={`absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-white text-[#1a1a1a] font-medium text-sm rounded hover:bg-[#c9a961] transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            Agregar
          </button>
        </div>
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
