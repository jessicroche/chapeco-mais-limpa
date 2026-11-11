import { auth, db } from "./auth.js";

import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


async function carregarAcoes() {

    const div = document.getElementById("acoes-admin");
    div.innerHTML = "";

    try {

        const resultado =
            await getDocs(collection(db, "acoes"));

        const acoes = resultado.docs.map(
            documento => ({
                id: documento.id,
                ...documento.data()
            })
        );

        acoes.forEach(mostrarAcao);

    } catch (erro) {

        console.error(erro);
        div.innerHTML = "<p>Erro ao carregar as ações.</p>";

    }
}


function mostrarAcao(acao) {

    const div = document.getElementById("acoes-admin");

    const card = document.createElement("div");
    card.className = "admin-card";

    card.innerHTML = `
        <h3>${acao.titulo}</h3>

        <p> <strong>Tipo:</strong> ${acao.tipo} </p>

        <p> <strong>Data:</strong> ${acao.data_acao} </p>

        <p> <strong>Horário:</strong> ${acao.horario} </p>

        <p> <strong>Local:</strong> ${acao.local_acao} </p>

        <p>${acao.descricao}</p>
    `;

    const editar = document.createElement("button");
    editar.textContent = "Editar";
    editar.className = "btn-principal";
    editar.onclick = () => editarAcao(acao);

    const excluir = document.createElement("button");
    excluir.textContent = "Excluir";
    excluir.className = "btn-secundario";
    excluir.onclick = () => excluirAcao(acao.id);

    card.append(editar, excluir);
    div.appendChild(card);
}


function criarFormularioAcao(acao = null) {

    const div = document.getElementById("acoes-admin");
    div.innerHTML = "";

    const card = document.createElement("div");
    card.className = "admin-card";

    const titulo = document.createElement("h3");
    titulo.textContent = acao
        ? "Editar ação"
        : "Nova ação";

    const inputTitulo = document.createElement("input");
    inputTitulo.className = "admin-input";
    inputTitulo.placeholder = "Título da ação";
    inputTitulo.value = acao?.titulo || "";

    const inputTipo = document.createElement("input");
    inputTipo.className = "admin-input";
    inputTipo.placeholder = "Tipo da ação";
    inputTipo.value = acao?.tipo || "";

    const inputData = document.createElement("input");
    inputData.className = "admin-input";
    inputData.type = "date";
    inputData.value = acao?.data_acao || "";

    const inputHorario = document.createElement("input");
    inputHorario.className = "admin-input";
    inputHorario.type = "time";
    inputHorario.value = acao?.horario || "";

    const inputLocal = document.createElement("input");
    inputLocal.className = "admin-input";
    inputLocal.placeholder = "Local";
    inputLocal.value = acao?.local_acao || "";

    const textarea = document.createElement("textarea");
    textarea.className = "admin-textarea";
    textarea.rows = 4;
    textarea.placeholder = "Descrição da ação";
    textarea.value = acao?.descricao || "";

    const inputFoto = document.createElement("input");
    inputFoto.className = "admin-input";
    inputFoto.placeholder = "URL da foto";
    inputFoto.value = acao?.foto_url || "";

    const inputTags = document.createElement("input");
    inputTags.className = "admin-input";
    inputTags.placeholder = "Tags";
    inputTags.value = acao?.tags || "";

    const salvar = document.createElement("button");
    salvar.textContent = acao
        ? "Salvar alterações"
        : "Cadastrar ação";
    salvar.className = "btn-principal";

    salvar.onclick = () => {

        const dados = {
            titulo: inputTitulo.value,
            tipo: inputTipo.value,
            data_acao: inputData.value,
            horario: inputHorario.value,
            local_acao: inputLocal.value,
            descricao: textarea.value,
            foto_url: inputFoto.value,
            tags: inputTags.value
        };

        if (acao) {
            atualizarAcao(acao.id, dados);
        } else {
            criarAcao(dados);
        }
    };

    const cancelar = document.createElement("button");
    cancelar.textContent = "Cancelar";
    cancelar.className = "btn-secundario";
    cancelar.onclick = carregarAcoes;

    card.append(
        titulo,
        inputTitulo,
        inputTipo,
        inputData,
        inputHorario,
        inputLocal,
        textarea,
        inputFoto,
        inputTags,
        salvar,
        cancelar
    );

    div.appendChild(card);
}


async function criarAcao(dados) {

    if (
        !dados.titulo ||
        !dados.tipo ||
        !dados.data_acao ||
        !dados.horario ||
        !dados.local_acao ||
        !dados.descricao
    ) {
        alert("Preencha todos os campos obrigatórios.");
        return;
    }

    try {

        await addDoc(
            collection(db, "acoes"),
            {
                ...dados,
                email_usuario: auth.currentUser.email
            }
        );

        alert("Ação cadastrada com sucesso!");
        carregarAcoes();

    } catch (erro) {

        console.error(erro);
        alert("Erro ao cadastrar a ação.");

    }
}


function editarAcao(acao) {
    criarFormularioAcao(acao);
}


async function atualizarAcao(id, dados) {

    try {

        await updateDoc(
            doc(db, "acoes", id),
            dados
        );

        alert("Ação atualizada com sucesso!");
        carregarAcoes();

    } catch (erro) {

        console.error(erro);
        alert("Erro ao atualizar a ação.");

    }
}


async function excluirAcao(id) {

    if (!confirm("Tem certeza que deseja excluir esta ação?")) {
        return;
    }

    try {

        await deleteDoc(
            doc(db, "acoes", id)
        );

        alert("Ação excluída com sucesso!");
        carregarAcoes();

    } catch (erro) {

        console.error(erro);
        alert("Erro ao excluir a ação.");

    }
}


document.getElementById("opcao-agenda")
    .addEventListener("change", function () {

        if (this.value === "cadastrar") {
            criarFormularioAcao();
        }

        if (this.value === "gerenciar") {
            carregarAcoes();
        }

        if (this.value === "") {
            document.getElementById("acoes-admin").innerHTML = "";
        }

    });