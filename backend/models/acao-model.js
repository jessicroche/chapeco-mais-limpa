function criarAcao(dados) {
    return {
        titulo: dados.titulo,
        tipo: dados.tipo,
        email_usuario: dados.email_usuario,
        data_acao: dados.data_acao,
        horario: dados.horario,
        local_acao: dados.local_acao,
        descricao: dados.descricao,
        foto_url: dados.foto_url || "",
        tags: dados.tags || "",
    };
}

module.exports = {
    criarAcao,
};