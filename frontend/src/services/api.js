// src/services/api.js
// Configuração base da API e stubs de requisição para implementação pelo time.

const API_BASE_URL = 'http://localhost:8080/api';

/**
 * TODO: O time deve implementar a comunicação com os endpoints do back-end Java.
 */

export async function buscarReceitas() {
  // TODO: Implementar chamada GET /api/receitas
  console.log('buscarReceitas() - A ser implementado pelo time');
  return [];
}

export async function cadastrarReceita(receita) {
  // TODO: Implementar chamada POST /api/receitas
  console.log('cadastrarReceita() - A ser implementado pelo time', receita);
  return null;
}

export async function buscarListaCompras(planejamentoId) {
  // TODO: Implementar chamada GET /api/planejamentos/{id}/lista-compras
  console.log('buscarListaCompras() - A ser implementado pelo time', planejamentoId);
  return [];
}
