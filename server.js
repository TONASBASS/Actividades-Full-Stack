import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import conectarDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import productoRoutes from "./routes/productoRoutes.js";

import errorHandler from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

console.log("VERSION RAILWAY 16-11-2026");

console.log("=================================");
console.log("INICIANDO APLICACION");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("PORT:", process.env.PORT);
console.log(
    "MONGODB_URI:",
    process.env.MONGODB_URI ? "CONFIGURADA" : "NO CONFIGURADA"
);
console.log(
    "JWT_SECRET:",
    process.env.JWT_SECRET ? "CONFIGURADA" : "NO CONFIGURADA"
);
console.log("=================================");

// =========================
// CONEXION MONGODB
// =========================

conectarDB();

console.log("PASO 1 - MongoDB solicitada");

// =========================
// MIDDLEWARES
// =========================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

console.log("PASO 2 - Middlewares cargados");

// =========================
// RUTA PRINCIPAL
// =========================

app.get("/", (req, res) => {

    res.sendFile(
        path.join(__dirname, "public", "index.html")
    );

});

// =========================
// RUTAS AUTH
// =========================

app.use("/api/auth", authRoutes);

// =========================
// RUTAS PRODUCTOS
// =========================

app.use("/api/productos", productoRoutes);

console.log("PASO 3 - Rutas cargadas");

// =========================
// ERROR 404
// =========================

app.use((req, res, next) => {

    const error = new Error("Ruta no encontrada");

    error.status = 404;

    next(error);

});

// =========================
// MIDDLEWARE ERRORES
// =========================

app.use(errorHandler);

console.log("PASO 4 - Middleware de errores cargado");

// =========================
// INICIAR SERVIDOR
// =========================

app.listen(PORT, "0.0.0.0", () => {

    console.log("=================================");
    console.log(`Servidor ejecutándose en puerto ${PORT}`);
    console.log("Servidor escuchando correctamente");
    console.log("=================================");

});