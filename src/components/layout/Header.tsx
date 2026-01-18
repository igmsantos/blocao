import { Link, NavLink } from 'react-router-dom'
import { useApp } from '../../context'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/galeria', label: 'Galeria' },
  { to: '/loja', label: 'Loja' },
  { to: '/inscricao', label: 'Inscrição' },
  { to: '/profissionais', label: 'Profissionais' },
  { to: '/patrocinadores', label: 'Patrocinadores' },
  { to: '/noticias', label: 'Notícias' },
  { to: '/sobre', label: 'Sobre' },
]

export function Header() {
  const { cart } = useApp()

  return (
    <header className="topbar">
      <Link className="logo" to="/">
        🐕 Blocão
      </Link>
      <nav>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => (isActive ? 'active nav' : 'nav')}
          >
            {item.label}
          </NavLink>
        ))}
        <NavLink to="/admin" className={({ isActive }) => (isActive ? 'active nav' : 'nav')}>
          Admin
        </NavLink>
      </nav>
      <Link to="/loja" className="pill">
        🛒 Carrinho ({cart.length})
      </Link>
    </header>
  )
}
