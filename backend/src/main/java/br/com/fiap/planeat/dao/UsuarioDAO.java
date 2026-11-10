package br.com.fiap.planeat.dao;

import br.com.fiap.planeat.model.Usuario;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class UsuarioDAO {

    /**
     * TODO: O time deve implementar o INSERT de usuário via JDBC.
     */
    public Long inserir(Usuario usuario) {
        // TODO: Implementar INSERT
        return null;
    }

    /**
     * TODO: O time deve implementar a busca de usuário por ID via JDBC.
     */
    public Optional<Usuario> buscarPorId(Long id) {
        // TODO: Implementar busca
        return Optional.empty();
    }

    /**
     * TODO: O time deve implementar a listagem de usuários via JDBC.
     */
    public List<Usuario> listarTodos() {
        // TODO: Implementar listagem
        return new ArrayList<>();
    }
}
