const express = require("express");

const router = express.Router();

const usuarioController = require("../controllers/usuario-controller");

router.get("/", usuarioController.listar);

router.get("/email/:email", usuarioController.buscarPorEmail);

router.post("/", usuarioController.criar);

router.put("/:id", usuarioController.atualizar);

router.delete("/:id", usuarioController.excluir);

module.exports = router;