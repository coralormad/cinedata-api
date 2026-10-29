const Resena = require("../models/Resena.js");
require("../models/Usuario");
require("../models/Pelicula");

//async function listarResenas() {
 //   const docs = await collection().find({}).sort({ estrellas: -1}).toArray();
 //   return docs.map(doc => new Resena(doc));
//}

async function dePelicula(peliculaId) {
    return Resena.find({peliculaId: peliculaId})
    .populate("usuarioId")
    .populate("peliculaId")
    .sort({estrellas: -1});
}

async function crear(peliculaId, usuarioId, { texto, estrellas }) {
    const resena = await Resena.create({peliculaId: peliculaId, usuarioId: usuarioId, texto: texto, estrellas: estrellas});
    return resena.populate(["usuarioId", "peliculaId"]);
}

module.exports = { dePelicula, crear }