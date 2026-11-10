package br.com.fiap.planeat.service;

import br.com.fiap.planeat.dao.PlanejamentoDAO;
import br.com.fiap.planeat.model.ItemListaCompras;

import java.util.ArrayList;
import java.util.List;

public class ListaComprasService {

    private final PlanejamentoDAO planejamentoDAO;

    public ListaComprasService() {
        this.planejamentoDAO = new PlanejamentoDAO();
    }

    public ListaComprasService(PlanejamentoDAO planejamentoDAO) {
        this.planejamentoDAO = planejamentoDAO;
    }

    /**
     * TODO: O time deve implementar a lógica de geração e consolidação da lista de compras.
     * Deve somar ingredientes iguais com mesma unidade de medida e retornar a lista agrupada.
     */
    public List<ItemListaCompras> gerarListaCompras(Long planejamentoId) {
        // TODO: Implementar lógica pelo time
        return new ArrayList<>();
    }
}
