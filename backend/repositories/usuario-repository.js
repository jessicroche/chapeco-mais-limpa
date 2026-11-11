const { db } = require("../config/firebase");

const usuariosRef = db.collection("usuarios");

async function buscarPorEmail(email) {
    const snapshot = await usuariosRef
        .where("email", "==", email)
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

async function buscarPorId(id) {
    const doc = await usuariosRef.doc(id).get();

    if (!doc.exists) {
        return null;
    }

    return {
        id: doc.id,
        ...doc.data(),
    };
}

async function listar() {
    const snapshot = await usuariosRef.get();

    const usuarios = [];

    snapshot.forEach((doc) => {
        usuarios.push({
            id: doc.id,
            ...doc.data(),
        });
    });

    return usuarios;
}

async function criar(id, usuario) {
    await usuariosRef.doc(id).set(usuario);

    return {
        id,
        ...usuario,
    };
}

async function atualizar(id, usuario) {
    await usuariosRef.doc(id).update(usuario);

    return {
        id,
        ...usuario,
    };
}

async function excluir(id) {
    await usuariosRef.doc(id).delete();
}

module.exports = {
    buscarPorEmail,
    buscarPorId,
    listar,
    criar,
    atualizar,
    excluir,
};