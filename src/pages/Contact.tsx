import React, { useState } from 'react';
import { Phone, Mail, Clock, Send } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
    if (!formData.email.trim()) {
      newErrors.email = 'El correo es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Correo inválido';
    }
    if (!formData.subject.trim()) newErrors.subject = 'El asunto es requerido';
    if (!formData.message.trim()) newErrors.message = 'El mensaje es requerido';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke('contact-form', {
        body: formData
      });

      if (error) throw error;
      
      toast.success(data.message || '¡Mensaje enviado! Te contactaremos pronto.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Error al enviar el mensaje. Intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Llámanos',
      lines: ['+52 55 1234 5678', '+52 55 8765 4321']
    },
    {
      icon: Mail,
      title: 'Escríbenos',
      lines: ['hola@bolsasjuanito.com', 'ventas@bolsasjuanito.com']
    },
    {
      icon: Clock,
      title: 'Horario',
      lines: ['Lun - Vie: 10:00 - 19:00', 'Sáb: 11:00 - 17:00']
    }
  ];

  const faqItems = [
    {
      question: '¿Cuánto tiempo tarda el envío?',
      answer: 'Los envíos dentro de Guatemala tardan 1-2 días hábiles. Para el resto del país, 3-5 días hábiles.'
    },
    {
      question: '¿Puedo hacer cambios o devoluciones?',
      answer: 'Sí, tienes 30 días para cambios y devoluciones. El producto debe estar en perfectas condiciones.'
    },
    {
      question: '¿Son productos originales?',
      answer: 'Sí, todos nuestros productos son 100% originales y auténticos. Trabajamos directamente con las marcas y proveedores autorizados.'
    },
    {
      question: '¿Tienen garantía?',
      answer: 'Todos nuestros productos tienen garantía de 1 año contra defectos de fabricación.'
    }
  ];

  return (
    <div className="min-h-screen pt-16 lg:pt-20">
      {/* Header */}
      <section className="bg-[#f5f1ed] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#c9a961] font-medium tracking-widest uppercase text-sm mb-4">
            Contacto
          </p>
          <h1 className="font-serif text-4xl lg:text-5xl font-semibold text-[#1a1a1a] mb-4">
            Estamos para ayudarte
          </h1>
          <p className="text-[#6b6b6b] max-w-2xl mx-auto">
            ¿Tienes preguntas sobre nuestros productos o necesitas ayuda con tu pedido? 
            Contáctanos y te responderemos lo antes posible.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {contactInfo.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-[#c9a961]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-[#c9a961]" />
                </div>
                <h3 className="font-semibold text-[#1a1a1a] mb-2">{item.title}</h3>
                {item.lines.map((line, i) => (
                  <p key={i} className="text-[#6b6b6b] text-sm">
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Form */}
          <div>
              <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-[#1a1a1a] mb-6">
                Envíanos un mensaje
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-[#1a1a1a] mb-1.5">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#c9a961] transition-colors ${
                        errors.name ? 'border-red-500' : 'border-[#e8e4e0]'
                      }`}
                      placeholder="Tu nombre"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1a1a1a] mb-1.5">
                      Correo electrónico *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#c9a961] transition-colors ${
                        errors.email ? 'border-red-500' : 'border-[#e8e4e0]'
                      }`}
                      placeholder="tu@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-[#1a1a1a] mb-1.5">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#e8e4e0] rounded focus:outline-none focus:ring-2 focus:ring-[#c9a961]"
                      placeholder="+52 55 1234 5678"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1a1a1a] mb-1.5">
                      Asunto *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#c9a961] bg-white ${
                        errors.subject ? 'border-red-500' : 'border-[#e8e4e0]'
                      }`}
                    >
                      <option value="">Selecciona un asunto</option>
                      <option value="productos">Información de productos</option>
                      <option value="pedido">Seguimiento de pedido</option>
                      <option value="devolucion">Cambios y devoluciones</option>
                      <option value="mayoreo">Ventas al mayoreo</option>
                      <option value="otro">Otro</option>
                    </select>
                    {errors.subject && (
                      <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1a1a1a] mb-1.5">
                    Mensaje *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#c9a961] resize-none ${
                      errors.message ? 'border-red-500' : 'border-[#e8e4e0]'
                    }`}
                    placeholder="¿En qué podemos ayudarte?"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3 bg-[#1a1a1a] text-white font-semibold rounded hover:bg-[#333] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Enviar Mensaje
                    </>
                  )}
                </button>
              </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-[#f5f1ed]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#c9a961] font-medium tracking-widest uppercase text-sm mb-4">
              FAQ
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-[#1a1a1a]">
              Preguntas frecuentes
            </h2>
          </div>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <details
                key={index}
                className="bg-white rounded-lg overflow-hidden group"
              >
                <summary className="px-6 py-4 cursor-pointer font-medium text-[#1a1a1a] hover:bg-[#faf9f7] transition-colors list-none flex items-center justify-between">
                  {item.question}
                  <span className="text-[#c9a961] group-open:rotate-180 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-4 text-[#6b6b6b]">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
