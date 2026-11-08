import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs/promises";

const router = express.Router();

const ARCHIVO_USUARIOS = "./data/usuarios.json";

const CLAVE_SECRETA = "clave_secreta";

// =========================
// REGISTER
// =========================

router.post("/register",async (req,res,next) => {

    try {

        const {username,password} = req.body;

        if (!username || !password) {

            const error = new Error("Usuario y contraseña son obligatorios");

            error.status = 400;

            return next(error);

        }

        let usuarios = [];

        try {

            const datos = await fs.readFile(ARCHIVO_USUARIOS,"utf-8");

            usuarios = JSON.parse(datos);

        } catch {

            usuarios = [];

        }

        const usuarioExistente = usuarios.find(usuario => usuario.username === username);

        if (usuarioExistente) {

            const error = new Error("El usuario ya existe");

            error.status = 400;

            return next(error);

        }

        const passwordEncriptada = await bcrypt.hash(password,10);

        const nuevoUsuario = { id: Date.now(), username, password: passwordEncriptada };

        usuarios.push(nuevoUsuario);

        await fs.writeFile(ARCHIVO_USUARIOS,JSON.stringify(usuarios,null,2));

        res.status(201).json({mensaje:"Usuario registrado correctamente"});

    } catch (error) {

        next(error);

    }

});

// =========================
// LOGIN
// =========================

router.post("/login",async (req,res,next) => {

    try {

        const {username,password} = req.body;

        let usuarios = [];

        try {

            const datos = await fs.readFile(ARCHIVO_USUARIOS,"utf-8");

            usuarios = JSON.parse(datos);

        } catch {

            usuarios = [];

        }

        const usuario = usuarios.find(usuario => usuario.username === username);

        if (!usuario) {

            const error = new Error("Usuario o contraseña incorrectos");

            error.status = 401;

            return next(error);

        }

        const coincide = await bcrypt.compare(password,usuario.password);

        if (!coincide) {

            const error = new Error("Usuario o contraseña incorrectos");

            error.status = 401;

            return next(error);

        }

        const token = jwt.sign({id:usuario.id,username:usuario.username},CLAVE_SECRETA,{expiresIn:"1h"});

        res.status(200).json({mensaje:"Inicio de sesión exitoso",token});

    } catch (error) {

        next(error);

    }

});

export default router;