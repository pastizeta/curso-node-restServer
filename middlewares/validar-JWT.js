const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async(req = request,res = response,next) =>{

    //obtener el token de los headers, esto lo tienen que enviar desde el frontend
    const token = req.header('x-token');

    if (!token){
        return res.status(401).json({
            msg:'no hay token en la peticion'
        })
    }

    try {
        const {uid} = jwt.verify(token,process.env.SECRETORPRIVATEKEY);
        

        //leer el usuario que corresponde al uid
        const usuario = await Usuario.findById(uid);


        if (!usuario){
            return res.status(401).json({
                msg:'token no valido -usuario no existe en la BD'
            })
        }

        //preguntar si el usuario no esta inactivo
        if (!usuario.estado){
            return res.status(401).json({
                msg:'token no valido - usuario con estado: false'
            })
        }

        req.usuario = usuario;

        next();
    } catch (error) {
        res.status(401).json({
            msg:'token no valido'
        })
    }

}


module.exports = {
    validarJWT
}



