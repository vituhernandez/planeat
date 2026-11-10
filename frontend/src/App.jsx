import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Receitas from './pages/Receitas';
import Planejamento from './pages/Planejamento';

const routeTabs = {
  '/': 'dashboard',
  '/dashboard': 'dashboard',
  '/receitas': 'receitas',
  '/planejamento': 'planejamento',
};

export default function App() {
  const { pathname } = useLocation();

  return (
    <div className="app-shell">
      <Navbar activeTab={routeTabs[pathname] || 'dashboard'} />
      <main id="conteudo" className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/receitas" element={<Receitas />} />
          <Route path="/planejamento" element={<Planejamento />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
