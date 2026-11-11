import { auth, db } from "./auth.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;
    const themeBtn = document.getElementById("theme-toggle");
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        body.classList.add("dark-mode");
    } else {
        body.classList.remove("dark-mode");
    }

    if (themeBtn) {

        themeBtn.addEventListener("click", () => {

            body.classList.toggle("dark-mode");

            localStorage.setItem(
                "theme",
                body.classList.contains("dark-mode")
                    ? "dark"
                    : "light"
            );

        });

    }


    const linkPainelAdmin =
        document.getElementById("link-painel-admin");

    const cardLogin =
        document.getElementById("card-login");


    if (linkPainelAdmin || cardLogin) {

        onAuthStateChanged(auth, async function (usuario) {

            if (!usuario) {
                return;
            }


            if (cardLogin) {
                cardLogin.style.display = "none";
            }


            if (linkPainelAdmin) {

                try {

                    const usuarioSnapshot =
                        await getDoc(
                            doc(db, "usuarios", usuario.uid)
                        );

                    if (
                        usuarioSnapshot.exists() &&
                        usuarioSnapshot.data().tipo_usuario === "ADM"
                    ) {
                        linkPainelAdmin.style.display =
                            "inline-block";
                    }

                } catch (erro) {

                    console.error(
                        "Erro ao verificar usuário:",
                        erro
                    );

                }

            }

        });

    }

});


const btnAumentar =
    document.getElementById("btn-aumentar-fonte");

const btnDiminuir =
    document.getElementById("btn-diminuir-fonte");

let tamanhoBase = 100;


if (btnAumentar && btnDiminuir) {

    btnAumentar.addEventListener("click", () => {

        if (tamanhoBase < 140) {

            tamanhoBase += 10;

            document.documentElement.style.fontSize =
                `${tamanhoBase}%`;

        }

    });


    btnDiminuir.addEventListener("click", () => {

        if (tamanhoBase > 90) {

            tamanhoBase -= 10;

            document.documentElement.style.fontSize =
                `${tamanhoBase}%`;

        }

    });

}

const btnPalestra =
    document.getElementById("btn-palestra");

const formularioPalestra =
    document.getElementById("formulario-palestra");

if (btnPalestra && formularioPalestra) {

    btnPalestra.addEventListener("click", () => {

        formularioPalestra.style.display = "block";
        btnPalestra.style.display = "none";

    });

}