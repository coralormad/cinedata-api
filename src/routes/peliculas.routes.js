const express = require("express");
const { listarPeliculas, top, obtener, crearPelicula, actualizarPelicula, borrarPelicula } = require("../controller/pelicula.controller");
const validarId = require("../middlewares/validarId");
const autenticar = require("../middlewares/autenticar");
const autorizar = require("../middlewares/autorizar");

const router = express.Router();

/**
 * @openapi
 * /peliculas:
 *   get:
 *     tags: [Películas]
 *     summary: Lista las películas ordenadas por nota
 *     parameters:
 *       - name: genero
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           example: Drama
 *     responses:
 *       200:
 *         description: Lista de películas en resumen
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pelicula'
 */
router.get("/", listarPeliculas);

router.get('/top', top);
router.get('/:id', validarId, obtener);

router.post('/', autenticar, autorizar("admin"), crearPelicula);
router.put('/:id', autenticar, autorizar("admin", "usuario"), actualizarPelicula);
router.delete('/:id', autenticar, autorizar("admin"), validarId, borrarPelicula)

module.exports = router;