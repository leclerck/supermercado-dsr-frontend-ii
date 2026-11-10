const faqs = [
  {
    pregunta: '¿Cómo veo el inventario completo?',
    respuesta:
      'Ingresa a la sección Inventario desde el menú inferior. Puedes filtrar los productos por categoría.',
  },
  {
    pregunta: '¿Puedo agregar o eliminar productos?',
    respuesta:
      'Sí. En la sección Productos puedes crear, editar y eliminar ítems. Los cambios se guardan en memoria mientras la app esté abierta.',
  },
  {
    pregunta: '¿Los datos se guardan en un servidor?',
    respuesta:
      'No. Esta versión funciona sin backend: el inventario vive en el estado global de React y se reinicia al recargar la página.',
  },
  {
    pregunta: '¿Cómo contacto a una sucursal?',
    respuesta:
      'En Nosotres encontrás direcciones, horarios y teléfonos de cada sucursal, además del contacto general.',
  },
  {
    pregunta: '¿Qué significa el filtro por categoría?',
    respuesta:
      'El filtro muestra solo los productos de la categoría elegida. Las opciones se actualizan automáticamente según los productos del inventario.',
  },
]

export default function Faq() {
  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Preguntas frecuentes</h1>
        <p className="mt-1 text-slate-600">
          Respuestas rápidas sobre el uso de la aplicación.
        </p>
      </header>

      <div className="space-y-3">
        {faqs.map((item) => (
          <details
            key={item.pregunta}
            className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm open:border-emerald-200"
          >
            <summary className="cursor-pointer list-none font-medium text-slate-900 marker:content-none">
              <span className="flex items-center justify-between gap-3">
                {item.pregunta}
                <span className="text-slate-400 transition group-open:rotate-45">+</span>
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.respuesta}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
