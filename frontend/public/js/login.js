import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {
    auth,
    db
} from "./auth.js";


document.getElementById("btn-login")
    .addEventListener("click", async function () {

        const email =
            document.getElementById("email").value.trim();

        const senha =
            document.getElementById("senha").value;

        const mensagem =
            document.getElementById("mensagem-login");


        mensagem.textContent = "";


        if (email === "" || senha === "") {

            mensagem.textContent =
                "Preencha o e-mail e a senha.";

            return;

        }


        try {

            const resultado =
                await signInWithEmailAndPassword(
                    auth,
                    email,
                    senha
                );


            const uid =
                resultado.user.uid;


            const usuarioRef =
                doc(db, "usuarios", uid);

            const usuarioSnapshot =
                await getDoc(usuarioRef);


            if (!usuarioSnapshot.exists()) {

                mensagem.textContent =
                    "Login correto, mas este usuário não possui perfil cadastrado.";

                return;

            }


            const usuario =
                usuarioSnapshot.data();


            if (usuario.tipo_usuario !== "ADM") {

                mensagem.textContent =
                    "Login correto, mas este usuário não é administrador.";

                return;

            }


            mensagem.textContent =
                "Login realizado com sucesso!";


            window.location.href =
                "admin.html";


        } catch (erro) {

            console.error(erro);


            if (erro.code === "auth/invalid-credential") {

                mensagem.textContent =
                    "E-mail ou senha incorretos.";

            }

            else if (erro.code === "auth/invalid-email") {

                mensagem.textContent =
                    "O e-mail informado não é válido.";

            }

            else if (erro.code === "auth/user-disabled") {

                mensagem.textContent =
                    "Este usuário está desativado.";

            }

            else if (erro.code === "auth/user-not-found") {

                mensagem.textContent =
                    "Usuário não encontrado.";

            }

            else if (erro.code === "auth/wrong-password") {

                mensagem.textContent =
                    "Senha incorreta.";

            }

            else if (erro.code === "permission-denied") {

                mensagem.textContent =
                    "Login realizado, mas o Firestore não permitiu acessar o perfil do usuário.";

            }

            else {

                mensagem.textContent =
                    "Não foi possível realizar o login.";

            }

        }

    });