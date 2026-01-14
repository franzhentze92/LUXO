import React from 'react';

export default function Terms() {
  return (
    <div className="min-h-screen pt-16 lg:pt-20 bg-[#f5f1ed]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="bg-white rounded-lg shadow-sm p-8 lg:p-12">
          <h1 className="font-serif text-4xl lg:text-5xl font-semibold text-[#1a1a1a] mb-6">
            Términos y Condiciones
          </h1>
          
          <div className="prose max-w-none text-[#6b6b6b] space-y-6">
            <p className="text-sm text-[#999] mb-8">
              Última actualización: {new Date().toLocaleDateString('es-GT', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-4">1. Aceptación de los términos</h2>
              <p className="mb-4">
                Al acceder y utilizar el sitio web de LUXO, aceptas estar sujeto a estos términos y condiciones. 
                Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar nuestro sitio web.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-4">2. Productos y precios</h2>
              <p className="mb-4">
                Todos los productos mostrados en nuestro sitio web están sujetos a disponibilidad. Nos 
                reservamos el derecho de modificar precios, descripciones y disponibilidad de productos 
                en cualquier momento sin previo aviso. Los precios están en Quetzales Guatemaltecos (Q.) 
                e incluyen impuestos aplicables.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-4">3. Pedidos y pagos</h2>
              <p className="mb-4">
                Al realizar un pedido, estás haciendo una oferta de compra. Nos reservamos el derecho de 
                aceptar o rechazar cualquier pedido. El pago debe realizarse en el momento de la compra 
                mediante los métodos de pago aceptados. Todos los pagos se procesan de forma segura.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-4">4. Envíos y entregas</h2>
              <p className="mb-4">
                Los tiempos de envío son estimados y pueden variar. LUXO no se hace responsable por retrasos 
                causados por terceros (servicios de mensajería, aduanas, etc.). El riesgo de pérdida y el 
                título de los productos se transfieren al comprador una vez que el producto es entregado al 
                transportista.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-4">5. Devoluciones y reembolsos</h2>
              <p className="mb-4">
                Aceptamos devoluciones dentro de 30 días desde la fecha de recepción, siempre que los productos 
                estén en su estado original, sin usar y con todas las etiquetas. Los costos de envío de 
                devolución corren por cuenta del cliente, excepto en casos de productos defectuosos o errores 
                de nuestra parte.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-4">6. Garantía</h2>
              <p className="mb-4">
                Todos nuestros productos tienen garantía de 1 año contra defectos de fabricación. Esta garantía 
                cubre defectos materiales y de fabricación, pero no cubre desgaste normal, daños por uso 
                inadecuado o modificaciones no autorizadas.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-4">7. Propiedad intelectual</h2>
              <p className="mb-4">
                Todo el contenido de este sitio web, incluyendo textos, imágenes, logotipos y diseños, es 
                propiedad de LUXO y está protegido por leyes de propiedad intelectual. No está permitido 
                reproducir, distribuir o utilizar este contenido sin autorización previa.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-4">8. Limitación de responsabilidad</h2>
              <p className="mb-4">
                LUXO no será responsable por daños indirectos, incidentales, especiales o consecuentes que 
                resulten del uso o la imposibilidad de usar nuestros productos o servicios.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-4">9. Modificaciones</h2>
              <p className="mb-4">
                Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. 
                Las modificaciones entrarán en vigor inmediatamente después de su publicación en el sitio web.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-4">10. Contacto</h2>
              <p className="mb-4">
                Si tienes preguntas sobre estos términos y condiciones, puedes contactarnos en:
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

