package br.com.fiap.planeat.model;

/**
 * Entidade de ingrediente do catálogo padronizado.
 */
public class Ingrediente extends EntidadeBase {
    private String nome;
    private CategoriaAlimento categoria;
    private String unidadePadrao;

    public Ingrediente() {
        super();
    }

    public Ingrediente(Long id, String nome, CategoriaAlimento categoria, String unidadePadrao) {
        super(id);
        this.nome = nome;
        this.categoria = categoria;
        this.unidadePadrao = unidadePadrao;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public CategoriaAlimento getCategoria() {
        return categoria;
    }

    public void setCategoria(CategoriaAlimento categoria) {
        this.categoria = categoria;
    }

    public String getUnidadePadrao() {
        return unidadePadrao;
    }

    public void setUnidadePadrao(String unidadePadrao) {
        this.unidadePadrao = unidadePadrao;
    }
}
