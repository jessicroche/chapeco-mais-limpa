import { db } from "./auth.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


let acoes = [];
let dataAtual = new Date();


async function carregarAcoes() {

    try {

        const resultado =
            await getDocs(collection(db, "acoes"));

        acoes = resultado.docs.map(
            documento => ({
                id: documento.id,
                ...documento.data()
            })
        );

        mostrarCalendario();

    } catch (erro) {

        console.error("Erro ao carregar ações:", erro);

        document.getElementById("acoes-dia").innerHTML = `
            <div class="card-dica">
                <p>Não foi possível carregar as ações.</p>
            </div>
        `;

    }
}


function mostrarCalendario() {

    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth();

    const nomeMes = dataAtual.toLocaleDateString(
        "pt-BR",
        {
            month: "long",
            year: "numeric"
        }
    );

    document.getElementById("mes-atual").textContent =
        nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1);

    const diasCalendario =
        document.getElementById("dias-calendario");

    diasCalendario.innerHTML = "";

    const primeiroDia = new Date(ano, mes, 1);

    let diaSemana = primeiroDia.getDay();

    if (diaSemana === 0) {
        diaSemana = 6;
    } else {
        diaSemana--;
    }

    const quantidadeDias =
        new Date(ano, mes + 1, 0).getDate();

    for (let i = 0; i < diaSemana; i++) {

        const vazio = document.createElement("div");

        vazio.className = "dia-calendario vazio";

        diasCalendario.appendChild(vazio);

    }

    for (let dia = 1; dia <= quantidadeDias; dia++) {

        const elemento = document.createElement("button");

        elemento.className = "dia-calendario";
        elemento.textContent = dia;

        const dataFormatada =
            ano + "-" +
            String(mes + 1).padStart(2, "0") + "-" +
            String(dia).padStart(2, "0");

        const acoesDoDia = acoes.filter(
            acao => acao.data_acao === dataFormatada
        );

        if (acoesDoDia.length > 0) {
            elemento.classList.add("tem-acao");
        }

        elemento.addEventListener(
            "click",
            function () {
                mostrarAcoesDoDia(
                    dataFormatada,
                    acoesDoDia
                );
            }
        );

        diasCalendario.appendChild(elemento);

    }

}


function mostrarAcoesDoDia(data, acoesDoDia) {

    const div = document.getElementById("acoes-dia");

    div.innerHTML = "";

    const partes = data.split("-");

    const dataFormatada =
        partes[2] + "/" +
        partes[1] + "/" +
        partes[0];

    const titulo = document.createElement("h3");

    titulo.textContent =
        "Ações do dia " + dataFormatada;

    div.appendChild(titulo);

    if (acoesDoDia.length === 0) {

        const mensagem = document.createElement("p");

        mensagem.textContent =
            "Nenhuma ação cadastrada para este dia.";

        div.appendChild(mensagem);

        return;

    }

    acoesDoDia.forEach(function (acao) {

        const card = document.createElement("div");

        card.className = "card-dica";

        const tituloAcao = document.createElement("h3");

        tituloAcao.textContent =
            acao.titulo;

        const tipo = document.createElement("p");

        tipo.innerHTML =
            "<strong>Tipo:</strong> " + acao.tipo;

        const horario = document.createElement("p");

        horario.innerHTML =
            "<strong>Horário:</strong> " + acao.horario;

        const local = document.createElement("p");

        local.innerHTML =
            "<strong>Local:</strong> " + acao.local_acao;

        const descricao = document.createElement("p");

        descricao.textContent =
            acao.descricao;

        card.append(
            tituloAcao,
            tipo,
            horario,
            local,
            descricao
        );

        if (acao.tags) {

            const tags = document.createElement("p");

            tags.innerHTML =
                "<strong>Tags:</strong> " + acao.tags;

            card.appendChild(tags);

        }

        if (acao.foto_url) {

            const imagem = document.createElement("img");

            imagem.src = acao.foto_url;
            imagem.alt = acao.titulo;
            imagem.style.maxWidth = "100%";

            card.appendChild(imagem);

        }

        div.appendChild(card);

    });

}


document.getElementById("mes-anterior")
    .addEventListener("click", function () {

        dataAtual.setMonth(
            dataAtual.getMonth() - 1
        );

        mostrarCalendario();
        document.getElementById("acoes-dia").innerHTML = "";

    });


document.getElementById("mes-proximo")
    .addEventListener("click", function () {

        dataAtual.setMonth(
            dataAtual.getMonth() + 1
        );

        mostrarCalendario();
        document.getElementById("acoes-dia").innerHTML = "";

    });


mostrarCalendario();
carregarAcoes();