import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { ShoppingBag, User, Menu, X, Search } from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems, setIsCartOpen } = useCart();
  const { isAuthenticated, setIsLoginModalOpen, setIsSignupModalOpen, user } = useAuth();

  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/sobre-nosotros', label: 'Sobre Nosotros' },
    { path: '/productos', label: 'Productos' },
    { path: '/contacto', label: 'Contacto' }
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/productos?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#e8e4e0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl lg:text-3xl font-bold text-[#1a1a1a] tracking-tight">
              LUXO
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-10">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-[#c9a961]'
                    : 'text-[#6b6b6b] hover:text-[#1a1a1a]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors"
              aria-label="Buscar"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors"
              aria-label="Carrito"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#c9a961] text-white text-xs font-medium rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Auth Buttons - Desktop */}
            <div className="hidden lg:flex items-center space-x-3">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-[#1a1a1a] hover:text-[#c9a961] transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>{user?.name}</span>
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => setIsLoginModalOpen(true)}
                    className="px-4 py-2 text-sm font-medium text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors"
                  >
                    Iniciar Sesión
                  </button>
                  <button
                    onClick={() => setIsSignupModalOpen(true)}
                    className="px-5 py-2 text-sm font-medium bg-[#1a1a1a] text-white rounded hover:bg-[#333] transition-colors"
                  >
                    Registrarse
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors"
              aria-label="Menú"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="py-4 border-t border-[#e8e4e0] animate-fade-in">
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar productos..."
                className="flex-1 px-4 py-3 bg-[#f5f1ed] border-none rounded-l focus:outline-none focus:ring-2 focus:ring-[#c9a961] text-sm"
                autoFocus
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#1a1a1a] text-white rounded-r hover:bg-[#333] transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-[#e8e4e0] animate-fade-in">
          <nav className="px-4 py-6 space-y-4">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-2 text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-[#c9a961]'
                    : 'text-[#6b6b6b] hover:text-[#1a1a1a]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-[#e8e4e0] space-y-3">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-2 py-2 text-base font-medium text-[#1a1a1a]"
                >
                  <User className="w-5 h-5" />
                  <span>Mi Cuenta</span>
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsLoginModalOpen(true);
                    }}
                    className="block w-full py-3 text-center text-base font-medium text-[#6b6b6b] border border-[#e8e4e0] rounded hover:border-[#1a1a1a] transition-colors"
                  >
                    Iniciar Sesión
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsSignupModalOpen(true);
                    }}
                    className="block w-full py-3 text-center text-base font-medium bg-[#1a1a1a] text-white rounded hover:bg-[#333] transition-colors"
                  >
                    Registrarse
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
