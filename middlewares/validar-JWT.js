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

        //verificar le token y obtener el uid del usuario verificado
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

        //se pone el usuario encontrado en la request para usarlo despues
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



