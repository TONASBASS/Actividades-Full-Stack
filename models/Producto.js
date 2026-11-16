import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({

    nombre: {

        type: String,

        required: true,

        trim: true

    },

    descripcion: {

        type: String,

        required: true,

        trim: true

    },

    categoria: {

        type: String,

        required: true,

        trim: true

    },

    precio: {

        type: Number,

        required: true,

        min: 0

    },

    stock: {

        type: Number,

        required: true,

        min: 0

    },

    imagen: {

        type: String,

        default: ""

    },

    fechaCreacion: {

        type: Date,

        default: Date.now

    }

});

const Producto = mongoose.model( "Producto",productoSchema );

export default Producto;