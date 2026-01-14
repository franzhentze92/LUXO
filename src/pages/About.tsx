import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Heart, Award, Users, Leaf } from 'lucide-react';
import { craftImages } from '@/lib/data';

export default function About() {
  const navigate = useNavigate();

  const values = [
    {
      icon: Heart,
      title: 'Pasión por el Detalle',
      description: 'Cada puntada, cada corte, cada acabado es realizado con dedicación y amor por nuestro oficio.'
    },
    {
      icon: Award,
      title: 'Calidad Premium',
      description: 'Seleccionamos los mejores materiales para garantizar productos que duran toda la vida.'
    },
    {
      icon: Users,
      title: 'Comunidad',
      description: 'Construimos relaciones duraderas con nuestros clientes, artesanos y proveedores.'
    },
    {
      icon: Leaf,
      title: 'Sostenibilidad',
      description: 'Comprometidos con prácticas responsables y materiales de origen ético.'
    }
  ];

  return (
    <div className="min-h-screen pt-16 lg:pt-20">
      {/* Story */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#c9a961] font-medium tracking-widest uppercase text-sm mb-4">
                Quiénes Somos
              </p>
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-[#1a1a1a] mb-6">
                Una historia de pasión y dedicación
              </h2>
              <div className="space-y-4 text-[#6b6b6b] leading-relaxed">
                <p>
                  LUXO nació de un sueño: crear accesorios de cuero que combinaran 
                  la elegancia atemporal con la accesibilidad. Todo comenzó en un pequeño 
                  taller familiar, donde Juan aprendió el arte de trabajar el cuero de su 
                  abuelo, un maestro artesano con más de 50 años de experiencia.
                </p>
                <p>
                  Hoy, ese legado continúa en cada pieza que creamos. Nuestro equipo de 
                  artesanos trabaja con las mismas técnicas tradicionales, pero con un 
                  enfoque moderno en diseño y funcionalidad. Cada bolsa, billetera y 
                  accesorio cuenta una historia de dedicación y amor por el oficio.
                </p>
                <p>
                  Creemos que la verdadera elegancia no tiene que ser inalcanzable. Por 
                  eso nos esforzamos en ofrecer productos de calidad premium a precios 
                  justos, haciendo que el lujo sea accesible para todos.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src={craftImages[0]}
                alt="Artesanía"
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#c9a961] text-[#1a1a1a] p-6 rounded-lg">
                <p className="font-serif text-4xl font-bold">10+</p>
                <p className="text-sm font-medium">Años de experiencia</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-[#f5f1ed]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#c9a961] font-medium tracking-widest uppercase text-sm mb-4">
              Nuestros Valores
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-[#1a1a1a]">
              Lo que nos define
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-[#c9a961]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-[#c9a961]" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-[#1a1a1a] mb-2">
                  {value.title}
                </h3>
                <p className="text-[#6b6b6b] text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-[#c9a961]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-[#1a1a1a] mb-4">
            ¿Listo para descubrir nuestra colección?
          </h2>
          <p className="text-[#1a1a1a]/70 mb-8">
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
    </div>
  );
}
