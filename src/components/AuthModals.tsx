import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export default function AuthModals() {
  const navigate = useNavigate();
  const {
    isLoginModalOpen,
    setIsLoginModalOpen,
    isSignupModalOpen,
    setIsSignupModalOpen,
    login,
    signup,
    isLoading
  } = useAuth();

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!loginData.email) {
      setErrors(prev => ({ ...prev, loginEmail: 'El correo es requerido' }));
      return;
    }
    if (loginData.password.length < 6) {
      setErrors(prev => ({ ...prev, loginPassword: 'La contraseña debe tener al menos 6 caracteres' }));
      return;
    }

    const success = await login(loginData.email, loginData.password);
    if (success) {
      toast.success('¡Bienvenido de vuelta!');
      setLoginData({ email: '', password: '' });
      navigate('/dashboard');
    } else {
      toast.error('Credenciales inválidas');
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!signupData.name) {
      setErrors(prev => ({ ...prev, signupName: 'El nombre es requerido' }));
      return;
    }
    if (!signupData.email) {
      setErrors(prev => ({ ...prev, signupEmail: 'El correo es requerido' }));
      return;
    }
    if (signupData.password.length < 6) {
      setErrors(prev => ({ ...prev, signupPassword: 'La contraseña debe tener al menos 6 caracteres' }));
      return;
    }
    if (signupData.password !== signupData.confirmPassword) {
      setErrors(prev => ({ ...prev, signupConfirm: 'Las contraseñas no coinciden' }));
      return;
    }

    const success = await signup(signupData.name, signupData.email, signupData.password);
    if (success) {
      toast.success('¡Cuenta creada exitosamente!');
      setSignupData({ name: '', email: '', password: '', confirmPassword: '' });
    } else {
      toast.error('Error al crear la cuenta');
    }
  };

  const switchToSignup = () => {
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(true);
    setErrors({});
  };

  const switchToLogin = () => {
    setIsSignupModalOpen(false);
    setIsLoginModalOpen(true);
    setErrors({});
  };

  return (
    <>
      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsLoginModalOpen(false)}
          />
          <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-md animate-fade-in">
            <button
              onClick={() => setIsLoginModalOpen(false)}
              className="absolute right-4 top-4 p-2 hover:bg-[#f5f1ed] rounded-full transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5 text-[#6b6b6b]" />
            </button>

            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="font-serif text-2xl font-semibold text-[#1a1a1a] mb-2">
                  Bienvenido de vuelta
                </h2>
                <p className="text-[#6b6b6b] text-sm">
                  Ingresa a tu cuenta para continuar
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#1a1a1a] mb-1.5">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#c9a961] transition-colors ${
                      errors.loginEmail ? 'border-red-500' : 'border-[#e8e4e0]'
                    }`}
                    placeholder="tu@email.com"
                  />
                  {errors.loginEmail && (
                    <p className="text-red-500 text-xs mt-1">{errors.loginEmail}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1a1a1a] mb-1.5">
                    Contraseña
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#c9a961] transition-colors pr-12 ${
                        errors.loginPassword ? 'border-red-500' : 'border-[#e8e4e0]'
                      }`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#6b6b6b] hover:text-[#1a1a1a]"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.loginPassword && (
                    <p className="text-red-500 text-xs mt-1">{errors.loginPassword}</p>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-[#e8e4e0] text-[#c9a961] focus:ring-[#c9a961]" />
                    <span className="text-[#6b6b6b]">Recordarme</span>
                  </label>
                  <button type="button" className="text-[#c9a961] hover:text-[#b8954f]">
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-[#1a1a1a] text-white font-semibold rounded hover:bg-[#333] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Ingresando...
                    </>
                  ) : (
                    'Iniciar Sesión'
                  )}
                </button>
              </form>

              <p className="text-center text-sm text-[#6b6b6b] mt-6">
                ¿No tienes cuenta?{' '}
                <button
                  onClick={switchToSignup}
                  className="text-[#c9a961] hover:text-[#b8954f] font-medium"
                >
                  Regístrate
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {isSignupModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsSignupModalOpen(false)}
          />
          <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-md animate-fade-in max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsSignupModalOpen(false)}
              className="absolute right-4 top-4 p-2 hover:bg-[#f5f1ed] rounded-full transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5 text-[#6b6b6b]" />
            </button>

            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="font-serif text-2xl font-semibold text-[#1a1a1a] mb-2">
                  Crea tu cuenta
                </h2>
                <p className="text-[#6b6b6b] text-sm">
                  Únete a la familia LUXO
                </p>
              </div>

              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#1a1a1a] mb-1.5">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    value={signupData.name}
                    onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                    className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#c9a961] transition-colors ${
                      errors.signupName ? 'border-red-500' : 'border-[#e8e4e0]'
                    }`}
                    placeholder="Tu nombre"
                  />
                  {errors.signupName && (
                    <p className="text-red-500 text-xs mt-1">{errors.signupName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1a1a1a] mb-1.5">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#c9a961] transition-colors ${
                      errors.signupEmail ? 'border-red-500' : 'border-[#e8e4e0]'
                    }`}
                    placeholder="tu@email.com"
                  />
                  {errors.signupEmail && (
                    <p className="text-red-500 text-xs mt-1">{errors.signupEmail}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1a1a1a] mb-1.5">
                    Contraseña
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#c9a961] transition-colors pr-12 ${
                        errors.signupPassword ? 'border-red-500' : 'border-[#e8e4e0]'
                      }`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#6b6b6b] hover:text-[#1a1a1a]"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.signupPassword && (
                    <p className="text-red-500 text-xs mt-1">{errors.signupPassword}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1a1a1a] mb-1.5">
                    Confirmar contraseña
                  </label>
                  <input
                    type="password"
                    value={signupData.confirmPassword}
                    onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                    className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#c9a961] transition-colors ${
                      errors.signupConfirm ? 'border-red-500' : 'border-[#e8e4e0]'
                    }`}
                    placeholder="••••••••"
                  />
                  {errors.signupConfirm && (
                    <p className="text-red-500 text-xs mt-1">{errors.signupConfirm}</p>
                  )}
                </div>

                <label className="flex items-start gap-2 cursor-pointer text-sm">
                  <input
                    type="checkbox"
                    className="mt-1 rounded border-[#e8e4e0] text-[#c9a961] focus:ring-[#c9a961]"
                    required
                  />
                  <span className="text-[#6b6b6b]">
                    Acepto los{' '}
                    <a href="/terminos" className="text-[#c9a961] hover:underline">
                      términos y condiciones
                    </a>{' '}
                    y la{' '}
                    <a href="/privacidad" className="text-[#c9a961] hover:underline">
                      política de privacidad
                    </a>
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-[#1a1a1a] text-white font-semibold rounded hover:bg-[#333] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Creando cuenta...
                    </>
                  ) : (
                    'Crear Cuenta'
                  )}
                </button>
              </form>

              <p className="text-center text-sm text-[#6b6b6b] mt-6">
                ¿Ya tienes cuenta?{' '}
                <button
                  onClick={switchToLogin}
                  className="text-[#c9a961] hover:text-[#b8954f] font-medium"
                >
                  Inicia sesión
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
