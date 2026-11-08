import express from "express";
import fs from "fs/promises";

import verificarToken from "../middleware/authMiddleware.js";

const router = express.Router();

const ARCHIVO_TAREAS = "./data/tareas.json";

// =========================
// GET /tareas
// =========================

router.get("/",verificarToken,async (req, res, next) => {

        try {

            const datos = await fs.readFile( ARCHIVO_TAREAS, "utf-8");

            const tareas = JSON.parse(datos);

            res.status(200).json( tareas);

        } catch (error) {

            next(error);
        }

    }
);

// =========================
// POST /tareas
// =========================

router.post("/",verificarToken,async (req, res, next) => {

        try {

            const {titulo,descripcion} = req.body;

            if ( !titulo || !descripcion) {

                const error = new Error( "El título y la descripción son obligatorios");

                error.status = 400;

                return next(error);
            }

            const datos = await fs.readFile( ARCHIVO_TAREAS, "utf-8");

            const tareas = JSON.parse(datos);

            const nuevaTarea = { id: Date.now(),titulo,descripcion };

            tareas.push( nuevaTarea );

            await fs.writeFile( ARCHIVO_TAREAS, JSON.stringify( tareas, null, 2));

            res.status(201).json({ mensaje: "Tarea creada correctamente",
                                   tarea: nuevaTarea });

        } catch (error) {

            next(error);
        }

    }
);

// =========================
// PUT /tareas/:id
// =========================
router.put("/:id", verificarToken,async (req, res, next) => {

        try {

            const id = Number( req.params.id );

            const { titulo, descripcion } = req.body;

            if ( !titulo || !descripcion ) {

                const error = new Error( "El título y la descripción son obligatorios" );

                error.status = 400;

                return next(error);
            }

            const datos = await fs.readFile( ARCHIVO_TAREAS, "utf-8");

            const tareas = JSON.parse(datos);

            const indice = tareas.findIndex( tarea => tarea.id === id );

            if ( indice === -1) {

                const error = new Error( "Tarea no encontrada");

                error.status = 404;

                return next(error);
            }

            tareas[indice] = { id, titulo, descripcion };

            await fs.writeFile( ARCHIVO_TAREAS, JSON.stringify( tareas, null, 2 ));

            res.status(200).json({ mensaje:"Tarea actualizada correctamente",
                                   tarea:tareas[indice] });

        } catch (error) {

            next(error);
        }

    }
);

// =========================
// DELETE /tareas/:id
// =========================

router.delete( "/:id", verificarToken, async (req, res, next) => {

        try {

            const id = Number( req.params.id);

            const datos = await fs.readFile( ARCHIVO_TAREAS, "utf-8");

            const tareas = JSON.parse(datos);

            const tareaExiste = tareas.find( tarea => tarea.id === id );

            if ( !tareaExiste ) {

                const error = new Error( "Tarea no encontrada" );

                error.status = 404;

                return next(error);
            }

            const nuevasTareas = tareas.filter( tarea => tarea.id !== id);

            await fs.writeFile( ARCHIVO_TAREAS, JSON.stringify( nuevasTareas, null, 2));

            res.status(200).json({ mensaje: "Tarea eliminada correctamente" });

        } catch (error) {

            next(error);
        }

    }
);

export default router;