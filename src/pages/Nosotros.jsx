const sucursales = [
  {
    nombre: 'Sucursal Centro',
    direccion: 'Av. San Martín 1250, Santiago',
    horario: 'Lunes a sábado de 8:00 a 21:00',
    telefono: '2 4567-8901',
  },
  {
    nombre: 'Sucursal Norte',
    direccion: 'Calle Belgrano 430, Quilicura',
    horario: 'Lunes a domingo de 9:00 a 22:00',
    telefono: '2 4567-8902',
  },
  {
    nombre: 'Sucursal Sur',
    direccion: 'Ruta 3 Km 12, Puente Alto',
    horario: 'Lunes a sábado de 8:30 a 20:30',
    telefono: '2 4567-8903',
  },
]

export default function Nosotros() {
  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Nosotres</h1>
        <p className="mt-1 text-slate-600">
          Supermercado acerca productos frescos y de calidad a tu barrio.
        </p>
      </header>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Contacto general</h2>
        <ul className="mt-3 space-y-1 text-sm text-slate-700">
          <li>
            <span className="font-medium">Email:</span> contacto@supermercado.com
          </li>
          <li>
            <span className="font-medium">Teléfono:</span> (011) 4000-1234
          </li>
          <li>
            <span className="font-medium">Atención al cliente:</span> Lun a Vie 9:00 a 18:00
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">Sucursales</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sucursales.map((sucursal) => (
            <article
              key={sucursal.nombre}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h3 className="font-semibold text-emerald-700">{sucursal.nombre}</h3>
              <p className="mt-2 text-sm text-slate-700">{sucursal.direccion}</p>
              <p className="mt-1 text-sm text-slate-600">{sucursal.horario}</p>
              <p className="mt-1 text-sm text-slate-600">{sucursal.telefono}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
