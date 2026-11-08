const errorHandler = (err,req,res,next) => {

    console.error("ERROR:",err.message);

    // Error 400
    if (err.status === 400) {

        return res.status(400).json({
            mensaje: err.message || "Solicitud incorrecta"
        });

    }

    // Error 401
    if (err.status === 401) {

        return res.status(401).json({
            mensaje: err.message || "No autorizado"
        });

    }

    // Error 404
    if (err.status === 404) {

        return res.status(404).json({
            mensaje: err.message || "Recurso no encontrado"
        });

    }

    // Error 500
    return res.status(500).json({
        mensaje: err.message || "Error interno del servidor"
    });

};

export default errorHandler;