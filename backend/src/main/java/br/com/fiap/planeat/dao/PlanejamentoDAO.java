package br.com.fiap.planeat.dao;

import br.com.fiap.planeat.model.ItemListaCompras;
import br.com.fiap.planeat.model.PlanejamentoSemanal;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class PlanejamentoDAO {

    /**
     * TODO: O time deve implementar a listagem de planejamentos semanais via JDBC.
     */
    public List<PlanejamentoSemanal> listarTodos() {
        // TODO: Implementar consulta no banco
        return new ArrayList<>();
    }

    /**
     * TODO: O time deve implementar a busca de planejamento por ID via JDBC.
     */
    public Optional<PlanejamentoSemanal> buscarPorId(Long id) {
        // TODO: Implementar busca por ID
        return Optional.empty();
    }

    /**
     * TODO: O time deve implementar a consulta analítica SQL agregando insumos com JOIN, SUM e GROUP BY.
     */
    public List<ItemListaCompras> buscarListaConsolidadaPorPlanejamento(Long planejamentoId) {
        // TODO: Implementar query SQL analítica com agregação
        return new ArrayList<>();
    }
}
