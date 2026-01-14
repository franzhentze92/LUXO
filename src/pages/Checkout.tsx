import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { ArrowLeft, ShoppingBag, Lock, CreditCard, Truck, CheckCircle, Loader2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

// Initialize Stripe - using test publishable key
const stripePromise = loadStripe('pk_test_51234567890abcdefghijklmnopqrstuvwxyz');

interface CheckoutFormProps {
  clientSecret: string;
  breakdown: {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
  };
  shippingData: ShippingData;
  items: any[];
  onSuccess: (orderNumber: string) => void;
}

interface ShippingData {
  name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

function CheckoutForm({ clientSecret, breakdown, shippingData, items, onSuccess }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage('');

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + '/checkout/success',
        receipt_email: shippingData.email,
      },
      redirect: 'if_required',
    });

    if (error) {
      setErrorMessage(error.message || 'Error al procesar el pago');
      setIsProcessing(false);
      return;
    }

    if (paymentIntent && paymentIntent.status === 'succeeded') {
      // Confirm order in database
      try {
        const { data, error: confirmError } = await supabase.functions.invoke('confirm-order', {
          body: {
            paymentIntentId: paymentIntent.id,
            customerEmail: shippingData.email,
            customerName: shippingData.name,
            items,
            shippingAddress: {
              name: shippingData.name,
              street: shippingData.street,
              city: shippingData.city,
              state: shippingData.state,
              zipCode: shippingData.zipCode,
              country: 'México'
            },
            breakdown
          }
        });

        if (confirmError) throw confirmError;
        
        onSuccess(data.orderNumber);
      } catch (err) {
        console.error('Order confirmation error:', err);
        toast.error('Pago exitoso pero hubo un error al registrar el pedido. Contáctanos.');
        onSuccess('PENDING');
      }
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-[#e8e4e0]">
        <h3 className="font-serif text-lg font-semibold text-[#1a1a1a] mb-4 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-[#c9a961]" />
          Información de Pago
        </h3>
        <PaymentElement 
          options={{
            layout: 'tabs'
          }}
        />
      </div>

      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full py-4 bg-[#c9a961] text-[#1a1a1a] font-semibold rounded-lg hover:bg-[#d4b572] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Procesando pago...
          </>
        ) : (
          <>
            <Lock className="w-5 h-5" />
            Pagar Q. {breakdown.total.toLocaleString()}
          </>
        )}
      </button>

      <p className="text-center text-xs text-[#6b6b6b] flex items-center justify-center gap-1">
        <Lock className="w-3 h-3" />
        Pago seguro procesado por Stripe
      </p>
    </form>
  );
}

