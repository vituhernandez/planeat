package br.com.fiap.planeat.config;

import java.io.BufferedReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.logging.Logger;

/**
 * Utilitário leve em Java puro para carregar variáveis de arquivos .env para as System Properties do Java.
 * Permite configurar o banco e a porta via arquivo .env na raiz do projeto ou na pasta backend/.
 */
public final class EnvLoader {

    private static final Logger LOGGER = Logger.getLogger(EnvLoader.class.getName());

    private EnvLoader() {
    }

    /**
     * Procura por arquivos .env nos diretórios comuns e carrega suas variáveis.
     */
    public static void carregar() {
        List<Path> candidatos = List.of(
                Paths.get(".env"),
                Paths.get(".env.local"),
                Paths.get("backend/.env"),
                Paths.get("../.env")
        );

        for (Path caminho : candidatos) {
            if (Files.exists(caminho) && Files.isRegularFile(caminho)) {
                carregarArquivo(caminho);
                return;
            }
        }
    }

    private static void carregarArquivo(Path arquivo) {
        LOGGER.info("Carregando variáveis do arquivo .env: " + arquivo.toAbsolutePath());
        try (BufferedReader reader = Files.newBufferedReader(arquivo, StandardCharsets.UTF_8)) {
            String linha;
            while ((linha = reader.readLine()) != null) {
                linha = linha.trim();
                if (linha.isEmpty() || linha.startsWith("#")) {
                    continue;
                }
                int separador = linha.indexOf('=');
                if (separador > 0) {
                    String chave = linha.substring(0, separador).trim();
                    String valor = linha.substring(separador + 1).trim();

                    // Remove aspas simples ou duplas ao redor do valor, se houver
                    if ((valor.startsWith("\"") && valor.endsWith("\"")) ||
                            (valor.startsWith("'") && valor.endsWith("'"))) {
                        valor = valor.substring(1, valor.length() - 1);
                    }

                    // Prioridade: variável do SO > System Property > arquivo .env
                    if (System.getProperty(chave) == null && System.getenv(chave) == null) {
                        System.setProperty(chave, valor);
                    }
                }
            }
        } catch (IOException e) {
            LOGGER.warning("Falha ao ler arquivo .env (" + arquivo + "): " + e.getMessage());
        }
    }
}
