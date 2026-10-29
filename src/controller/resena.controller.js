const { buscarPorId } = require("../services/peliculas.service.js");
const { dePelicula, crear } = require("../services/resena.service.js");

/*async function mostrarResenas(req, res) {
    const resenas = await listarResenas();
    res.status(200).json(resenas.map(p => p.toJSON()));
}*/

async function cargarResena(req, res) {
    const resena = await dePelicula(req.params.id);
    return res.status(200).json(resena);
}

async function crearResena(req, res) {
    const pelicula = await buscarPorId(req.params.id);
    if(!pelicula) {
        return res.status(404).json({error: "Pelicula no encontrada"});
    }
    const resena = await crear(req.params.id, req.usuario.id, req.body);
    res.status(201).json(resena);
}

module.exports = { cargarResena, crearResena }