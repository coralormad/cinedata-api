function enviarJSON(res, status, datos) {
    res.writeHead(status, {"content-type": "application/json; charset: utf-8"});
    res.end(JSON.stringify(datos));
}

module.exports = { enviarJSON }