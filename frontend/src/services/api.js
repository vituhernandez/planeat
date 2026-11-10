const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '');

export function getUsuarioId() {
  const rawId = import.meta.env.VITE_USUARIO_ID;
  if (!rawId) return undefined;
  const id = Number(rawId);
  if (!Number.isSafeInteger(id) || id < 1) {
    throw new Error('VITE_USUARIO_ID deve ser um identificador numérico positivo.');
  }
  return id;
}

async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        ...options.headers,
      },
    });
  } catch {
    throw new Error('Não foi possível conectar à API. Verifique se o back-end está ativo.');
  }

  const text = await response.text();
  let data = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!response.ok) {
    const message = typeof data === 'string'
      ? data
      : data?.mensagem || data?.message || data?.erro || data?.error;
    throw new Error(message || `A API respondeu com erro (${response.status}).`);
  }
  return data;
}

function listFrom(data, entity) {
  const list = Array.isArray(data) ? data : data?.[entity];
  if (!Array.isArray(list)) {
    throw new Error(`A resposta da API não contém uma lista válida de ${entity}.`);
  }
  return list;
}

export async function buscarReceitas() {
  return listFrom(await request('/receitas'), 'receitas');
}

export async function buscarReceita(id) {
  return request(`/receitas/${id}`);
}

export async function cadastrarReceita(receita) {
  return request('/receitas', { method: 'POST', body: JSON.stringify(receita) });
}

export async function atualizarReceita(id, receita) {
  return request(`/receitas/${id}`, { method: 'PUT', body: JSON.stringify(receita) });
}

export async function excluirReceita(id) {
  return request(`/receitas/${id}`, { method: 'DELETE' });
}

export async function buscarIngredientes() {
  return listFrom(await request('/ingredientes'), 'ingredientes');
}

export async function buscarPlanejamentos() {
  return listFrom(await request('/planejamentos'), 'planejamentos');
}

export async function cadastrarPlanejamento(planejamento) {
  return request('/planejamentos', { method: 'POST', body: JSON.stringify(planejamento) });
}

export async function buscarListaCompras(planejamentoId) {
  return request(`/planejamentos/${planejamentoId}/lista-compras`);
}

export async function alternarItemComprado(id) {
  return request(`/itens-lista/${id}/status`, { method: 'PATCH' });
}
