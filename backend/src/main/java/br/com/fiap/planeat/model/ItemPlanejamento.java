package br.com.fiap.planeat.model;

/**
 * Associa uma receita a um dia da semana e refeição no plano alimentar.
 */
public class ItemPlanejamento extends EntidadeBase {
    private Long planejamentoId;
    private Receita receita;
    private String diaSemana;
    private String tipoRefeicao;

    public ItemPlanejamento() {
        super();
    }

    public ItemPlanejamento(Long id, Long planejamentoId, Receita receita, String diaSemana, String tipoRefeicao) {
        super(id);
        this.planejamentoId = planejamentoId;
        this.receita = receita;
        this.diaSemana = diaSemana;
        this.tipoRefeicao = tipoRefeicao;
    }

    public Long getPlanejamentoId() {
        return planejamentoId;
    }

    public void setPlanejamentoId(Long planejamentoId) {
        this.planejamentoId = planejamentoId;
    }

    public Receita getReceita() {
        return receita;
    }

    public void setReceita(Receita receita) {
        this.receita = receita;
    }

    public String getDiaSemana() {
        return diaSemana;
    }

    public void setDiaSemana(String diaSemana) {
        this.diaSemana = diaSemana;
    }

    public String getTipoRefeicao() {
        return tipoRefeicao;
    }

    public void setTipoRefeicao(String tipoRefeicao) {
        this.tipoRefeicao = tipoRefeicao;
    }
}
