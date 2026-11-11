const conteudoRepository = require("../repositories/conteudo-repository");
const conteudoModel = require("../models/conteudo-model");

async function listar() {
    return await conteudoRepository.listar();
}

async function buscarPorId(id) {
    return await conteudoRepository.buscarPorId(id);
}

async function buscarPorNome(nome) {
    return await conteudoRepository.buscarPorNome(nome);
}

async function criar(dados) {
    const conteudo = conteudoModel.criarConteudo(dados);

    return await conteudoRepository.criar(conteudo);
}

async function atualizar(id, dados) {
    const conteudo = conteudoModel.criarConteudo(dados);

    return await conteudoRepository.atualizar(id, conteudo);
}

async function excluir(id) {
    return await conteudoRepository.excluir(id);
}

async function listarPorPagina(pagina) {

    return await conteudoRepository.listarPorPagina(pagina);

}

module.exports = {
    listar,
    buscarPorId,
    buscarPorNome,
    listarPorPagina,
    criar,
    atualizar,
    excluir,
};