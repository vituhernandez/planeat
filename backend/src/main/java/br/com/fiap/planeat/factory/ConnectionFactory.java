package br.com.fiap.planeat.factory;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * Fábrica de conexões com o banco de dados relacional via JDBC nativo.
 */
public class ConnectionFactory {

    // TODO: O time deve configurar as credenciais do banco da FIAP (Oracle) ou local
    private static final String URL = "jdbc:oracle:thin:@oracle.fiap.com.br:1521:ORCL";
    private static final String USER = "rmXXXXXX";
    private static final String PASS = "XXXXXX";

    public static Connection getConnection() throws SQLException {
        // TODO: O time deve registrar o driver e obter a conexão
        try {
            Class.forName("oracle.jdbc.OracleDriver");
            return DriverManager.getConnection(URL, USER, PASS);
        } catch (ClassNotFoundException e) {
            throw new SQLException("Driver JDBC não localizado.", e);
        }
    }
}
