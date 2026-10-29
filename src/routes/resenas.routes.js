const { Router } = require("express");
const { cargarResena, crearResena } = require("../controller/resena.controller");
const autenticar = require("../middlewares/autenticar");
const autorizar = require("../middlewares/autorizar");
const validarId = require("../middlewares/validarId");
const router = Router();

router.get('/:id', cargarResena);
router.post("/:id", autenticar, validarId, crearResena);

module.exports = router;