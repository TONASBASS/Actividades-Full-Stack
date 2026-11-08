import express from "express";
import bodyParser from "body-parser";

import authRoutes from "./routes/authRoutes.js";
import tareasRoutes from "./routes/tareasRoutes.js";

import errorHandler from "./middleware/errorMiddleware.js";

const app = express();

const PORT = 3000;

app.use(bodyParser.json());

// Ruta principal
app.get("/", (req, res) => {

    res.status(200).json({ nombre: "API de Tareas", version: "1.0.0",
                           mensaje: "API funcionando correctamente"});

});

// Rutas
app.use("/", authRoutes);

app.use("/tareas", tareasRoutes);

// Error 400 de prueba
app.get("/error400", (req, res) => {

    res.status(400).json({ mensaje: "Solicitud incorrecta" });

});

// Error 500 de prueba
app.get("/error500", (req, res, next) => {

    const error = new Error( "Error interno de prueba" );

    next(error);

});

// Error 404
app.use((req, res, next) => {

    const error = new Error( "Ruta no encontrada" );

    error.status = 404;

    next(error);

});

// Middleware global de errores
app.use(errorHandler);

// Iniciar servidor
app.listen(PORT, () => {

    console.log( `Servidor ejecutándose en http://localhost:${PORT}` );

});