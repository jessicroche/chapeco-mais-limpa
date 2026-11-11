const express = require("express");

const router = express.Router();

const acaoController = require("../controllers/acao-controller");

router.get("/", acaoController.listar);

router.get("/:id", acaoController.buscarPorId);

router.post("/", acaoController.criar);

router.put("/:id", acaoController.atualizar);

router.delete("/:id", acaoController.excluir);

module.exports = router;