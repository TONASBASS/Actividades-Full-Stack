import express from "express";

import verificarToken from "../middleware/authMiddleware.js";

import {

    obtenerProductos,

    obtenerProducto,

    crearProducto,

    actualizarProducto,

    eliminarProducto

} from "../controllers/productoController.js";

const router = express.Router();

// =========================
// GET PRODUCTOS
// =========================

router.get( "/",verificarToken,obtenerProductos );

// =========================
// GET PRODUCTO POR ID
// =========================

router.get( "/:id",verificarToken,obtenerProducto );

// =========================
// POST PRODUCTO
// =========================

router.post( "/",verificarToken,crearProducto );

// =========================
// PUT PRODUCTO
// =========================

router.put( "/:id",verificarToken,actualizarProducto );

// =========================
// DELETE PRODUCTO
// =========================

router.delete( "/:id",verificarToken,eliminarProducto );

export default router;