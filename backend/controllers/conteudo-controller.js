const conteudoService = require("../services/conteudo-service");

async function listar(req, res) {
    try {
        const conteudos = await conteudoService.listar();

        return res.status(200).json(conteudos);

    } catch (erro) {
        return res.status(500).json({
            mensagem: "Erro ao listar conteúdos.",
            erro: erro.message,
        });
    }
}

async function buscarPorId(req, res) {
    try {
        const conteudo = await conteudoService.buscarPorId(
            req.params.id
        );

        if (!conteudo) {
            return res.status(404).json({
                mensagem: "Conteúdo não encontrado.",
            });
        }

        return res.status(200).json(conteudo);

    } catch (erro) {
        return res.status(500).json({
            mensagem: "Erro ao buscar conteúdo.",
            erro: erro.message,
        });
    }
}

async function criar(req, res) {
    try {
        const conteudo = await conteudoService.criar(req.body);

        return res.status(201).json(conteudo);

    } catch (erro) {
        return res.status(500).json({
            mensagem: "Erro ao criar conteúdo.",
            erro: erro.message,
        });
    }
}

async function atualizar(req, res) {
    try {
        const conteudo = await conteudoService.atualizar(
            req.params.id,
            req.body
        );

        return res.status(200).json(conteudo);

    } catch (erro) {
        return res.status(500).json({
            mensagem: "Erro ao atualizar conteúdo.",
            erro: erro.message,
        });
    }
}

async function excluir(req, res) {
    try {
        await conteudoService.excluir(req.params.id);

        return res.status(200).json({
            mensagem: "Conteúdo excluído com sucesso.",
        });

    } catch (erro) {
        return res.status(500).json({
            mensagem: "Erro ao excluir conteúdo.",
            erro: erro.message,
        });
    }
}

async function listarPorPagina(req, res) {

    try {

        const conteudos =
            await conteudoService.listarPorPagina(
                req.params.pagina
            );

        return res.status(200).json(conteudos);

    } catch (erro) {

        return res.status(500).json({
            mensagem: "Erro ao listar conteúdos da página.",
            erro: erro.message,
        });

    }

}

module.exports = {
    listar,
    buscarPorId,
    criar,
    listarPorPagina,
    atualizar,
    excluir,
};