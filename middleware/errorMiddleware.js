const errorHandler = ( err,req,res,next ) => {

    console.error( "ERROR:",err.message );

    if ( err.status === 400 ) {

        return res.status(400).json({mensaje:err.message || "Solicitud incorrecta"});

    }

    if ( err.status === 401 ) {

        return res.status(401).json({mensaje:err.message || "No autorizado"});

    }

    if ( err.status === 404 ) {

        return res.status(404).json({mensaje:err.message || "Recurso no encontrado"});

    }

    return res.status(500).json({mensaje:err.message || "Error interno del servidor"});

};

export default errorHandler;