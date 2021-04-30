const {response} = require('express');
const Usuario = require('../models/usuario');
const {generarJWT} = require('../helpers/generar-JWT');
const bcryptjs = require('bcryptjs');


const login = async(req, res = response) =>{


    const {correo, password} = req.body;

    try {
        
        //varificar si el email existe
        const usuario = await Usuario.findOne({correo});
        if ( !usuario ){
            return res.status(400).json({
                msg:'Usuario/Password no son correctos - correo'
            });
        }

        //si el usuario esta activo
        if ( !usuario.estado ){
            return res.status(400).json({
                msg:'Usuario/Password no son correctos - Estado: false'
            });
        }


        //verificar la  contraseña
        //compareSync compara la constraseña en string normal con el hash de la BD (una maravilla)
        const validPassword = bcryptjs.compareSync(password,usuario.password);

        if (!validPassword){
            return res.status(400).json({
                msg:'Usuario/Password no son correctos - password'
            });
        }

        //generar el JWT
        const token = await generarJWT(usuario.id);
        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:'Hable con el adminsitrador'
        })
    }

  
}



module.exports = {
    login
}