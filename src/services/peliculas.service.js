const mongoose = require("mongoose");
const Pelicula = require("../models/Pelicula.js");

function construirFiltro({genero, anioDesde, notaMin, disponible})
{
    const filtro = {};
    if (genero) filtro.generos = genero;
    if (anioDesde) filtro.anio = {$gte: anioDesde};
    if (notaMin) filtro.nota = {$gte: notaMin};
    if (disponible) filtro.disponible = {$eq: true};
    return filtro
}

async function listar(filtro, orden, pagina, limite) {
    const filtroConstruido = construirFiltro(filtro);
    const [peliculas, total] = await Promise.all([
        Pelicula.find(filtroConstruido).sort(orden).skip((pagina-1)*limite).limit(limite),
        Pelicula.countDocuments(filtroConstruido)
    ]);
    return { peliculas, total };
} 

async function mejores(n = 3) {
    return Pelicula.find().sort({ nota: -1, titulo: 1}).limit(n);
}

async function buscarPorId(id) {
    return Pelicula.findById(id);
}

// CREATE 
async function crear(datos) {
    return Pelicula.create(datos);
}

// UPDATE
async function actualizar(id, datos)
{
    return Pelicula.findByIdAndUpdate(id, datos, { returnDocument: "after", runValidators: true });
}

// DELETE
async function eliminar(id) {
    return Pelicula.findByIdAndDelete(id);
}

// Funciones auxiliares
function esIdValida(id) {
    return mongoose.isValidObjectId(id);
}

module.exports = {listar, mejores, buscarPorId, esIdValida, crear, actualizar, eliminar}