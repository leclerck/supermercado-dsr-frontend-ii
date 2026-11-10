import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/inventario', label: 'Inventario' },
  { to: '/productos', label: 'Productos' },
  { to: '/nosotres', label: 'Nosotres' },
  { to: '/faq', label: 'FAQ' },
]

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white shadow-[0_-4px_12px_rgba(15,23,42,0.06)]">
      <ul className="mx-auto flex max-w-3xl items-stretch justify-around">
        {links.map((link) => (
          <li key={link.to} className="flex-1">
            <NavLink
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                [
                  'flex min-h-14 items-center justify-center px-1 py-2 text-center text-xs font-medium transition-colors sm:text-sm',
                  isActive ? 'bg-emerald-50 text-emerald-700' : 'text-slate-500 hover:text-slate-800',
                ].join(' ')
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
