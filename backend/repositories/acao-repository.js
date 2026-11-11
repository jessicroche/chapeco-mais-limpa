const { db } = require("../config/firebase");

const acoesRef = db.collection("acoes");

async function listar() {
    const snapshot = await acoesRef.get();

    const acoes = [];

    snapshot.forEach((doc) => {
        acoes.push({
            id: doc.id,
            ...doc.data(),
        });
    });

    return acoes;
}

async function buscarPorId(id) {
    const doc = await acoesRef.doc(id).get();

    if (!doc.exists) {
        return null;
    }

    return {
        id: doc.id,
        ...doc.data(),
    };
}

async function criar(acao) {
    const doc = await acoesRef.add(acao);

    return {
        id: doc.id,
        ...acao,
    };
}

async function atualizar(id, acao) {
    await acoesRef.doc(id).update(acao);

    return {
        id,
        ...acao,
    };
}

async function excluir(id) {
    await acoesRef.doc(id).delete();
}

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    excluir,
};