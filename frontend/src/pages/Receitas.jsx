import { useCallback, useEffect, useState } from 'react';
import {
  atualizarReceita, buscarIngredientes, buscarReceitas, cadastrarReceita, excluirReceita, getUsuarioId,
} from '../services/api';

const emptyForm = () => ({
  nome: '', modoPreparo: '', porcoes: '2', tempoPreparoMinutos: '30',
  tipoRefeicao: 'Almoço', ingredientes: [{ ingredienteId: '', quantidade: '', unidadeMedida: 'g' }],
});

const recipeId = (recipe) => recipe.id ?? recipe.receitaId;

export default function Receitas() {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [form, setForm] = useState(emptyForm());
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formError, setFormError] = useState('');

  const loadData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [recipeData, ingredientData] = await Promise.all([buscarReceitas(), buscarIngredientes()]);
      setRecipes(recipeData);
      setIngredients(ingredientData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  function updateForm(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function updateIngredient(index, field, value) {
    setForm((current) => ({
      ...current,
      ingredientes: current.ingredientes.map((item, i) => i === index ? { ...item, [field]: value } : item),
    }));
  }

  function addIngredient() {
    setForm((current) => ({
      ...current,
      ingredientes: [...current.ingredientes, { ingredienteId: '', quantidade: '', unidadeMedida: 'g' }],
    }));
  }

  function removeIngredient(index) {
    setForm((current) => ({
      ...current,
      ingredientes: current.ingredientes.filter((_, i) => i !== index),
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError('');
    setError('');
    setSuccess('');
    if (!form.nome.trim() || !form.modoPreparo.trim()) {
      setFormError('Informe o nome e o modo de preparo da receita.');
      return;
    }
    if (Number(form.porcoes) < 1 || Number(form.tempoPreparoMinutos) < 1) {
      setFormError('Porções e tempo de preparo devem ser maiores que zero.');
      return;
    }
    if (!form.ingredientes.length || form.ingredientes.some((item) =>
      !item.ingredienteId || Number(item.quantidade) <= 0 || !item.unidadeMedida.trim())) {
      setFormError('Adicione ao menos um ingrediente e preencha item, quantidade e unidade em cada linha.');
      return;
    }

    let usuarioId;
    try {
      usuarioId = getUsuarioId();
    } catch (err) {
      setFormError(err.message);
      return;
    }

    const payload = {
      ...(usuarioId !== undefined ? { usuarioId } : {}),
      nome: form.nome.trim(),
      modoPreparo: form.modoPreparo.trim(),
      porcoes: Number(form.porcoes),
      tempoPreparoMinutos: Number(form.tempoPreparoMinutos),
      tipoRefeicao: form.tipoRefeicao,
      ingredientes: form.ingredientes.map((item) => ({
        ingredienteId: Number(item.ingredienteId),
        quantidade: Number(item.quantidade),
        unidadeMedida: item.unidadeMedida.trim(),
      })),
    };

    setSaving(true);
    try {
      if (editingId !== null) await atualizarReceita(editingId, payload);
      else await cadastrarReceita(payload);
      setForm(emptyForm());
      setEditingId(null);
      setSuccess(editingId !== null ? 'Receita atualizada com sucesso.' : 'Receita cadastrada com sucesso.');
      await loadData();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  function startEditing(recipe) {
    const list = recipe.ingredientes || [];
    setEditingId(recipeId(recipe));
    setForm({
      nome: recipe.nome || '',
      modoPreparo: recipe.modoPreparo || '',
      porcoes: String(recipe.porcoes || 1),
      tempoPreparoMinutos: String(recipe.tempoPreparoMinutos || 1),
      tipoRefeicao: recipe.tipoRefeicao || 'Almoço',
      ingredientes: list.length ? list.map((item) => ({
        ingredienteId: String(item.ingredienteId ?? item.ingrediente?.id ?? ''),
        quantidade: String(item.quantidade ?? ''),
        unidadeMedida: item.unidadeMedida || 'g',
      })) : [{ ingredienteId: '', quantidade: '', unidadeMedida: 'g' }],
    });
    setFormError('');
    setSuccess('');
    document.getElementById('form-receita')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async function handleDelete(recipe) {
    const id = recipeId(recipe);
    if (id == null || !window.confirm(`Excluir a receita “${recipe.nome}”?`)) return;
    setError('');
    setSuccess('');
    try {
      await excluirReceita(id);
      setSuccess('Receita excluída com sucesso.');
      await loadData();
    } catch (err) {
      setError(err.message);
    }
  }

  function cancelEdit() {
    setForm(emptyForm());
    setEditingId(null);
    setFormError('');
  }

  return (
    <div className="page-stack">
      <section className="page-heading">
        <div><div className="eyebrow eyebrow-dark"><span className="eyebrow-line" /> SEU CADERNO DE COZINHA</div><h1>Receitas que <em>inspiram.</em></h1></div>
        <p>Guarde seus pratos favoritos e tenha os ingredientes à mão na hora de planejar.</p>
      </section>

      {error && <div className="notice notice-error" role="alert">{error}</div>}
      {success && <div className="notice notice-success" role="status">{success}</div>}

      <div className="recipes-layout">
        <section className="form-panel" id="form-receita">
          <div className="section-topline"><span>{editingId !== null ? 'ATUALIZE SEU PRATO' : 'ADICIONE AO SEU CADERNO'}</span><span className="form-spark">✳</span></div>
          <h2>{editingId !== null ? 'Editar receita' : 'Nova receita'}</h2>
          <p className="panel-intro">Um prato de cada vez, uma semana mais simples.</p>
          <form onSubmit={handleSubmit} noValidate>
            <label className="field-label" htmlFor="recipe-name">Nome da receita</label>
            <input id="recipe-name" className="field" value={form.nome} onChange={(e) => updateForm('nome', e.target.value)} placeholder="Ex.: Arroz de forno da casa" required maxLength={100} />
            <div className="form-row">
              <div><label className="field-label" htmlFor="recipe-type">Tipo de refeição</label>
                <select id="recipe-type" className="field" value={form.tipoRefeicao} onChange={(e) => updateForm('tipoRefeicao', e.target.value)}>
                  {['Café da manhã', 'Almoço', 'Jantar', 'Lanche'].map((type) => <option key={type}>{type}</option>)}
                </select>
              </div>
              <div><label className="field-label" htmlFor="recipe-servings">Porções</label>
                <input id="recipe-servings" className="field" type="number" min="1" step="1" value={form.porcoes} onChange={(e) => updateForm('porcoes', e.target.value)} required />
              </div>
            </div>
            <label className="field-label" htmlFor="recipe-time">Tempo de preparo <span className="field-hint">(minutos)</span></label>
            <input id="recipe-time" className="field" type="number" min="1" step="1" value={form.tempoPreparoMinutos} onChange={(e) => updateForm('tempoPreparoMinutos', e.target.value)} required />

            <div className="field-label ingredients-label">Ingredientes <span className="field-hint">({form.ingredientes.length})</span></div>
            <div className="ingredient-lines">
              {form.ingredientes.map((item, index) => (
                <div className="ingredient-line" key={index}>
                  <select className="field" aria-label={`Ingrediente ${index + 1}`} value={item.ingredienteId} onChange={(e) => updateIngredient(index, 'ingredienteId', e.target.value)} required>
                    <option value="">Escolha um ingrediente</option>
                    {ingredients.map((ingredient) => <option key={ingredient.id} value={ingredient.id}>{ingredient.nome}</option>)}
                  </select>
                  <input className="field quantity-field" aria-label={`Quantidade do ingrediente ${index + 1}`} type="number" min="0.01" step="any" placeholder="Qtd." value={item.quantidade} onChange={(e) => updateIngredient(index, 'quantidade', e.target.value)} required />
                  <input className="field unit-field" aria-label={`Unidade do ingrediente ${index + 1}`} placeholder="g / un." value={item.unidadeMedida} onChange={(e) => updateIngredient(index, 'unidadeMedida', e.target.value)} maxLength={15} required />
                  <button className="remove-line" type="button" onClick={() => removeIngredient(index)} disabled={form.ingredientes.length === 1} aria-label={`Remover ingrediente ${index + 1}`}>×</button>
                </div>
              ))}
            </div>
            <button type="button" className="add-line" onClick={addIngredient}>＋ Adicionar ingrediente</button>
            {!ingredients.length && !loading && <p className="field-hint">O catálogo está vazio ou indisponível. Cadastre ingredientes no back-end para usá-los aqui.</p>}

            <label className="field-label" htmlFor="recipe-method">Modo de preparo</label>
            <textarea id="recipe-method" className="field textarea" rows="4" value={form.modoPreparo} onChange={(e) => updateForm('modoPreparo', e.target.value)} placeholder="Conte o passo a passo do seu jeito..." maxLength={2000} required />
            {formError && <p className="inline-error" role="alert">{formError}</p>}
            <div className="form-actions">
              <button type="submit" className="button button-green" disabled={saving}>{saving ? 'Salvando...' : editingId !== null ? 'Salvar alterações' : 'Salvar receita'} <span>↗</span></button>
              {editingId !== null && <button type="button" className="button button-quiet" onClick={cancelEdit}>Cancelar</button>}
            </div>
          </form>
        </section>

        <section className="recipe-list-section">
          <div className="list-heading"><div><div className="eyebrow eyebrow-dark"><span className="eyebrow-line" /> FEITO POR VOCÊ</div><h2>Seu repertório<span className="period">.</span></h2></div><span className="count-pill">{recipes.length} {recipes.length === 1 ? 'receita' : 'receitas'}</span></div>
          {loading ? <div className="empty-state"><span className="empty-symbol">◌</span><p>Buscando suas receitas...</p></div> : recipes.length === 0 ? (
            <div className="empty-state"><span className="empty-symbol">⌁</span><h3>Seu caderno começa aqui.</h3><p>Cadastre uma receita ao lado e deixe o planejamento cuidar do resto.</p></div>
          ) : (
            <div className="recipe-cards">
              {recipes.map((recipe, index) => (
                <article className="recipe-card" key={recipeId(recipe) ?? `${recipe.nome}-${index}`}>
                  <div className={`recipe-card-art art-tone-${index % 3}`} aria-hidden="true"><span>{['✳', '❋', '⌘'][index % 3]}</span><small>{String(index + 1).padStart(2, '0')} / RECEITA</small></div>
                  <div className="recipe-card-body">
                    <div className="recipe-meta"><span>{recipe.tipoRefeicao || 'Receita'}</span><span>◷ {recipe.tempoPreparoMinutos || '—'} min</span></div>
                    <h3>{recipe.nome}</h3>
                    <p className="recipe-summary">{(recipe.ingredientes || []).map((item) => item.ingrediente?.nome || item.nome || 'Ingrediente').slice(0, 3).join(' · ') || 'Ingredientes cadastrados'}</p>
                    <div className="recipe-card-bottom"><span>Rende {recipe.porcoes || '—'} porções</span><div className="card-actions">
                      <button type="button" className="icon-action" onClick={() => startEditing(recipe)} aria-label={`Editar ${recipe.nome}`} title="Editar">↗</button>
                      <button type="button" className="icon-action icon-delete" onClick={() => handleDelete(recipe)} aria-label={`Excluir ${recipe.nome}`} title="Excluir">×</button>
                    </div></div>
                    {recipe.modoPreparo && <details className="method-details"><summary>Ver modo de preparo</summary><p>{recipe.modoPreparo}</p></details>}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
