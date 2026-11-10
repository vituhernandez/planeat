import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Receitas from './pages/Receitas';
import Planejamento from './pages/Planejamento';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div class="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main class="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'receitas' && <Receitas />}
        {activeTab === 'planejamento' && <Planejamento />}
      </main>

      <Footer />
    </div>
  );
}
