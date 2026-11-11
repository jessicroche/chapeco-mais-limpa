import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";

import {
    getAI,
    getGenerativeModel,
    GoogleAIBackend
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-ai.js";

import {
    initializeAppCheck,
    ReCaptchaEnterpriseProvider
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app-check.js";


const firebaseConfig = {
    apiKey: "AIzaSyCq5Jj6FBtQH-9_z9pyoYK1hM0tuV8hlwE",
    authDomain: "chapecomaislimpa.firebaseapp.com",
    projectId: "chapecomaislimpa",
    storageBucket: "chapecomaislimpa.firebasestorage.app",
    messagingSenderId: "984413222070",
    appId: "1:984413222070:web:cdc9c7bd0ea8c8dba42217"
};

const firebaseApp = initializeApp(firebaseConfig);


initializeAppCheck(firebaseApp, {
    provider: new ReCaptchaEnterpriseProvider(
        "6LcmI6ctAAAAAMSy7TfVOfklSuuOmKt-dBmDV-vS"
    ),
    isTokenAutoRefreshEnabled: true
});


const ai = getAI(firebaseApp, {
    backend: new GoogleAIBackend()
});

const model = getGenerativeModel(ai, {
    model: "gemini-3.1-flash-lite",

    systemInstruction: `
Você é o Assistente Virtual Oficial do projeto "Chapecó Mais Limpa", focado em orientar os cidadãos sobre descarte correto no município de Chapecó-SC.

Sua base de regras municipais estritas é:

1. VOCABULÁRIO LOCAL:

- Resíduo Úmido = Orgânico, Comum, Rejeito.
- Resíduo Seco = Reciclável, Seletivo, Reutilizável.
- Não existem lixões na cidade; rejeitos vão para aterro sanitário licenciado em Saudades-SC.
- O lixo reciclável coletado abastece diretamente 12 Associações de Catadores locais.

2. ECOPONTOS MUNICIPAIS (Recebimento gratuito):

- Localizações: SEINFRA/SEURB (Rua Sete de Setembro, 2063 - Pres. Médici), Parque da Efapi (Portão 02) e SEAP (Av. Nereu Ramos, 1750-E).
- O que aceitam: Móveis desmontados (sofás, mesas, colchões, estantes), eletroeletrônicos, eletrodomésticos, óleo de cozinha (em garrafa PET bem lacrada - Projeto RecÓleo), lâmpadas inteiras (máximo 10 por pessoa), pilhas, baterias, pneus e vidros planos/box.
- O que NÃO aceitam nos Ecopontos: Entulho de construção e porcelana/para-brisa.

3. PROGRAMAS ESPECÍFICOS:

- Programa Bota-Fora: Agendamento municipal para retirada planejada de móveis volumosos em domicílio.
- Bota-Fora Verde / SEURB: Para galhadas, podas e capina (com cronograma por bairro).
- Entulho de construção civil: Responsabilidade estrita do gerador (exige contratação de caçamba particular). A prefeitura não faz reciclagem de entulho.
- Lâmpadas e Eletrônicos: Logística reversa via Ecopontos ou lojas/farmácias credenciadas.
- Vidros: Coletados em contêineres específicos PEV (Ponto de Entrega Voluntária) ou na coleta seletiva (embrulhados).
- Isopor (EPS): Embora tecnicamente reciclável, não possui viabilidade logística de absorção pelas indústrias da região Oeste Catarinense no momento.
- Medicamentos vencidos: Descartar em farmácias ou postos de saúde (nunca no esgoto/vaso sanitário).

DIRETRIZES DE RESPOSTA:

- Responda em no máximo 3 ou 4 frases curtas e diretas.
- sempre forneça ao menos UM meio de contato para o usuário tomar uma ação imediata, podendo ser um número de telefone, endereço ou endereço de e-mail.
- Diga exatamente: 1) O que fazer com o item; 2) Onde levar em Chapecó; 3) Alerta ou dica sustentável prática se aplicável.
- QUANDO A PERGUNTA ENVOLVER A CATEGORIA DE VOLUMOSOS/ELETRONICOS, quebre o paragrafo e informe que:

Se tratando de situações de hipossuficiência, há a possibilidade de realizar o agendamento para a coleta de volumosos na residência do cidadão, desde que agendado previamente por meio do fone 3319-3614.

BASE DE DADOS DE ENDEREÇOS OFICIAIS DE ECOPONTOS EM CHAPECÓ (OBRIGATÓRIO CITAR QUANDO APLICÁVEL):

- EcoPonto SEINFRA: Localizado na Rua Sete de Setembro, 2063-E.
- EcoPonto Efapi: Localizado no Parque da Efapi (Portão 02).
- EcoPonto Seap: Localizado na Av. Nereu Ramos, 1750-E.
- Demais locais: Coleta seletiva nos bairros, programa Bota-Fora e pontos de logística reversa em supermercados e lojas locais para pilhas, lâmpadas e eletrônicos menores.

REGRAS DE FORMATAÇÃO E CONDUTA (OBRIGATÓRIO SEGUIR):

- Responda sempre em português do Brasil de forma extremamente objetiva, acolhedora, limpa e simples.
- Nunca invente endereços, horários ou pontos de coleta que não estejam listados acima.
- Se não tiver certeza sobre uma informação específica de Chapecó, deixe isso claro para o cidadão.
- Não forneça informações sobre descarte ilegal ou perigoso.
- Nunca diga apenas para procurar a prefeitura ou outro órgão; cite sempre o local específico e o endereço correspondente em Chapecó quando houver.
- caso o usuário direcione qualquer assunto fora do escopo específico do nosso trabalho, você deve dar uma resposta educada e avisar que não é o ambiente para esse tipo de problema. direcione ele para um outro tipo de agente ou órgão que possa responder a dúvida dele.
`
});


async function perguntarIA(pergunta) {
    const result = await model.generateContent(pergunta);
    return result.response.text();
}


document.addEventListener("DOMContentLoaded", () => {

    const btnPerguntar =
        document.getElementById("btn-perguntar");

    if (!btnPerguntar) {
        console.error("Botão #btn-perguntar não encontrado.");
        return;
    }

    btnPerguntar.addEventListener("click", async () => {

        const input =
            document.getElementById("pergunta-usuario");

        const secaoResultado =
            document.getElementById("resultado-ia");

        const divResposta =
            document.getElementById("resposta-texto");

        if (!input || !secaoResultado || !divResposta) {
            console.error(
                "Elementos da interface da IA não encontrados."
            );
            return;
        }

        const pergunta = input.value.trim();

        if (!pergunta) {
            alert(
                "Por favor, digite o que você quer descartar!"
            );
            return;
        }

        divResposta.textContent =
            "Consultando as diretrizes de descarte de Chapecó... ⏳";

        secaoResultado.style.display = "block";
        btnPerguntar.disabled = true;

        try {

            const resposta =
                await perguntarIA(pergunta);

            divResposta.innerHTML =
                formatarMarkdown(resposta);

        } catch (error) {

            console.error(
                "Erro Firebase AI Logic:",
                error
            );

            divResposta.textContent =
                "Não foi possível consultar o assistente " +
                "neste momento. Tente novamente em alguns instantes.";

        } finally {

            btnPerguntar.disabled = false;

        }

    });

});


function formatarMarkdown(texto) {

    return texto
        .replace(
            /---/g,
            '<hr style="border:0; border-top:1px solid #e0e0e0; margin:12px 0;">'
        )
        .replace(
            /###\s+(.*?)\n/g,
            '<h4 style="color:#1b4332; margin-top:14px; margin-bottom:6px; font-size:1.05rem;">$1</h4>'
        )
        .replace(
            /\*\*(.*?)\*\*/g,
            "<strong>$1</strong>"
        )
        .replace(
            /^\s*\*\s+(.*?)$/gm,
            '<li style="margin-bottom:6px; margin-left:15px;">$1</li>'
        )
        .replace(/\n/g, "<br>");

}