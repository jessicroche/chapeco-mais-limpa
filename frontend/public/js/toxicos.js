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
                conteudo => conteudo.pagina === "toxicos"
            );

        const buscar = nome =>
            conteudos.find(conteudo => conteudo.nome === nome);

        const introducao = buscar("toxicos-introducao");
        const pilhas = buscar("pilhas-baterias-lampadas-tipos");
        const pilhasPreparo = buscar("pilhas-baterias-lampadas-preparo");
        const oleoPreparo = buscar("oleo-cozinha-preparo");
        const pneus = buscar("pneus-tipos");
        const pneusPreparo = buscar("pneus-preparo");
        const dica = buscar("dica-sustentavel-toxicos");

        if (introducao) {
            document.getElementById("titulo-introducao").textContent =
                introducao.titulo;
            document.getElementById("texto-introducao").textContent =
                introducao.texto;
        }

        if (pilhas) {
            document.getElementById("titulo-pilhas").textContent =
                pilhas.titulo;
            document.getElementById("texto-pilhas").textContent =
                pilhas.texto;
        }

        if (pilhasPreparo) {
            document.getElementById("texto-pilhas-preparo").textContent =
                pilhasPreparo.texto;
        }

        if (oleoPreparo) {
            document.getElementById("titulo-oleo").textContent =
                oleoPreparo.titulo;
            document.getElementById("texto-oleo-preparo").textContent =
                oleoPreparo.texto;
        }

        if (pneus) {
            document.getElementById("titulo-pneus").textContent =
                pneus.titulo;
            document.getElementById("texto-pneus").textContent =
                pneus.texto;
        }

        if (pneusPreparo) {
            document.getElementById("texto-pneus-preparo").textContent =
                pneusPreparo.texto;
        }

        if (dica) {
            document.getElementById("titulo-dica").textContent =
                dica.titulo;
            document.getElementById("texto-dica").textContent =
                dica.texto;
        }

        const nomesConhecidos = [
            "toxicos-introducao",
            "pilhas-baterias-lampadas-tipos",
            "pilhas-baterias-lampadas-preparo",
            "oleo-cozinha-preparo",
            "pneus-tipos",
            "pneus-preparo",
            "dica-sustentavel-toxicos"
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