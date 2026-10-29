const express = require("express");
const {registro, login, perfil} = require("../controller/auth.controller");
const autenticar = require("../middlewares/autenticar")

const router = express.Router();

// AQUI DEBEIS COMENTAR SWAGGER
router.post("/registro", registro);
router.post("/login", login);
router.get("/perfil", autenticar, perfil)

module.exports = router;