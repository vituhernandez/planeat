package br.com.fiap.planeat.exception;

/**
 * Exceção lançada quando uma regra de negócio ou validação do sistema é violada.
 */
public class RegraNegocioException extends RuntimeException {
    public RegraNegocioException(String message) {
        super(message);
    }
}
