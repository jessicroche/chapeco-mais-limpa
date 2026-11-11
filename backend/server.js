const express = require("express");
const cors = require("cors");

const usuarioRoutes = require("./routes/usuario-routes");
const conteudoRoutes = require("./routes/conteudo-routes");
const acaoRoutes = require("./routes/acao-routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        mensagem: "Servidor funcionando!",
    });
});

app.use("/usuario", usuarioRoutes);
app.use("/conteudo", conteudoRoutes);
app.use("/acao", acaoRoutes);

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});