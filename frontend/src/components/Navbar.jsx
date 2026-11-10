import React from 'react';

export default function Navbar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'receitas', label: 'Receitas' },
    { id: 'planejamento', label: 'Planejamento' },
  ];

  return (
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <div class="font-bold text-lg text-emerald-600 flex items-center gap-2">
          <span>🌿 PlanEat</span>
        </div>

        <nav class="flex items-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              class={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-emerald-50 text-emerald-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
