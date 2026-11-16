import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Usuario from "../models/Usuario.js";

export const register = async ( req,res,next ) => {

    try {

        const {nombre,email,password} = req.body;

        if ( !nombre || !email || !password ) {

            const error = new Error( "Todos los campos son obligatorios" );

            error.status = 400;

            return next( error );

        }

        const usuarioExistente = await Usuario.findOne({ email });

        if ( usuarioExistente ) {

            const error = new Error( "El usuario ya existe" );

            error.status = 400;

            return next( error );

        }

        const passwordEncriptada = await bcrypt.hash( password,10 );

        const nuevoUsuario = new Usuario({

            nombre,
            email,
            password: passwordEncriptada

        });

        await nuevoUsuario.save();

        res.status(201).json({

            mensaje:"Usuario registrado correctamente"

        });

    } catch (error) {

        next( error );

    }

};

export const login = async ( req,res,next ) => {

    try {

        const {email,password} = req.body;

        if ( !email || !password ) {

            const error = new Error( "Correo y contraseña son obligatorios" );

            error.status = 400;

            return next( error );

        }

        const usuario = await Usuario.findOne({ email });

        if ( !usuario ) {

            const error = new Error( "Credenciales incorrectas" );

            error.status = 401;

            return next( error );

        }

        const coincide = await bcrypt.compare( password,usuario.password );

        if ( !coincide ) {

            const error = new Error( "Credenciales incorrectas" );

            error.status = 401;

            return next( error );

        }

        const token = jwt.sign(

            { id: usuario._id,email: usuario.email },

            process.env.JWT_SECRET,

            { expiresIn:"1h" }

        );

        res.status(200).json({

            mensaje:"Inicio de sesión exitoso",

            token

        });

    } catch (error) {

        next( error );

    }

};