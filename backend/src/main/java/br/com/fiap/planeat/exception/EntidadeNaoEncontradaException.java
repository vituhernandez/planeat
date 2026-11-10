package br.com.fiap.planeat.exception;

/**
 * Exceção lançada quando um registro solicitado por ID não é localizado no banco de dados.
 */
public class EntidadeNaoEncontradaException extends RuntimeException {
    public EntidadeNaoEncontradaException(String message) {
        super(message);
    }
}
