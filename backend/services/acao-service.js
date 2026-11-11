const acaoRepository = require("../repositories/acao-repository");
const acaoModel = require("../models/acao-model");

async function listar() {
    return await acaoRepository.listar();
}

async function buscarPorId(id) {
    return await acaoRepository.buscarPorId(id);
}

async function criar(dados) {
    const acao = acaoModel.criarAcao(dados);

    return await acaoRepository.criar(acao);
}

async function atualizar(id, dados) {
    const acao = acaoModel.criarAcao(dados);

    return await acaoRepository.atualizar(id, acao);
}

async function excluir(id) {
    return await acaoRepository.excluir(id);
}

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    excluir,
};