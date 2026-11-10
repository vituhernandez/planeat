package br.com.fiap.planeat.model;

import java.time.LocalDate;

/**
 * Classe base abstrata para herança de atributos comuns a todas as entidades do sistema.
 */
public abstract class EntidadeBase {
    protected Long id;
    protected LocalDate dataCriacao;

    public EntidadeBase() {
        this.dataCriacao = LocalDate.now();
    }

    public EntidadeBase(Long id) {
        this();
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDate dataCriacao) {
        this.dataCriacao = dataCriacao;
    }
}
