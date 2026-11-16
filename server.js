import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import conectarDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import productoRoutes from "./routes/productoRoutes.js";

import errorHandler from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

// =========================
// CONEXION MONGODB
// =========================

conectarDB();

// =========================
// MIDDLEWARES
// =========================

app.use( cors() );

app.use( express.json() );

app.use( express.urlencoded({ extended:true }) );

app.use( express.static( "public" ) );
// =========================
// RUTA PRINCIPAL
// =========================

app.get( "/",( req,res ) => {

    res.status(200).json({

        nombre:"Automatiuh API",

        version:"1.0.0",

        mensaje:"Servidor funcionando correctamente"

    });

});

// =========================
// RUTAS AUTH
// =========================

app.use( "/api/auth",authRoutes );

// =========================
// RUTAS PRODUCTOS
// =========================

app.use( "/api/productos",productoRoutes );

// =========================
// ERROR 404
// =========================

app.use(( req,res,next ) => {

    const error = new Error( "Ruta no encontrada" );

    error.status = 404;

    next( error );

});

// =========================
// MIDDLEWARE ERRORES
// =========================

app.use( errorHandler );

// =========================
// INICIAR SERVIDOR
// =========================

app.listen( PORT,() => {

    console.log(

        `Servidor ejecutándose en http://localhost:${PORT}`

    );

});
