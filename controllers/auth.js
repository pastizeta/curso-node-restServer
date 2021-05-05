const {response, request} = require('express');
const Usuario = require('../models/usuario');
const {generarJWT} = require('../helpers/generar-JWT');
const bcryptjs = require('bcryptjs');
const { googleverify } = require('../helpers/google-verify');


const login = async(req = request, res = response) =>{


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


const googleSignin = async(req = request, res = response) =>{

    const {id_token} = req.body;

    const {correo,nombre,img} = await googleverify(id_token);


    //si ya existe en la BD
    let usuario = await Usuario.findOne({correo});

    if(!usuario){
        //tengo que crearlo si no existe el usuario que se esta logeando para asi poderle asignar un token nuestro en el login
        const data ={
            nombre,
            correo,
            password: ':P',
            img,
            google:true
        };

        usuario = new Usuario(data);
        await usuario.save();
    }

    //si el usuario en BD
    if (!usuario.estado){
        return res.status(401).json({
            msg:'hable con el adminsitrador -  Usuario Bloqueado'
        });
    }

    //generar el jwt del usuario crado con el mongo id, para tener ese token y sea valido en nuestra aplicacion 
    const token = await generarJWT(usuario.id);

    res.json({
        usuario,
        token
    })

    try {
        res.json({
            msg:'Todo OK Google signin'
        })
    } catch (error) {
        res.status(400).json({
            msg:'token de google no es valido'
        })
    }

   
}


module.exports = {
    login,
    googleSignin
}