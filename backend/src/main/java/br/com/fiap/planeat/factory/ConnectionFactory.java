package br.com.fiap.planeat.factory;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Locale;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Fábrica centralizada de conexões com o banco de dados relacional via JDBC nativo.
 * Suporta configuração dinâmica via variáveis de ambiente, System Properties ou credenciais padrão FIAP/Oracle.
 */
public class ConnectionFactory {

    private static final Logger LOGGER = Logger.getLogger(ConnectionFactory.class.getName());

    // Configuração padrão Oracle FIAP
    private static final String DEFAULT_URL = "jdbc:oracle:thin:@oracle.fiap.com.br:1521:ORCL";
    private static final String DEFAULT_USER = "rmXXXXXX";
    private static final String DEFAULT_PASS = "XXXXXX";

    private static String customUrl;
    private static String customUser;
    private static String customPass;

    private ConnectionFactory() {
        // Classe utilitária - construtor privado
    }

    /**
     * Obtém uma nova conexão JDBC com o banco de dados relacional.
     * Prioridade de configuração:
     * 1. Configuração customizada programática (via setCredentials)
     * 2. Variáveis de ambiente (DB_URL, DB_USER, DB_PASSWORD/DB_PASS)
     * 3. System Properties (db.url, db.user, db.pass)
     * 4. Padrão Oracle FIAP
     *
     * @return java.sql.Connection ativa
     * @throws SQLException caso ocorra falha de conexão ou driver não encontrado
     */
    public static Connection getConnection() throws SQLException {
        String url = getUrl();
        String user = getUser();
        String pass = getPassword();

        carregarDriverAdequado(url);

        try {
            if (user == null || user.isBlank()) {
                return DriverManager.getConnection(url);
            }
            return DriverManager.getConnection(url, user, pass);
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Falha ao estabelecer conexão JDBC com o banco: " + url, e);
            throw e;
        }
    }

    /**
     * Identifica e carrega a classe de driver JDBC de acordo com a URL informada.
     */
    private static void carregarDriverAdequado(String url) throws SQLException {
        try {
            if (url.startsWith("jdbc:oracle:")) {
                Class.forName("oracle.jdbc.OracleDriver");
            } else if (url.startsWith("jdbc:h2:")) {
                Class.forName("org.h2.Driver");
            } else if (url.startsWith("jdbc:postgresql:")) {
                Class.forName("org.postgresql.Driver");
            }
        } catch (ClassNotFoundException e) {
            throw new SQLException("Driver JDBC correspondente à URL não localizado no classpath: " + url, e);
        }
    }

    /**
     * Permite definir credenciais em tempo de execução (ideal para testes de integração ou ambientes dinâmicos).
     */
    public static synchronized void setCredentials(String url, String user, String pass) {
        customUrl = url;
        customUser = user;
        customPass = pass;
    }

    /**
     * Restaura as credenciais para o padrão de ambiente/FIAP.
     */
    public static synchronized void resetCredentials() {
        customUrl = null;
        customUser = null;
        customPass = null;
    }

    public static String getUrl() {
        if (customUrl != null) return ajustarCaminhoScriptSeNecessario(customUrl);
        String env = System.getenv("DB_URL");
        if (env != null && !env.isBlank()) return ajustarCaminhoScriptSeNecessario(env);
        String prop = System.getProperty("DB_URL");
        if (prop != null && !prop.isBlank()) return ajustarCaminhoScriptSeNecessario(prop);
        return ajustarCaminhoScriptSeNecessario(System.getProperty("db.url", DEFAULT_URL));
    }

    public static String getUser() {
        if (customUser != null) return customUser;
        String env = System.getenv("DB_USER");
        if (env != null && !env.isBlank()) return env;
        String prop = System.getProperty("DB_USER");
        if (prop != null && !prop.isBlank()) return prop;
        return System.getProperty("db.user", DEFAULT_USER);
    }

    public static String getPassword() {
        if (customPass != null) return customPass;
        String env = System.getenv("DB_PASSWORD");
        if (env == null || env.isBlank()) {
            env = System.getenv("DB_PASS");
        }
        if (env != null && !env.isBlank()) return env;
        String prop = System.getProperty("DB_PASSWORD");
        if (prop == null || prop.isBlank()) {
            prop = System.getProperty("DB_PASS");
        }
        if (prop != null && !prop.isBlank()) return prop;
        return System.getProperty("db.pass", DEFAULT_PASS);
    }

    private static String ajustarCaminhoScriptSeNecessario(String url) {
        if (url == null || !url.contains("script.sql")) return url;
        if (java.nio.file.Files.exists(java.nio.file.Paths.get("database/script.sql"))) {
            return url.replace("../database/script.sql", "./database/script.sql");
        } else if (java.nio.file.Files.exists(java.nio.file.Paths.get("../database/script.sql"))) {
            return url.replace("./database/script.sql", "../database/script.sql");
        }
        return url;
    }

    /**
     * Prepara um INSERT com recuperação compatível da chave primária gerada
     * em PostgreSQL (minúsculas), Oracle (maiúsculas) e H2.
     */
    public static PreparedStatement prepareInsert(Connection conn, String sql, String pkColumn) throws SQLException {
        String dbProduct = "";
        try {
            dbProduct = conn.getMetaData().getDatabaseProductName();
        } catch (SQLException ignored) {
        }
        String normalized = dbProduct != null ? dbProduct.toLowerCase(Locale.ROOT) : "";
        if (normalized.contains("postgresql")) {
            return conn.prepareStatement(sql, new String[]{pkColumn.toLowerCase(Locale.ROOT)});
        }
        if (normalized.contains("oracle")) {
            return conn.prepareStatement(sql, new String[]{pkColumn.toUpperCase(Locale.ROOT)});
        }
        try {
            return conn.prepareStatement(sql, new String[]{pkColumn});
        } catch (Exception ex) {
            return conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
        }
    }

    /**
     * Fecha de forma segura uma conexão JDBC sem propagar exceções.
     */
    public static void fecharConexao(Connection conn) {
        if (conn != null) {
            try {
                if (!conn.isClosed()) {
                    conn.close();
                }
            } catch (SQLException e) {
                LOGGER.log(Level.WARNING, "Erro ao fechar conexão JDBC", e);
            }
        }
    }

    /**
     * Fecha múltiplos recursos JDBC com segurança (Connection, PreparedStatement, ResultSet).
     */
    public static void fecharRecursos(AutoCloseable... recursos) {
        for (AutoCloseable recurso : recursos) {
            if (recurso != null) {
                try {
                    recurso.close();
                } catch (Exception e) {
                    LOGGER.log(Level.WARNING, "Erro ao fechar recurso JDBC", e);
                }
            }
        }
    }
}