export default function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  
  const [step, setStep] = useState<'shipping' | 'payment' | 'success'>('shipping');
  const [clientSecret, setClientSecret] = useState('');
  const [breakdown, setBreakdown] = useState({ subtotal: 0, shipping: 0, tax: 0, total: 0 });
  const [orderNumber, setOrderNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [shippingData, setShippingData] = useState<ShippingData>({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (items.length === 0 && step !== 'success') {
      navigate('/productos');
    }
  }, [items, navigate, step]);

  const validateShipping = () => {
    const newErrors: Record<string, string> = {};
    if (!shippingData.name.trim()) newErrors.name = 'Nombre requerido';
    if (!shippingData.email.trim()) newErrors.email = 'Email requerido';
    if (!shippingData.street.trim()) newErrors.street = 'Dirección requerida';
    if (!shippingData.city.trim()) newErrors.city = 'Ciudad requerida';
    if (!shippingData.state.trim()) newErrors.state = 'Estado requerido';
    if (!shippingData.zipCode.trim()) newErrors.zipCode = 'Código postal requerido';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleShippingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateShipping()) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          items,
          customerEmail: shippingData.email,
          shippingAddress: {
            name: shippingData.name,
            street: shippingData.street,
            city: shippingData.city,
            state: shippingData.state,
            zipCode: shippingData.zipCode,
            country: 'México'
          }
        }
      });

      if (error) throw error;

      setClientSecret(data.clientSecret);
      setBreakdown(data.breakdown);
      setStep('payment');
    } catch (err) {
      console.error('Checkout error:', err);
      toast.error('Error al iniciar el checkout. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = (orderNum: string) => {
    setOrderNumber(orderNum);
    clearCart();
    setStep('success');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen pt-20 lg:pt-24 bg-[#f5f1ed]">
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="font-serif text-3xl font-semibold text-[#1a1a1a] mb-4">
              ¡Gracias por tu compra!
            </h1>
            <p className="text-[#6b6b6b] mb-2">
              Tu pedido ha sido confirmado exitosamente.
            </p>
            <p className="text-lg font-semibold text-[#c9a961] mb-6">
              Número de pedido: {orderNumber}
            </p>
            <p className="text-sm text-[#6b6b6b] mb-8">
              Recibirás un correo de confirmación con los detalles de tu pedido.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 bg-[#1a1a1a] text-white font-medium rounded hover:bg-[#333] transition-colors"
              >
                Ver mis pedidos
              </button>
              <button
                onClick={() => navigate('/productos')}
                className="px-6 py-3 border border-[#1a1a1a] text-[#1a1a1a] font-medium rounded hover:bg-[#1a1a1a] hover:text-white transition-colors"
              >
                Seguir comprando
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 lg:pt-24 bg-[#f5f1ed]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => step === 'payment' ? setStep('shipping') : navigate(-1)}
            className="flex items-center gap-2 text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            {step === 'payment' ? 'Volver a envío' : 'Volver al carrito'}
          </button>
          <h1 className="font-serif text-3xl font-semibold text-[#1a1a1a]">
            Checkout
          </h1>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {['Envío', 'Pago'].map((label, index) => (
            <React.Fragment key={label}>
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  (index === 0 && step === 'shipping') || (index === 1 && step === 'payment')
                    ? 'bg-[#c9a961] text-[#1a1a1a]'
                    : index === 0 && step === 'payment'
                    ? 'bg-green-500 text-white'
                    : 'bg-[#e8e4e0] text-[#6b6b6b]'
                }`}>
                  {index === 0 && step === 'payment' ? '✓' : index + 1}
                </div>
                <span className={`text-sm font-medium ${
                  (index === 0 && step === 'shipping') || (index === 1 && step === 'payment')
                    ? 'text-[#1a1a1a]'
                    : 'text-[#6b6b6b]'
                }`}>
                  {label}
                </span>
              </div>
              {index < 1 && (
                <div className={`w-16 h-0.5 ${
                  step === 'payment' ? 'bg-[#c9a961]' : 'bg-[#e8e4e0]'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            {step === 'shipping' && (
              <form onSubmit={handleShippingSubmit} className="space-y-6">
                <div className="bg-white p-6 rounded-lg border border-[#e8e4e0]">
                  <h3 className="font-serif text-lg font-semibold text-[#1a1a1a] mb-4 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-[#c9a961]" />
                    Información de Envío
                  </h3>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#1a1a1a] mb-1">
                        Nombre completo *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={shippingData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#c9a961] ${
                          errors.name ? 'border-red-500' : 'border-[#e8e4e0]'
                        }`}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1a1a1a] mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={shippingData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#c9a961] ${
                          errors.email ? 'border-red-500' : 'border-[#e8e4e0]'
                        }`}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-[#1a1a1a] mb-1">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={shippingData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[#e8e4e0] rounded focus:outline-none focus:ring-2 focus:ring-[#c9a961]"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-[#1a1a1a] mb-1">
                        Dirección *
                      </label>
                      <input
                        type="text"
                        name="street"
                        value={shippingData.street}
                        onChange={handleChange}
                        placeholder="Calle, número, colonia"
                        className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#c9a961] ${
                          errors.street ? 'border-red-500' : 'border-[#e8e4e0]'
                        }`}
                      />
                      {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1a1a1a] mb-1">
                        Ciudad *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={shippingData.city}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#c9a961] ${
                          errors.city ? 'border-red-500' : 'border-[#e8e4e0]'
                        }`}
                      />
                      {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1a1a1a] mb-1">
                        Estado *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={shippingData.state}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#c9a961] ${
                          errors.state ? 'border-red-500' : 'border-[#e8e4e0]'
                        }`}
                      />
                      {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1a1a1a] mb-1">
                        Código Postal *
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={shippingData.zipCode}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#c9a961] ${
                          errors.zipCode ? 'border-red-500' : 'border-[#e8e4e0]'
                        }`}
                      />
                      {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-[#1a1a1a] text-white font-semibold rounded-lg hover:bg-[#333] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    'Continuar al pago'
                  )}
                </button>
              </form>
            )}

            {step === 'payment' && clientSecret && (
              <Elements 
                stripe={stripePromise} 
                options={{ 
                  clientSecret,
                  appearance: {
                    theme: 'stripe',
                    variables: {
                      colorPrimary: '#c9a961',
                      colorBackground: '#ffffff',
                      colorText: '#1a1a1a',
                      colorDanger: '#ef4444',
                      fontFamily: 'Inter, system-ui, sans-serif',
                      borderRadius: '4px'
                    }
                  }
                }}
              >
                <CheckoutForm 
                  clientSecret={clientSecret}
                  breakdown={breakdown}
                  shippingData={shippingData}
                  items={items}
                  onSuccess={handlePaymentSuccess}
                />
              </Elements>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg border border-[#e8e4e0] sticky top-24">
              <h3 className="font-serif text-lg font-semibold text-[#1a1a1a] mb-4 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#c9a961]" />
                Resumen del Pedido
              </h3>

              <div className="space-y-4 mb-6">
                {items.map(item => (
                  <div key={item.product.id} className="flex gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded bg-[#f5f1ed]"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[#1a1a1a] text-sm truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-[#6b6b6b]">
                        Cantidad: {item.quantity}
                      </p>
                      <p className="text-sm font-medium text-[#1a1a1a]">
                        Q. {(item.product.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#e8e4e0] pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-[#6b6b6b]">
                  <span>Subtotal</span>
                  <span>Q. {(step === 'payment' ? breakdown.subtotal : subtotal).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#6b6b6b]">
                  <span>Envío</span>
                  <span>
                    {(step === 'payment' ? breakdown.shipping : (subtotal >= 2000 ? 0 : 150)) === 0 
                      ? <span className="text-green-600">Gratis</span>
                      : `Q. ${step === 'payment' ? breakdown.shipping : 150}`
                    }
                  </span>
                </div>
                <div className="flex justify-between text-[#6b6b6b]">
                  <span>IVA (12%)</span>
                  <span>Q. {(step === 'payment' ? breakdown.tax : Math.round(subtotal * 0.12)).toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-semibold text-[#1a1a1a] text-base pt-2 border-t border-[#e8e4e0]">
                  <span>Total</span>
                  <span>
                    Q. {(step === 'payment' 
                      ? breakdown.total 
                      : subtotal + (subtotal >= 2000 ? 0 : 150) + Math.round(subtotal * 0.12)
                    ).toLocaleString()}
                  </span>
                </div>
              </div>

              {subtotal < 2000 && (
                <p className="text-xs text-[#c9a961] mt-4">
                  Agrega Q. {(2000 - subtotal).toLocaleString()} más para envío gratis
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
