const usuarioRepository = require("../repositories/usuario-repository");
const usuarioModel = require("../models/usuario-model");

async function buscarPorEmail(email) {
    return await usuarioRepository.buscarPorEmail(email);
}

async function buscarPorId(id) {
    return await usuarioRepository.buscarPorId(id);
}

async function listar() {
    return await usuarioRepository.listar();
}

async function criar(dados) {
    const usuario = usuarioModel.criarUsuario(dados);

    return await usuarioRepository.criar(dados.id, usuario);
}

async function atualizar(id, dados) {
    const usuario = usuarioModel.criarUsuario(dados);

    return await usuarioRepository.atualizar(id, usuario);
}

async function excluir(id) {
    return await usuarioRepository.excluir(id);
}

module.exports = {
    buscarPorEmail,
    buscarPorId,
    listar,
    criar,
    atualizar,
    excluir,
};