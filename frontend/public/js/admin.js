import { auth, db } from "./auth.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    doc,
    getDoc,
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


const areaAdmin = document.getElementById("area-admin");
const acessoNegado = document.getElementById("acesso-negado");

areaAdmin.style.display = "none";

onAuthStateChanged(auth, async function (usuario) {

    if (!usuario) {
        acessoNegado.style.display = "block";
        return;
    }

    try {

        const usuarioRef = doc(db, "usuarios", usuario.uid);
        const usuarioSnapshot = await getDoc(usuarioRef);

        if (
            !usuarioSnapshot.exists() ||
            usuarioSnapshot.data().tipo_usuario !== "ADM"
        ) {
            acessoNegado.style.display = "block";
            return;
        }

        areaAdmin.style.display = "block";

    } catch (erro) {

        console.error("Erro ao verificar acesso:", erro);
        acessoNegado.style.display = "block";

    }

});


let conteudosPagina = [];
let paginaSelecionada = "";

document.getElementById("pagina").addEventListener(
    "change",
    function () {
        paginaSelecionada = this.value;
        carregarConteudosPagina();
    }
);


async function carregarConteudosPagina() {

    const div = document.getElementById("conteudos");
    div.innerHTML = "";

    if (!paginaSelecionada) {
        return;
    }

    try {

        const resultado = await getDocs(
            collection(db, "conteudo")
        );

        conteudosPagina = resultado.docs.map(
            documento => ({
                id: documento.id,
                ...documento.data()
            })
        );

        conteudosPagina = conteudosPagina.filter(
            conteudo => conteudo.pagina === paginaSelecionada
        );

        mostrarConteudos();

    } catch (erro) {

        console.error(erro);
        div.innerHTML = "<p>Erro ao carregar os conteúdos.</p>";

    }
}


function mostrarConteudos() {

    const div = document.getElementById("conteudos");
    div.innerHTML = "";

    conteudosPagina.forEach(criarCardConteudo);

    const botao = document.createElement("button");

    botao.textContent = "+ Novo conteúdo";
    botao.className = "btn-principal";
    botao.type = "button";
    botao.onclick = criarNovoConteudo;

    div.appendChild(botao);
}


function criarCardConteudo(conteudo) {

    const div = document.getElementById("conteudos");
    const card = document.createElement("div");

    card.className = "admin-card";

    const titulo = document.createElement("h3");
    titulo.textContent = conteudo.titulo;

    const labelTitulo = document.createElement("label");
    labelTitulo.textContent = "Título";

    const inputTitulo = document.createElement("input");
    inputTitulo.type = "text";
    inputTitulo.value = conteudo.titulo;
    inputTitulo.className = "admin-input";

    const labelTexto = document.createElement("label");
    labelTexto.textContent = "Texto";

    const textarea = document.createElement("textarea");
    textarea.value = conteudo.texto;
    textarea.className = "admin-textarea";
    textarea.rows = 6;

    const salvar = document.createElement("button");
    salvar.textContent = "Salvar alterações";
    salvar.className = "btn-principal";
    salvar.type = "button";

    salvar.onclick = function () {
        atualizarConteudo(
            conteudo.id,
            inputTitulo.value,
            textarea.value
        );
    };

    const excluir = document.createElement("button");
    excluir.textContent = "Excluir";
    excluir.className = "btn-secundario";
    excluir.type = "button";

    excluir.onclick = function () {
        excluirConteudo(conteudo.id);
    };

    card.append(
        titulo,
        labelTitulo,
        inputTitulo,
        labelTexto,
        textarea,
        salvar,
        excluir
    );

    div.appendChild(card);
}


async function atualizarConteudo(id, titulo, texto) {

    try {

        const conteudo = conteudosPagina.find(
            item => item.id === id
        );

        await updateDoc(
            doc(db, "conteudo", id),
            {
                email_usuario: conteudo.email_usuario,
                pagina: conteudo.pagina,
                nome: conteudo.nome,
                titulo: titulo,
                texto: texto
            }
        );

        const indice = conteudosPagina.findIndex(
            item => item.id === id
        );

        if (indice !== -1) {
            conteudosPagina[indice] = {
                ...conteudosPagina[indice],
                titulo: titulo,
                texto: texto
            };
        }

        alert("Conteúdo atualizado com sucesso!");
        mostrarConteudos();

    } catch (erro) {

        console.error(erro);
        alert("Erro ao atualizar o conteúdo.");

    }
}


async function excluirConteudo(id) {

    if (!confirm("Tem certeza que deseja excluir este conteúdo?")) {
        return;
    }

    try {

        await deleteDoc(
            doc(db, "conteudo", id)
        );

        conteudosPagina = conteudosPagina.filter(
            conteudo => conteudo.id !== id
        );

        alert("Conteúdo excluído com sucesso!");
        mostrarConteudos();

    } catch (erro) {

        console.error(erro);
        alert("Erro ao excluir o conteúdo.");

    }
}


function criarNovoConteudo() {

    const div = document.getElementById("conteudos");
    const card = document.createElement("div");

    card.className = "admin-card";

    const titulo = document.createElement("h3");
    titulo.textContent = "Novo conteúdo";

    const labelNome = document.createElement("label");
    labelNome.textContent = "Nome do conteúdo";

    const inputNome = document.createElement("input");
    inputNome.type = "text";
    inputNome.className = "admin-input";
    inputNome.placeholder = "Ex: reciclaveis-observacao";

    const labelTitulo = document.createElement("label");
    labelTitulo.textContent = "Título";

    const inputTitulo = document.createElement("input");
    inputTitulo.type = "text";
    inputTitulo.className = "admin-input";

    const labelTexto = document.createElement("label");
    labelTexto.textContent = "Texto";

    const textarea = document.createElement("textarea");
    textarea.className = "admin-textarea";
    textarea.rows = 6;

    const criar = document.createElement("button");
    criar.textContent = "Criar conteúdo";
    criar.className = "btn-principal";
    criar.type = "button";

    criar.onclick = function () {
        criarConteudo(
            inputNome.value,
            inputTitulo.value,
            textarea.value
        );
    };

    card.append(
        titulo,
        labelNome,
        inputNome,
        labelTitulo,
        inputTitulo,
        labelTexto,
        textarea,
        criar
    );

    div.appendChild(card);
}


async function criarConteudo(nome, titulo, texto) {

    if (!nome || !titulo || !texto) {
        alert("Preencha todos os campos.");
        return;
    }

    try {

        const novoConteudo = {
            email_usuario: auth.currentUser.email,
            pagina: paginaSelecionada,
            nome: nome,
            titulo: titulo,
            texto: texto
        };

        const resultado = await addDoc(
            collection(db, "conteudo"),
            novoConteudo
        );

        conteudosPagina.push({
            id: resultado.id,
            ...novoConteudo
        });

        alert("Conteúdo criado com sucesso!");
        mostrarConteudos();

    } catch (erro) {

        console.error(erro);
        alert("Erro ao criar o conteúdo.");

    }
}