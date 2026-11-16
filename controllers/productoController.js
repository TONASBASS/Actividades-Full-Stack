import Producto from "../models/Producto.js";

// =========================
// OBTENER PRODUCTOS
// =========================

export const obtenerProductos = async ( req,res,next ) => {

    try {

        const productos = await Producto.find();

        res.status(200).json( productos );

    } catch (error) {

        next( error );

    }

};

// =========================
// OBTENER PRODUCTO POR ID
// =========================

export const obtenerProducto = async ( req,res,next ) => {

    try {

        const producto = await Producto.findById( req.params.id );

        if ( !producto ) {

            const error = new Error( "Producto no encontrado" );

            error.status = 404;

            return next( error );

        }

        res.status(200).json( producto );

    } catch (error) {

        next( error );

    }

};

// =========================
// CREAR PRODUCTO
// =========================

export const crearProducto = async ( req,res,next ) => {

    try {

        const { nombre,descripcion,categoria,precio,stock,imagen } = req.body;

        if ( !nombre || !descripcion || !categoria || precio === undefined || stock === undefined ) {

            const error = new Error( "Todos los campos obligatorios deben ser completados" );

            error.status = 400;

            return next( error );

        }

        const nuevoProducto = new Producto({

            nombre,
            descripcion,
            categoria,
            precio,
            stock,
            imagen

        });

        await nuevoProducto.save();

        res.status(201).json({

            mensaje:"Producto creado correctamente",

            producto:nuevoProducto

        });

    } catch (error) {

        next( error );

    }

};

// =========================
// ACTUALIZAR PRODUCTO
// =========================

export const actualizarProducto = async ( req,res,next ) => {

    try {

        const producto = await Producto.findByIdAndUpdate(

            req.params.id,

            req.body,

            { new:true,runValidators:true }

        );

        if ( !producto ) {

            const error = new Error( "Producto no encontrado" );

            error.status = 404;

            return next( error );

        }

        res.status(200).json({

            mensaje:"Producto actualizado correctamente",

            producto

        });

    } catch (error) {

        next( error );

    }

};

// =========================
// ELIMINAR PRODUCTO
// =========================

export const eliminarProducto = async ( req,res,next ) => {

    try {

        const producto = await Producto.findByIdAndDelete( req.params.id );

        if ( !producto ) {

            const error = new Error( "Producto no encontrado" );

            error.status = 404;

            return next( error );

        }

        res.status(200).json({

            mensaje:"Producto eliminado correctamente"

        });

    } catch (error) {

        next( error );

    }

};