package br.com.fiap.planeat.model;

/**
 * Categoria de classificação dos ingredientes (setores do mercado).
 */
public class CategoriaAlimento extends EntidadeBase {
    private String nome;

    public CategoriaAlimento() {
        super();
    }

    public CategoriaAlimento(Long id, String nome) {
        super(id);
        this.nome = nome;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
}
