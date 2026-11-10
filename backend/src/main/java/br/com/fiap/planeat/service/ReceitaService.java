package br.com.fiap.planeat.service;

import br.com.fiap.planeat.dao.ReceitaDAO;
import br.com.fiap.planeat.model.Receita;

import java.util.ArrayList;
import java.util.List;

public class ReceitaService {

    private final ReceitaDAO receitaDAO;

    public ReceitaService() {
        this.receitaDAO = new ReceitaDAO();
    }

    public ReceitaService(ReceitaDAO receitaDAO) {
        this.receitaDAO = receitaDAO;
    }

    /**
     * TODO: O time deve implementar as regras de negócio de cadastro de receitas (validações de porções, tempo, etc.).
     */
    public Long cadastrarReceita(Receita receita) {
        // TODO: Implementar validações de negócio e persistência pelo time
        return receitaDAO.inserir(receita);
    }

    public List<Receita> listarReceitas() {
        // TODO: Implementar listagem pelo time
        return receitaDAO.listarTodos();
    }

    public Receita buscarPorId(Long id) {
        // TODO: Implementar busca por id e tratamento de exceção pelo time
        return receitaDAO.buscarPorId(id).orElse(null);
    }

    public void excluirReceita(Long id) {
        // TODO: Implementar exclusão pelo time
        receitaDAO.excluir(id);
    }
}
