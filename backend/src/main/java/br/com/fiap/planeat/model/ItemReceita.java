package br.com.fiap.planeat.model;

/**
 * Representa a dose de um ingrediente associado a uma receita (Tabela associativa N:N).
 */
public class ItemReceita {
    private Ingrediente ingrediente;
    private Double quantidade;
    private String unidadeMedida;

    public ItemReceita() {
    }

    public ItemReceita(Ingrediente ingrediente, Double quantidade, String unidadeMedida) {
        this.ingrediente = ingrediente;
        this.quantidade = quantidade;
        this.unidadeMedida = unidadeMedida;
    }

    public Ingrediente getIngrediente() {
        return ingrediente;
    }

    public void setIngrediente(Ingrediente ingrediente) {
        this.ingrediente = ingrediente;
    }

    public Double getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Double quantidade) {
        this.quantidade = quantidade;
    }

    public String getUnidadeMedida() {
        return unidadeMedida;
    }

    public void setUnidadeMedida(String unidadeMedida) {
        this.unidadeMedida = unidadeMedida;
    }

    public String formatarExibicao() {
        return String.format("%.2f %s de %s", quantidade, unidadeMedida, ingrediente != null ? ingrediente.getNome() : "");
    }
}
