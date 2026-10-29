require("dotenv").config({quiet: true});
const cors = require('cors')
const express = require("express");
const {conectar} = require("./config/config.js");
const peliculasRouter = require("./routes/peliculas.routes.js");
const routerResenas = require("./routes/resenas.routes.js");
const authRouter = require("./routes/auth.routes.js");
const noEncontrada = require("./middlewares/noEncontrada.js");
const manejarErrores = require("./middlewares/manejarErrores.js");
const logger = require("./middlewares/logger.js");
const authMiddleware = require("./middlewares/autenticar")
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger.js");

const app = express();
const PORT = process.env.PORT || 3000;

const origenesPermitidos = process.env.CORS_ORIGIN.split(",");

// Parseo de req.body
app.use(express.json());
app.use(cors({origin: origenesPermitidos}));

// Rutas para pelis
app.use(logger)
app.use('/peliculas', peliculasRouter);
app.use('/auth', authRouter);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.get('/api-docs.json', (req, res) => res.json(swaggerSpec));
app.use('/resenas', routerResenas);

// Manejo de errores en peticiones
app.use(noEncontrada);
//app.use(manejarErrores);

async function arrancar() {
    await conectar();

    app.listen(PORT, () => {
        console.log(`Bieeen, conectado a ${PORT}`);
    })
}

arrancar().catch(error => {
    console.error(error.message);
    process.exit(1);
});