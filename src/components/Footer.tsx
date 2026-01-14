import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <span className="font-serif text-2xl font-semibold">
                LUXO
              </span>
            </Link>
            <p className="text-[#999] text-sm leading-relaxed mb-6">
              Elegancia accesible para quienes valoran el diseño y la calidad. 
              Cada pieza cuenta una historia de artesanía y estilo.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#333] rounded-full hover:bg-[#c9a961] hover:text-[#1a1a1a] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#333] rounded-full hover:bg-[#c9a961] hover:text-[#1a1a1a] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-6">
              Navegación
            </h4>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Inicio' },
                { to: '/sobre-nosotros', label: 'Sobre Nosotros' },
                { to: '/productos', label: 'Productos' },
                { to: '/contacto', label: 'Contacto' }
              ].map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-[#999] hover:text-[#c9a961] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-6">
              Categorías
            </h4>
            <ul className="space-y-3">
              {[
                { to: '/productos?categoria=bolsas', label: 'Bolsas' },
                { to: '/productos?categoria=billeteras', label: 'Billeteras' },
                { to: '/productos?categoria=accesorios', label: 'Accesorios' },
                { to: '/productos?badge=nuevo', label: 'Novedades' },
                { to: '/productos?badge=bestseller', label: 'Más Vendidos' }
              ].map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-[#999] hover:text-[#c9a961] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-6">
              Contacto
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#c9a961] flex-shrink-0" />
                <a
                  href="tel:+525512345678"
                  className="text-[#999] hover:text-[#c9a961] transition-colors text-sm"
                >
                  +52 55 1234 5678
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#c9a961] flex-shrink-0" />
                <a
                  href="mailto:info@luxogt.com"
                  className="text-[#999] hover:text-[#c9a961] transition-colors text-sm"
                >
                  info@luxogt.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#333]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[#666] text-sm">
              © 2026 LUXO. Todos los derechos reservados.
            </p>
            <div className="flex items-center space-x-6">
              <Link
                to="/privacidad"
                className="text-[#666] hover:text-[#999] transition-colors text-sm"
              >
                Privacidad
              </Link>
              <Link
                to="/terminos"
                className="text-[#666] hover:text-[#999] transition-colors text-sm"
              >
                Términos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
