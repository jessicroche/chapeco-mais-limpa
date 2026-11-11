function criarConteudo(dados) {
    return {
        email_usuario: dados.email_usuario,
        nome: dados.nome,
        pagina: dados.pagina,
        titulo: dados.titulo || "",
        texto: dados.texto,
    };
}

module.exports = {
    criarConteudo,
};