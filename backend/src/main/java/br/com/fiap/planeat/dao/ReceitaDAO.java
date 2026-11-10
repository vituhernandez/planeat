package br.com.fiap.planeat.dao;

import br.com.fiap.planeat.model.Receita;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class ReceitaDAO {

    /**
     * TODO: O time deve implementar o INSERT via JDBC nativo (PreparedStatement).
     */
    public Long inserir(Receita receita) {
        // TODO: Implementar INSERT na tabela T_PE_RECEITA e itens em T_PE_RECEITA_INGREDIENTE
        return null;
    }

    /**
     * TODO: O time deve implementar o SELECT via JDBC nativo para listar todas as receitas.
     */
    public List<Receita> listarTodos() {
        // TODO: Implementar consulta no banco
        return new ArrayList<>();
    }

    /**
     * TODO: O time deve implementar a busca de receita por ID via JDBC.
     */
    public Optional<Receita> buscarPorId(Long id) {
        // TODO: Implementar busca parametrizada por ID
        return Optional.empty();
    }

    /**
     * TODO: O time deve implementar a exclusão de receita via JDBC.
     */
    public void excluir(Long id) {
        // TODO: Implementar DELETE
    }
}
