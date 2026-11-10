import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  alternarItemComprado, buscarListaCompras, buscarPlanejamentos, buscarReceitas,
  cadastrarPlanejamento, getUsuarioId,
} from '../services/api';

const weekdays = [
  { value: 'Segunda-feira', short: 'SEG' },
  { value: 'Terça-feira', short: 'TER' },
  { value: 'Quarta-feira', short: 'QUA' },
  { value: 'Quinta-feira', short: 'QUI' },
  { value: 'Sexta-feira', short: 'SEX' },
  { value: 'Sábado', short: 'SÁB' },
  { value: 'Domingo', short: 'DOM' },
];
const mealTypes = ['Almoço', 'Jantar'];
const planId = (plan) => plan.id ?? plan.planejamentoId;

function mondayOfCurrentWeek() {
  const date = new Date();
  const day = date.getDay();
  date.setDate(date.getDate() - (day === 0 ? 6 : day - 1));
  return localDateString(date);
}

function endOfWeek(start) {
  const date = new Date(`${start}T12:00:00`);
  date.setDate(date.getDate() + 6);
  return localDateString(date);
}

function localDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function isPurchased(item) {
  return item.comprado === true || item.comprado === 'S' || item.comprado === 'true';
}

export default function Planejamento() {
  const [recipes, setRecipes] = useState([]);
  const [plans, setPlans] = useState([]);
  const [startDate, setStartDate] = useState(mondayOfCurrentWeek());
  const [title, setTitle] = useState('Meu cardápio da semana');
  const [selections, setSelections] = useState({});
  const [selectedId, setSelectedId] = useState('');
  const [shoppingList, setShoppingList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [recipeData, planData] = await Promise.all([buscarReceitas(), buscarPlanejamentos()]);
      setRecipes(recipeData);
      setPlans(planData);
      if (planData.length) setSelectedId((current) => current || String(planId(planData[0])));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const selectedPlan = useMemo(
    () => plans.find((plan) => String(planId(plan)) === String(selectedId)),
    [plans, selectedId],
  );
  const listItems = shoppingList?.itens || shoppingList?.items || [];
  const groupedItems = useMemo(() => listItems.reduce((groups, item) => {
    const category = item.categoria?.nome || item.categoria || item.ingrediente?.categoria?.nome || 'Outros ingredientes';
    groups[category] = [...(groups[category] || []), item];
    return groups;
  }, {}), [listItems]);

  function setRecipe(day, meal, value) {
    const key = `${day}|${meal}`;
    setSelections((current) => ({ ...current, [key]: value }));
  }

  async function createPlan(event) {
    event.preventDefault();
    setError('');
    setSuccess('');
    if (!title.trim()) {
      setError('Dê um nome ao planejamento antes de salvar.');
      return;
    }
    const refeicoes = Object.entries(selections)
      .filter(([, recipe]) => recipe)
      .map(([key, recipe]) => {
        const [diaSemana, tipoRefeicao] = key.split('|');
        return { receitaId: Number(recipe), diaSemana, tipoRefeicao };
      });
    if (!refeicoes.length) {
      setError('Escolha ao menos uma receita no quadro semanal.');
      return;
    }

    let usuarioId;
    try {
      usuarioId = getUsuarioId();
    } catch (err) {
      setError(err.message);
      return;
    }

    setSaving(true);
    try {
      const result = await cadastrarPlanejamento({
        ...(usuarioId !== undefined ? { usuarioId } : {}),
        titulo: title.trim(),
        dataInicio: startDate,
        dataFim: endOfWeek(startDate),
        refeicoes,
      });
      await loadData();
      const createdId = result?.id ?? result?.planejamentoId;
      if (createdId != null) setSelectedId(String(createdId));
      setSuccess('Planejamento salvo. Agora você já pode gerar sua lista de compras.');
      setShoppingList(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function generateList() {
    if (!selectedId) return;
    setError('');
    setSuccess('');
    setListLoading(true);
    try {
      setShoppingList(await buscarListaCompras(selectedId));
    } catch (err) {
      setError(err.message);
    } finally {
      setListLoading(false);
    }
  }

  async function togglePurchased(item) {
    const id = item.id ?? item.itemListaId ?? item.itemListaComprasId;
    if (id == null) {
      setError('A API precisa retornar o identificador do item para atualizar o status de compra.');
      return;
    }
    setError('');
    try {
      await alternarItemComprado(id);
      setShoppingList(await buscarListaCompras(selectedId));
    } catch (err) {
      setError(err.message);
    }
  }

  async function shareList() {
    const text = [
      `Minha lista PlanEat — ${selectedPlan?.titulo || 'compras da semana'}`,
      ...Object.entries(groupedItems).flatMap(([category, items]) => [
        `\n${category}`,
        ...items.map((item) => `• ${item.nome} — ${item.quantidadeTotal ?? item.quantidade ?? ''} ${item.unidadeMedida || ''}`.trim()),
      ]),
    ].join('\n');
    try {
      await navigator.clipboard.writeText(text);
      setSuccess('Lista copiada. Agora é só colar na conversa.');
    } catch {
      setError('Não foi possível copiar a lista. Verifique a permissão de área de transferência do navegador.');
    }
  }

  return (
    <div className="page-stack">
      <section className="page-heading">
        <div><div className="eyebrow eyebrow-dark"><span className="eyebrow-line" /> A SEMANA NO SEU RITMO</div><h1>Planeje. Compre. <em>Aproveite.</em></h1></div>
        <p>Monte um cardápio possível. Sua lista inteligente reúne tudo o que você precisa, sem repetir ingredientes.</p>
      </section>

      {error && <div className="notice notice-error" role="alert">{error}</div>}
      {success && <div className="notice notice-success" role="status">{success}</div>}

      <section className="planner-panel">
        <div className="planner-heading">
          <div><div className="eyebrow eyebrow-dark"><span className="eyebrow-line" /> 01 / PLANEJAMENTO</div><h2>Um cardápio com <em>intenção.</em></h2></div>
          <span className="week-tag">SEG — DOM <span>✳</span></span>
        </div>
        {loading ? <div className="empty-state"><p>Carregando receitas e planejamentos...</p></div> : recipes.length === 0 ? (
          <div className="notice notice-info">Cadastre pelo menos uma receita para começar a montar sua semana. <span className="notice-spark">↗</span></div>
        ) : (
          <form onSubmit={createPlan} noValidate>
            <div className="plan-fields">
              <div><label className="field-label" htmlFor="plan-title">Nome do planejamento</label><input id="plan-title" className="field" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={100} required /></div>
              <div><label className="field-label" htmlFor="plan-start">Início da semana</label><input id="plan-start" className="field" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required /></div>
            </div>
            <div className="week-grid">
              {weekdays.map((day) => (
                <article className="day-column" key={day.value}>
                  <div className="day-heading"><span>{day.short}</span><small>{day.value}</small></div>
                  {mealTypes.map((meal) => (
                    <label className="meal-field" key={meal}>
                      <span>{meal}</span>
                      <select className="field meal-select" value={selections[`${day.value}|${meal}`] || ''} onChange={(e) => setRecipe(day.value, meal, e.target.value)} aria-label={`${meal} de ${day.value}`}>
                        <option value="">Escolher receita</option>
                        {recipes.map((recipe, index) => <option key={planId(recipe) ?? index} value={planId(recipe)}>{recipe.nome}</option>)}
                      </select>
                    </label>
                  ))}
                </article>
              ))}
            </div>
            <div className="planner-actions">
              <span>Não precisa preencher tudo. Comece por onde for mais fácil.</span>
              <button type="submit" className="button button-green" disabled={saving}>{saving ? 'Salvando...' : 'Salvar planejamento'} <span>↗</span></button>
            </div>
          </form>
        )}
      </section>

      <section className="shopping-panel">
        <div className="shopping-heading">
          <div><div className="eyebrow"><span className="eyebrow-line" /> 02 / NO MERCADO</div><h2>Sua lista, <em>sem excessos.</em></h2></div>
          <span className="shopping-asterisk" aria-hidden="true">✳</span>
        </div>
        <div className="shopping-controls">
          <label className="field-label" htmlFor="existing-plan">Planejamento salvo</label>
          <select id="existing-plan" className="field" value={selectedId} onChange={(e) => { setSelectedId(e.target.value); setShoppingList(null); }}>
            <option value="">Selecione um planejamento</option>
            {plans.map((plan, index) => <option key={planId(plan) ?? index} value={planId(plan)}>{plan.titulo || `Planejamento ${index + 1}`}</option>)}
          </select>
          <button type="button" className="button button-light-green" onClick={generateList} disabled={!selectedId || listLoading}>{listLoading ? 'Gerando...' : '↗ Gerar lista inteligente'}</button>
        </div>
        {shoppingList && (
          <div className="shopping-results">
            <div className="list-toolbar"><span>{shoppingList.totalItens ?? listItems.length} itens para levar</span><button type="button" className="share-button" onClick={shareList}>Copiar para compartilhar <span>↗</span></button></div>
            {listItems.length === 0 ? <p className="empty-list">Este planejamento ainda não tem itens na lista.</p> : (
              <div className="shopping-groups">
                {Object.entries(groupedItems).map(([category, items]) => (
                  <section className="shopping-group" key={category}>
                    <h3>{category}</h3>
                    {items.map((item, index) => {
                      const bought = isPurchased(item);
                      return <button type="button" className={`shopping-item${bought ? ' is-bought' : ''}`} key={item.id ?? item.itemListaId ?? `${item.nome}-${index}`} onClick={() => togglePurchased(item)} aria-pressed={bought}>
                        <span className="shopping-check">{bought ? '✓' : ''}</span>
                        <span className="shopping-name">{item.nome || item.ingrediente?.nome || 'Ingrediente'}</span>
                        <span className="shopping-quantity">{item.quantidadeTotal ?? item.quantidade} {item.unidadeMedida}</span>
                      </button>;
                    })}
                  </section>
                ))}
              </div>
            )}
            <p className="list-footnote">Toque em um item para marcar como comprado.</p>
          </div>
        )}
        {!shoppingList && <div className="shopping-empty"><span className="empty-symbol">⌁</span><p>Escolha um planejamento salvo para gerar sua lista de compras consolidada.</p></div>}
      </section>
    </div>
  );
}
