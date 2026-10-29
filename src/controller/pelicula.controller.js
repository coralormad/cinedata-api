const { listar, mejores, buscarPorId, crear, actualizar, eliminar} = require("../services/peliculas.service.js");

const ORDENES = {
    nota: { nota: -1, titulo: 1},
    anio: { anio: -1, titulo: 1},
    titulo: {titulo: 1}
}

async function listarPeliculas(req, res) {
    const {genero, anioDesde, notaMin, disponible, orden = "nota"} = req.query;
    const pagina = Math.max(parseInt(req.query.page) || 1, 1);
    const limite = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 50);

    if (!ORDENES[orden]) {
        return res.status(400).json({error: `Orden no valido, valores validos: ${Object.keys(ORDENES).join(", ")}`});
    }

    const filtros = {genero, anioDesde, notaMin, disponible};
    const {peliculas, total} = await listar(filtros, ORDENES[orden], pagina, limite);
    res.json({
        datos: peliculas.map(p => p.resumen()),
        paginacion: {
            pagina,
            limite,
            total,
            paginas: Math.ceil(total / limite)
        }
    })

    //const peliculas = await listar(req.query.genero);
    //res.status(200).json(peliculas.map(p => p.resumen()));
}

async function top(req, res) {
    const peliculas = await mejores();
    res.status(200).json(peliculas.map(p => p.resumen()));
}

async function obtener(req, res) {
    const id = req.params.id;

    const pelicula = await buscarPorId(id);
    if(!pelicula)
        return res.status(404).json({ error: "Pelicula invalida/no encontrada"});

    res.status(200).json(pelicula.resumen());
}

async function crearPelicula(req, res) {
    const pelicula = await crear(req.body);
    if(!pelicula)
        return res.status(404).json({ error: "Pelicula no encontrada"});
    res.status(200).json(pelicula);
}

async function actualizarPelicula(req, res) {
    const pelicula = await actualizar(req.params.id, req.body);
    if(!pelicula)
        return res.status(404).json({ error: "Pelicula no encontrada"});
    res.status(200).json(pelicula);
}

async function borrarPelicula(req, res) {
    const pelicula = await eliminar(req.params.id);
    if(!pelicula)
        return res.status(404).json({ error: "Pelicula no encontrada"});
    res.status(204).end;
}

module.exports = { listarPeliculas, top, obtener, crearPelicula, actualizarPelicula, borrarPelicula }