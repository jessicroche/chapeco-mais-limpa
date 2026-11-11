const usuarioService = require("../services/usuario-service");

async function buscarPorEmail(req, res) {
    try {
        const usuario = await usuarioService.buscarPorEmail(req.params.email);

        if (!usuario) {
            return res.status(404).json({
                mensagem: "Usuário não encontrado.",
            });
        }

        return res.status(200).json(usuario);

    } catch (erro) {
        return res.status(500).json({
            mensagem: "Erro ao buscar usuário.",
            erro: erro.message,
        });
    }
}

async function listar(req, res) {
    try {
        const usuarios = await usuarioService.listar();

        return res.status(200).json(usuarios);

    } catch (erro) {
        return res.status(500).json({
            mensagem: "Erro ao listar usuários.",
            erro: erro.message,
        });
    }
}

async function criar(req, res) {
    try {
        const usuario = await usuarioService.criar(req.body);

        return res.status(201).json(usuario);

    } catch (erro) {
        return res.status(500).json({
            mensagem: "Erro ao criar usuário.",
            erro: erro.message,
        });
    }
}

async function atualizar(req, res) {
    try {
        const usuario = await usuarioService.atualizar(
            req.params.id,
            req.body
        );

        return res.status(200).json(usuario);

    } catch (erro) {
        return res.status(500).json({
            mensagem: "Erro ao atualizar usuário.",
            erro: erro.message,
        });
    }
}

async function excluir(req, res) {
    try {
        await usuarioService.excluir(req.params.id);

        return res.status(200).json({
            mensagem: "Usuário excluído com sucesso.",
        });

    } catch (erro) {
        return res.status(500).json({
            mensagem: "Erro ao excluir usuário.",
            erro: erro.message,
        });
    }
}

module.exports = {
    buscarPorEmail,
    listar,
    criar,
    atualizar,
    excluir,
};