package br.com.fiap.planeat.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * Entidade de planejamento de refeições para a semana.
 */
public class PlanejamentoSemanal extends EntidadeBase {
    private Long usuarioId;
    private String titulo;
    private LocalDate dataInicio;
    private LocalDate dataFim;
    private String status;
    private List<ItemPlanejamento> refeicoes;

    public PlanejamentoSemanal() {
        super();
        this.status = "ATIVO";
        this.refeicoes = new ArrayList<>();
    }

    public PlanejamentoSemanal(Long id, Long usuarioId, String titulo, LocalDate dataInicio, LocalDate dataFim, String status) {
        super(id);
        this.usuarioId = usuarioId;
        this.titulo = titulo;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
        this.status = status != null ? status : "ATIVO";
        this.refeicoes = new ArrayList<>();
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public LocalDate getDataInicio() {
        return dataInicio;
    }

    public void setDataInicio(LocalDate dataInicio) {
        this.dataInicio = dataInicio;
    }

    public LocalDate getDataFim() {
        return dataFim;
    }

    public void setDataFim(LocalDate dataFim) {
        this.dataFim = dataFim;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<ItemPlanejamento> getRefeicoes() {
        return refeicoes;
    }

    public void setRefeicoes(List<ItemPlanejamento> refeicoes) {
        this.refeicoes = refeicoes != null ? refeicoes : new ArrayList<>();
    }

    public void adicionarRefeicao(ItemPlanejamento item) {
        this.refeicoes.add(item);
    }
}
