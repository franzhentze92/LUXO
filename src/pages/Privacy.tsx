import React from 'react';

export default function Privacy() {
  return (
    <div className="min-h-screen pt-16 lg:pt-20 bg-[#f5f1ed]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="bg-white rounded-lg shadow-sm p-8 lg:p-12">
          <h1 className="font-serif text-4xl lg:text-5xl font-semibold text-[#1a1a1a] mb-6">
            Política de Privacidad
          </h1>
          
          <div className="prose max-w-none text-[#6b6b6b] space-y-6">
            <p className="text-sm text-[#999] mb-8">
              Última actualización: {new Date().toLocaleDateString('es-GT', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-4">1. Información que recopilamos</h2>
              <p className="mb-4">
                En LUXO, recopilamos información que nos proporcionas directamente cuando realizas una compra, 
                creas una cuenta, te suscribes a nuestro boletín o te pones en contacto con nosotros. Esta 
                información puede incluir:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li>Nombre completo</li>
                <li>Dirección de correo electrónico</li>
                <li>Número de teléfono</li>
                <li>Dirección de envío y facturación</li>
                <li>Información de pago (procesada de forma segura a través de nuestros proveedores de pago)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-4">2. Uso de la información</h2>
              <p className="mb-4">
                Utilizamos la información recopilada para:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li>Procesar y completar tus pedidos</li>
                <li>Comunicarnos contigo sobre tu pedido y proporcionar servicio al cliente</li>
                <li>Enviarte actualizaciones sobre nuestros productos y servicios (si has dado tu consentimiento)</li>
                <li>Mejorar nuestra plataforma y experiencia de usuario</li>
                <li>Cumplir con obligaciones legales</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-4">3. Protección de datos</h2>
              <p className="mb-4">
                Implementamos medidas de seguridad técnicas y organizativas para proteger tu información 
                personal. Utilizamos conexiones seguras (HTTPS) y nuestros proveedores de pago cumplen 
                con los estándares de seguridad PCI DSS.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-4">4. Compartir información</h2>
              <p className="mb-4">
                No vendemos ni alquilamos tu información personal a terceros. Compartimos información 
                únicamente con:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li>Proveedores de servicios que nos ayudan a operar nuestro negocio (procesamiento de pagos, envío, etc.)</li>
                <li>Cuando sea requerido por ley o para proteger nuestros derechos</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-4">5. Tus derechos</h2>
              <p className="mb-4">
                Tienes derecho a:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li>Acceder a tu información personal</li>
                <li>Corregir información incorrecta</li>
                <li>Solicitar la eliminación de tu información</li>
                <li>Oponerte al procesamiento de tu información</li>
                <li>Retirar tu consentimiento en cualquier momento</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-4">6. Contacto</h2>
              <p className="mb-4">
                Si tienes preguntas sobre esta política de privacidad, puedes contactarnos en:
              </p>
              <p className="mb-4">
                Email: <a href="mailto:info@luxogt.com" className="text-[#c9a961] hover:underline">info@luxogt.com</a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

