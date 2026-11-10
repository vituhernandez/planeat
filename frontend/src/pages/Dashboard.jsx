import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { buscarPlanejamentos, buscarReceitas } from '../services/api';

export default function Dashboard() {
  const navigate = useNavigate();
  const setActiveTab = (tab) => navigate(tab === 'dashboard' ? '/' : `/${tab}`);
  const [stats, setStats] = useState({ receitas: null, planos: null });
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    Promise.all([buscarReceitas(), buscarPlanejamentos()])
      .then(([receitas, planos]) => {
        if (active) setStats({ receitas: receitas.length, planos: planos.length });
      })
      .catch((err) => {
        if (active) setError(err.message);
      });
    return () => { active = false; };
  }, []);

  return (
    <div className="page-stack">
      <section className="hero-panel">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> SUA ROTINA, COM MAIS INTENÇÃO</div>
          <h1>O futuro sustentável<br />começa <em>na sua cozinha.</em></h1>
          <p>Planeje refeições, compre só o necessário e aproveite cada ingrediente. Um hábito simples que faz bem para você e para o planeta.</p>
          <button className="button button-light" onClick={() => setActiveTab('planejamento')}>
            Planejar minha semana <span aria-hidden="true">↗</span>
          </button>
          <div className="hero-caption"><span className="caption-leaf">✳</span> Pequenas escolhas. Um impacto que cresce.</div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="art-sun" />
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />
          <div className="art-leaf leaf-one">⌁</div>
          <div className="art-leaf leaf-two">⌁</div>
          <div className="art-plate"><span>✳</span><i /><b /></div>
          <div className="art-note"><span>feito com cuidado</span><strong>♡</strong></div>
          <div className="art-label">COMER BEM<br />SEM DESPERDIÇAR</div>
        </div>
        <span className="hero-index">PLAN EAT / 2026</span>
      </section>

      <section className="intro-row">
        <div>
          <div className="eyebrow eyebrow-dark"><span className="eyebrow-line" /> UM BOM COMEÇO</div>
          <h2>Da ideia à lista.<br /><em>Sem complicar.</em></h2>
        </div>
        <p>Organize suas receitas, monte um cardápio possível e deixe o PlanEat reunir os ingredientes para você. Menos improviso, menos desperdício.</p>
      </section>

      {error && <div className="notice notice-error" role="status">{error} Os dados aparecerão aqui quando o serviço estiver ativo.</div>}

      <section className="stats-grid" aria-label="Resumo da sua conta">
        <article className="stat-card stat-green">
          <span className="stat-icon">✳</span>
          <span className="stat-label">SEU REPERTÓRIO</span>
          <strong>{stats.receitas === null ? '—' : stats.receitas.toString().padStart(2, '0')}</strong>
          <span className="stat-foot">receitas cadastradas</span>
          <button className="text-link" onClick={() => setActiveTab('receitas')}>Explorar receitas <span>↗</span></button>
        </article>
        <article className="stat-card stat-sand">
          <span className="stat-icon">↗</span>
          <span className="stat-label">SEU PLANEJAMENTO</span>
          <strong>{stats.planos === null ? '—' : stats.planos.toString().padStart(2, '0')}</strong>
          <span className="stat-foot">planos salvos</span>
          <button className="text-link" onClick={() => setActiveTab('planejamento')}>Montar minha semana <span>↗</span></button>
        </article>
        <article className="stat-card stat-cream">
          <span className="stat-icon">◎</span>
          <span className="stat-label">UM PLANETA, MUITAS ESCOLHAS</span>
          <strong className="stat-ods">ODS 2 <i>·</i> ODS 11</strong>
          <span className="stat-foot">Fome zero e cidades sustentáveis</span>
          <span className="stat-small">Cada refeição planejada conta.</span>
        </article>
      </section>

      <section className="steps-section">
        <div className="steps-heading">
          <div><div className="eyebrow eyebrow-dark"><span className="eyebrow-line" /> SIMPLES ASSIM</div><h2>Um ciclo que <em>faz sentido.</em></h2></div>
          <span className="steps-count">01 — 03</span>
        </div>
        <div className="steps-grid">
          <article className="step-card"><span className="step-number">01</span><span className="step-symbol">⌘</span><h3>Planeja</h3><p>Escolha as refeições e receitas que combinam com sua semana.</p><span className="step-arrow">↗</span></article>
          <article className="step-card"><span className="step-number">02</span><span className="step-symbol">⤳</span><h3>Processa</h3><p>Os ingredientes se juntam numa lista prática, sem duplicidade.</p><span className="step-arrow">↗</span></article>
          <article className="step-card"><span className="step-number">03</span><span className="step-symbol">✓</span><h3>Executa</h3><p>Vá às compras com clareza e aproveite melhor cada alimento.</p><span className="step-arrow">↗</span></article>
        </div>
      </section>
    </div>
  );
}
