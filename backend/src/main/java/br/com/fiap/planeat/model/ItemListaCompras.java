package br.com.fiap.planeat.model;

/**
 * Representa um item consolidado na lista de compras (soma exata dos ingredientes).
 */
public class ItemListaCompras extends EntidadeBase {
    private Long listaId;
    private Ingrediente ingrediente;
    private Double quantidadeTotal;
    private String unidadeMedida;
    private Boolean comprado;

    public ItemListaCompras() {
        super();
        this.comprado = false;
    }

    public ItemListaCompras(Ingrediente ingrediente, Double quantidadeTotal, String unidadeMedida, Boolean comprado) {
        super();
        this.ingrediente = ingrediente;
        this.quantidadeTotal = quantidadeTotal;
        this.unidadeMedida = unidadeMedida;
        this.comprado = comprado != null ? comprado : false;
    }

    public Long getListaId() {
        return listaId;
    }

    public void setListaId(Long listaId) {
        this.listaId = listaId;
    }

    public Ingrediente getIngrediente() {
        return ingrediente;
    }

    public void setIngrediente(Ingrediente ingrediente) {
        this.ingrediente = ingrediente;
    }

    public Double getQuantidadeTotal() {
        return quantidadeTotal;
    }

    public void setQuantidadeTotal(Double quantidadeTotal) {
        this.quantidadeTotal = quantidadeTotal;
    }

    public String getUnidadeMedida() {
        return unidadeMedida;
    }

    public void setUnidadeMedida(String unidadeMedida) {
        this.unidadeMedida = unidadeMedida;
    }

    public Boolean getComprado() {
        return comprado;
    }

    public void setComprado(Boolean comprado) {
        this.comprado = comprado;
    }

    public void alternarStatusComprado() {
        this.comprado = !Boolean.TRUE.equals(this.comprado);
    }
}
