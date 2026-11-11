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
                conteudo => conteudo.pagina === "volumosos-eletronicos"
            );

        const buscar = nome =>
            conteudos.find(conteudo => conteudo.nome === nome);

        const introducao = buscar("volumosos-eletronicos-introducao");
        const moveis = buscar("moveis-volumosos-tipos");
        const moveisPreparo = buscar("moveis-volumosos-preparo");
        const eletronicos = buscar("eletronicos-tipos");
        const eletronicosPreparo = buscar("eletronicos-preparo");
        const dica = buscar("dica-sustentavel-volumosos");

        if (introducao) {
            document.getElementById("titulo-introducao").textContent =
                introducao.titulo;
            document.getElementById("texto-introducao").textContent =
                introducao.texto;
        }

        if (moveis) {
            document.getElementById("titulo-moveis").textContent =
                moveis.titulo;
            document.getElementById("texto-moveis").textContent =
                moveis.texto;
        }

        if (moveisPreparo) {
            document.getElementById("texto-moveis-preparo").textContent =
                moveisPreparo.texto;
        }

        if (eletronicos) {
            document.getElementById("titulo-eletronicos").textContent =
                eletronicos.titulo;
            document.getElementById("texto-eletronicos").textContent =
                eletronicos.texto;
        }

        if (eletronicosPreparo) {
            document.getElementById("texto-eletronicos-preparo").textContent =
                eletronicosPreparo.texto;
        }

        if (dica) {
            document.getElementById("titulo-dica").textContent =
                dica.titulo;
            document.getElementById("texto-dica").textContent =
                dica.texto;
        }

        const nomesConhecidos = [
            "volumosos-eletronicos-introducao",
            "moveis-volumosos-tipos",
            "moveis-volumosos-preparo",
            "eletronicos-tipos",
            "eletronicos-preparo",
            "dica-sustentavel-volumosos"
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