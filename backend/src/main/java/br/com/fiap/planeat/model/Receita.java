package br.com.fiap.planeat.model;

import java.util.ArrayList;
import java.util.List;

/**
 * Entidade de receita culinária com lista de ingredientes e porções.
 */
public class Receita extends EntidadeBase {
    private Long usuarioId;
    private String nome;
    private String modoPreparo;
    private Integer porcoes;
    private Integer tempoPreparoMinutos;
    private String tipoRefeicao;
    private List<ItemReceita> ingredientes;

    public Receita() {
        super();
        this.ingredientes = new ArrayList<>();
    }

    public Receita(Long id, Long usuarioId, String nome, String modoPreparo, Integer porcoes, Integer tempoPreparoMinutos, String tipoRefeicao) {
        super(id);
        this.usuarioId = usuarioId;
        this.nome = nome;
        this.modoPreparo = modoPreparo;
        this.porcoes = porcoes;
        this.tempoPreparoMinutos = tempoPreparoMinutos;
        this.tipoRefeicao = tipoRefeicao;
        this.ingredientes = new ArrayList<>();
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getModoPreparo() {
        return modoPreparo;
    }

    public void setModoPreparo(String modoPreparo) {
        this.modoPreparo = modoPreparo;
    }

    public Integer getPorcoes() {
        return porcoes;
    }

    public void setPorcoes(Integer porcoes) {
        this.porcoes = porcoes;
    }

    public Integer getTempoPreparoMinutos() {
        return tempoPreparoMinutos;
    }

    public void setTempoPreparoMinutos(Integer tempoPreparoMinutos) {
        this.tempoPreparoMinutos = tempoPreparoMinutos;
    }

    public String getTipoRefeicao() {
        return tipoRefeicao;
    }

    public void setTipoRefeicao(String tipoRefeicao) {
        this.tipoRefeicao = tipoRefeicao;
    }

    public List<ItemReceita> getIngredientes() {
        return ingredientes;
    }

    public void setIngredientes(List<ItemReceita> ingredientes) {
        this.ingredientes = ingredientes != null ? ingredientes : new ArrayList<>();
    }

    public void adicionarIngrediente(ItemReceita item) {
        this.ingredientes.add(item);
    }
}
