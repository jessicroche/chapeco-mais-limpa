const acaoService = require("../services/acao-service");

async function listar(req, res) {
    try {
        const acoes = await acaoService.listar();

        return res.status(200).json(acoes);

    } catch (erro) {
        return res.status(500).json({
            mensagem: "Erro ao listar ações.",
            erro: erro.message,
        });
    }
}

async function buscarPorId(req, res) {
    try {
        const acao = await acaoService.buscarPorId(
            req.params.id
        );

        if (!acao) {
            return res.status(404).json({
                mensagem: "Ação não encontrada.",
            });
        }

        return res.status(200).json(acao);

    } catch (erro) {
        return res.status(500).json({
            mensagem: "Erro ao buscar ação.",
            erro: erro.message,
        });
    }
}

async function criar(req, res) {
    try {
        const acao = await acaoService.criar(req.body);

        return res.status(201).json(acao);

    } catch (erro) {
        return res.status(500).json({
            mensagem: "Erro ao criar ação.",
            erro: erro.message,
        });
    }
}

async function atualizar(req, res) {
    try {
        const acao = await acaoService.atualizar(
            req.params.id,
            req.body
        );

        return res.status(200).json(acao);

    } catch (erro) {
        return res.status(500).json({
            mensagem: "Erro ao atualizar ação.",
            erro: erro.message,
        });
    }
}

async function excluir(req, res) {
    try {
        await acaoService.excluir(req.params.id);

        return res.status(200).json({
            mensagem: "Ação excluída com sucesso.",
        });

    } catch (erro) {
        return res.status(500).json({
            mensagem: "Erro ao excluir ação.",
            erro: erro.message,
        });
    }
}

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    excluir,
};