const { Sesion } = require('../models');
const ObjectId = require('mongoose').Types.ObjectId;

const insertaSesion = (usuario,token) =>{
    return new Promise (async(resolve,reject) =>{
        //buscamos si existe el usuario en el schema para borrarlo y sustituirlo
        usuario = ObjectId(usuario);
        console.log(usuario);
        const sesionExiste = await Sesion.findOne({usuario});

        console.log(sesionExiste);
        if(sesionExiste){
            //se borra sesion
            await Sesion.findByIdAndDelete(sesionExiste._id);
        }

        try {
             //insertar sesion
            const sesion = new Sesion({ usuario, token });
            await sesion.save();

            resolve(sesion);
        } catch (error) {
            console.log(error);
            reject(error);
        }
       
    })
}


module.exports = {
    insertaSesion
}