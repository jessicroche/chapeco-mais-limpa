import { db } from "./auth.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

async function carregarConteudos() {

    try {

        const resultado = await getDocs(
            collection(db, "conteudo")
        );

        const conteudos = resultado.docs
            .map(documento => ({
                id: documento.id,
                ...documento.data()
            }))
            .filter(
                conteudo => conteudo.pagina === "entulho-jardinagem"
            );

        const buscar = nome =>
            conteudos.find(conteudo => conteudo.nome === nome);

        const introducao = buscar("entulho-jardinagem-introducao");
        const poda = buscar("poda-jardinagem-tipos");
        const podaPreparo = buscar("poda-jardinagem-preparo");
        const entulho = buscar("entulho-construcao-tipos");
        const entulhoPreparo = buscar("entulho-construcao-preparo");
        const dica = buscar("dica-sustentavel-entulho");

        if (introducao) {
            document.getElementById("titulo-introducao").textContent =
                introducao.titulo;
            document.getElementById("texto-introducao").textContent =
                introducao.texto;
        }

        if (poda) {
            document.getElementById("titulo-poda").textContent =
                poda.titulo;
            document.getElementById("texto-poda").textContent =
                poda.texto;
        }

        if (podaPreparo) {
            document.getElementById("texto-poda-preparo").textContent =
                podaPreparo.texto;
        }

        if (entulho) {
            document.getElementById("titulo-entulho").textContent =
                entulho.titulo;
            document.getElementById("texto-entulho").textContent =
                entulho.texto;
        }

        if (entulhoPreparo) {
            document.getElementById("texto-entulho-preparo").textContent =
                entulhoPreparo.texto;
        }

        if (dica) {
            document.getElementById("titulo-dica").textContent =
                dica.titulo;
            document.getElementById("texto-dica").textContent =
                dica.texto;
        }

        const nomesConhecidos = [
            "entulho-jardinagem-introducao",
            "poda-jardinagem-tipos",
            "poda-jardinagem-preparo",
            "entulho-construcao-tipos",
            "entulho-construcao-preparo",
            "dica-sustentavel-entulho"
        ];

        const divExtras =
            document.getElementById("conteudos-extras");

        conteudos
            .filter(conteudo => !nomesConhecidos.includes(conteudo.nome))
            .forEach(conteudo => {

                const bloco = document.createElement("div");
                bloco.className = "card-dica";

                const titulo = document.createElement("strong");
                titulo.textContent = conteudo.titulo;

                const texto = document.createElement("p");
                texto.textContent = conteudo.texto;

                bloco.append(titulo, texto);
                divExtras.appendChild(bloco);

            });

    } catch (erro) {

        console.error("Erro ao carregar conteúdos:", erro);

    }

}

carregarConteudos();