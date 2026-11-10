import { NavLink } from 'react-router-dom';

const tabs = [
  { id: 'dashboard', path: '/', label: 'Visão geral', number: '01' },
  { id: 'receitas', path: '/receitas', label: 'Receitas', number: '02' },
  { id: 'planejamento', path: '/planejamento', label: 'Planejamento', number: '03' },
];

export default function Navbar({ activeTab }) {
  return (
    <header className="site-header">
      <NavLink className="brand" to="/" aria-label="PlanEat, início">
        <span className="brand-mark" aria-hidden="true">p.</span>
        <span>planeat<span className="brand-period">.</span></span>
      </NavLink>
      <nav className="main-nav" aria-label="Navegação principal">
        {tabs.map((tab) => (
          <NavLink
            key={tab.id}
            to={tab.path}
            className={`nav-link${activeTab === tab.id ? ' is-active' : ''}`}
            aria-current={activeTab === tab.id ? 'page' : undefined}
          >
            <span className="nav-number">{tab.number}</span>
            {tab.label}
          </NavLink>
        ))}
      </nav>
      <div className="header-note"><span className="status-dot" /> Menos desperdício, mais cuidado</div>
    </header>
  );
}
