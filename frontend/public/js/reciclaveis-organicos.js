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
                conteudo => conteudo.pagina === "reciclaveis-organicos"
            );

        const buscar = nome =>
            conteudos.find(conteudo => conteudo.nome === nome);

        const introducao = buscar("reciclaveis-organicos-introducao");
        const reciclaveis = buscar("reciclaveis-tipos");
        const reciclaveisPreparo = buscar("reciclaveis-preparo");
        const organicos = buscar("organicos-tipos");
        const organicosPreparo = buscar("organicos-preparo");
        const dica = buscar("dica-sustentavel");

        if (introducao) {
            document.getElementById("titulo-introducao").textContent =
                introducao.titulo;
            document.getElementById("texto-introducao").textContent =
                introducao.texto;
        }

        if (reciclaveis) {
            document.getElementById("titulo-reciclaveis").textContent =
                reciclaveis.titulo;
            document.getElementById("texto-reciclaveis").textContent =
                reciclaveis.texto;
        }

        if (reciclaveisPreparo) {
            document.getElementById("texto-reciclaveis-preparo").textContent =
                reciclaveisPreparo.texto;
        }

        if (organicos) {
            document.getElementById("titulo-organicos").textContent =
                organicos.titulo;
            document.getElementById("texto-organicos").textContent =
                organicos.texto;
        }

        if (organicosPreparo) {
            document.getElementById("texto-organicos-preparo").textContent =
                organicosPreparo.texto;
        }

        if (dica) {
            document.getElementById("titulo-dica").textContent =
                dica.titulo;
            document.getElementById("texto-dica").textContent =
                dica.texto;
        }

        const nomesConhecidos = [
            "reciclaveis-organicos-introducao",
            "reciclaveis-tipos",
            "reciclaveis-preparo",
            "organicos-tipos",
            "organicos-preparo",
            "dica-sustentavel"
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