package br.com.fiap.planeat.exception;

/**
 * Exceção lançada em caso de falhas de comunicação ou execução de comandos SQL no banco relacional.
 */
public class DatabasePersistenceException extends RuntimeException {
    public DatabasePersistenceException(String message) {
        super(message);
    }

    public DatabasePersistenceException(String message, Throwable cause) {
        super(message, cause);
    }
}
