const { esIdValida } = require("../services/peliculas.service");

function validarId(req, res, next) {
    if(!esIdValida(req.params.id))
        return res.status(400).json({ error: "Id invalida/no encontrada"});

    next();
}

module.exports = validarId;