import jwt from "jsonwebtoken";

const verificarToken = (req,res,next) => {

    const token = req.header("Authorization");

    if (!token) {

        const error = new Error("Acceso denegado. Token no proporcionado.");

        error.status = 401;

        return next(error);

    }

    try {

        const usuario = jwt.verify(token,"clave_secreta");

        req.usuario = usuario;

        next();

    } catch (error) {

        const tokenError = new Error("Token inválido o expirado.");

        tokenError.status = 401;

        return next(tokenError);

    }

};

export default verificarToken;