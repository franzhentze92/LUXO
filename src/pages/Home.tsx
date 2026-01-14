import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronRight, Truck, Shield, RotateCcw, Award } from 'lucide-react';
import { products, craftImages } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import QuickViewModal from '@/components/QuickViewModal';
import { Product } from '@/lib/types';

export default function Home() {
  const navigate = useNavigate();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const featuredProducts = products.filter(p => p.badge === 'bestseller' || p.badge === 'nuevo').slice(0, 8);
  const categories = [
    { name: 'Bolsas', slug: 'bolsas', count: products.filter(p => p.category === 'bolsas').length },
    { name: 'Billeteras', slug: 'billeteras', count: products.filter(p => p.category === 'billeteras').length },
    { name: 'Accesorios', slug: 'accesorios', count: products.filter(p => p.category === 'accesorios').length }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative w-full h-[400px] lg:h-[500px] mb-4">
        <div className="absolute inset-0">
          <img
            src="/hero.png"
            alt="LUXO - Nueva Colección"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="text-white text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-8">
              Nueva Colección 2026
            </h1>
            <div className="flex justify-center">
              <button
                onClick={() => navigate('/productos')}
                className="px-8 py-3 bg-[#722F37] text-white font-bold rounded-lg hover:bg-[#8B2635] transition-colors"
              >
                Explorar Colección
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar - Solo desktop */}
      <section className="hidden md:block bg-[#f5f1ed] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Truck, text: 'Envío gratis +$2,000', color: 'text-[#722F37]' },
              { icon: Shield, text: 'Garantía 1 año', color: 'text-[#722F37]' },
              { icon: RotateCcw, text: '30 días devolución', color: 'text-[#722F37]' },
              { icon: Award, text: 'Calidad premium', color: 'text-[#722F37]' }
            ].map((feature, index) => (
              <div key={index} className="flex items-center justify-center gap-3 text-gray-800 bg-white rounded-lg p-3 hover:bg-[#E5D9C7] transition-all">
                <feature.icon className={`w-5 h-5 ${feature.color}`} />
                <span className="text-sm font-semibold">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              Explora por Categoría
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base">
              Encuentra la pieza perfecta para complementar tu estilo
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { ...categories[0], color: 'from-[#722F37]/60 to-[#8B2635]/50' },
              { ...categories[1], color: 'from-[#722F37]/60 to-[#722F37]/50' },
              { ...categories[2], color: 'from-[#8B2635]/60 to-[#722F37]/50' }
            ].map((category) => (
              <Link
                key={category.slug}
                to={`/productos?categoria=${category.slug}`}
                className="group relative h-48 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all"
              >
                <img
                  src={products.find(p => p.category === category.slug)?.image || ''}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${category.color}`} />
                <div className="absolute inset-0 flex flex-col items-center justify-end p-4 text-center">
                  <h3 className="text-lg font-bold text-white mb-1 drop-shadow-lg">
                    {category.name}
                  </h3>
                  <p className="text-white text-xs font-semibold mb-2 drop-shadow-md">
                    {category.count} productos
                  </p>
                  <span className="inline-flex items-center gap-1 bg-white text-[#722F37] px-3 py-1.5 rounded-full font-bold text-xs hover:gap-2 transition-all">
                    Ver más <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 lg:py-16 bg-[#f5f1ed]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                Productos Destacados
              </h2>
              <p className="hidden md:block text-gray-600 max-w-xl text-base">
                Nuestra selección de piezas más populares y novedades exclusivas
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className={index >= 4 ? 'hidden lg:block' : ''}>
                <ProductCard
                  product={product}
                  onQuickView={setQuickViewProduct}
                />
              </div>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Link
              to="/productos"
              className="inline-flex items-center gap-2 bg-[#722F37] text-white px-5 py-2.5 rounded-full font-bold hover:bg-[#8B2635] hover:gap-3 transition-all"
            >
              Ver todos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-12 lg:py-16 bg-gradient-to-r from-[#722F37] to-[#8B2635]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-[#D4C4B0] font-bold tracking-wide uppercase text-sm mb-3">
                Nuestra Historia
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-5">
                Creatividad que cuenta historias
              </h2>
              <p className="text-white/90 text-base leading-relaxed mb-5">
                LUXO nace con una idea clara: hacer accesibles bolsas, billeteras y accesorios de marcas reconocidas, cuidadosamente seleccionadas por su calidad, diseño y estilo. Nos dedicamos a importar piezas que combinan elegancia y funcionalidad, buscando siempre ese balance entre lo clásico y lo moderno, para que cada producto encaje naturalmente en el día a día sin perder sofisticación.
              </p>
              <p className="hidden md:block text-white/90 text-base leading-relaxed mb-6">
                Creemos que el buen diseño y la calidad no deberían ser inaccesibles. Por eso, trabajamos para ofrecer productos auténticos a precios justos y accesibles, sin sacrificar estilo ni experiencia. En LUXO, cada artículo es elegido con intención, pensando en personas que valoran verse bien, comprar con confianza y encontrar en un solo lugar piezas que realmente valen la pena.
              </p>
              <button
                onClick={() => navigate('/sobre-nosotros')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#722F37] font-bold rounded-lg hover:bg-[#D4C4B0] hover:text-[#722F37] transition-all shadow-lg"
              >
                Conoce más
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {craftImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Artesanía ${index + 1}`}
                  className={`rounded-lg object-cover shadow-lg ${
                    index === 0 ? 'h-56 lg:h-72' : 'h-44 lg:h-56 mt-6'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-8 lg:py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              Lo que dicen nuestros clientes
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'María García',
                text: 'La calidad de mi bolso es increíble. Se nota que está hecho con amor y dedicación. Definitivamente volveré a comprar.',
                rating: 5
              },
              {
                name: 'Carlos Rodríguez',
                text: 'Compré una billetera para mi esposa y quedó encantada. El cuero es suave y el diseño muy moderno.',
                rating: 5
              },
              {
                name: 'Ana Martínez',
                text: 'El servicio al cliente es excelente y el producto superó mis expectativas. Muy recomendado.',
                rating: 5
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-[#f5f1ed] p-4 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex gap-1 mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-[#722F37]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-3 font-medium text-sm leading-relaxed">"{testimonial.text}"</p>
                <p className="font-bold text-[#722F37] text-base">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-[#c9a961]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-[#1a1a1a] mb-4">
            ¿Listo para descubrir nuestra colección?
          </h2>
          <p className="text-[#1a1a1a]/70 mb-8 text-lg">
            Explora nuestros productos y encuentra la pieza perfecta para ti
          </p>
          <button
            onClick={() => navigate('/productos')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#1a1a1a] text-white font-semibold rounded hover:bg-[#333] transition-colors"
          >
            Ver Productos
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}



