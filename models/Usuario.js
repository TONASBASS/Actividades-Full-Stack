import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({

    nombre: {

        type: String,

        required: true,

        trim: true

    },

    email: {

        type: String,

        required: true,

        unique: true,

        trim: true,

        lowercase: true

    },

    password: {

        type: String,

        required: true

    },

    fechaCreacion: {

        type: Date,

        default: Date.now

    }

});

const Usuario = mongoose.model( "Usuario",usuarioSchema );

export default Usuario;