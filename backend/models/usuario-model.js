function criarUsuario(dados) {
    return {
        email: dados.email,
        nome: dados.nome,
        tipo_usuario: dados.tipo_usuario,
    };
}

module.exports = {
    criarUsuario,
};