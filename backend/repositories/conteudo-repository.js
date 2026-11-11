const { db } = require("../config/firebase");

const conteudosRef = db.collection("conteudo");

async function listar() {
    console.log("CHEGOU NO LISTAR CONTEUDO");
    const snapshot = await conteudosRef.get();

    const conteudos = [];

    snapshot.forEach((doc) => {
        conteudos.push({
            id: doc.id,
            ...doc.data(),
        });
    });

    return conteudos;
}

async function buscarPorId(id) {
    const doc = await conteudosRef.doc(id).get();

    if (!doc.exists) {
        return null;
    }

    return {
        id: doc.id,
        ...doc.data(),
    };
}

async function buscarPorNome(nome) {
    const snapshot = await conteudosRef
        .where("nome", "==", nome)
        .limit(1)
        .get();

    if (snapshot.empty) {
        return null;
    }

    const doc = snapshot.docs[0];

    return {
        id: doc.id,
        ...doc.data(),
    };
}

async function listarPorPagina(pagina) {

    const snapshot = await conteudosRef
        .where("pagina", "==", pagina)
        .get();

    const conteudos = [];

    snapshot.forEach((doc) => {

        conteudos.push({
            id: doc.id,
            ...doc.data(),
        });

    });

    return conteudos;
}

async function criar(conteudo) {
    const doc = await conteudosRef.add(conteudo);

    return {
        id: doc.id,
        ...conteudo,
    };
}

async function atualizar(id, conteudo) {
    await conteudosRef.doc(id).update(conteudo);

    return {
        id,
        ...conteudo,
    };
}

async function excluir(id) {
    await conteudosRef.doc(id).delete();
}

module.exports = {
    listar,
    buscarPorId,
    buscarPorNome,
    criar,
    listarPorPagina,
    atualizar,
    excluir,
};