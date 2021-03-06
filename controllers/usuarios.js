const {response, request} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');


//crear funciones y exportarlas
const usuariosGet = async(req = request, res = response) => {

    const {limite=5,desde = 0} = req.query;

    const query = {estado:true}

    //find obtiene toda la coleccion que es el model de usuarios (PAGINACION)
    const [total,usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    

    res.json({
        total,
        usuarios
    })
}

//regresa un usuario por id
const usuarioGet= async(req = request,res = response) =>{

    const { id } = req.params;

    const usuario = await Usuario.findById(id);


    res.json({usuario})

}

const usuariosPost = async (req = request, res = response) => {

    const {nombre,correo,password,rol} = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });
    
    //encriptar la constraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);

    //guardar datos en DB
    await usuario.save();

    res.json({usuario})
}

const usuariosPut = async(req,  res = response) => {

    const  { id } = req.params;
    const {_id, password,google,correo, ...resto} = req.body;

    if (password){
        //encriptar la constraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password,salt);
    }

    //busca por id en el modelo y lo actualiza
    const usuario = await Usuario.findByIdAndUpdate(id,resto);

    res.json({
        msg: 'Put API - controlador',
        usuario
    })
}

const usuariosPatch = (req, res = response) => {
    res.json({
        ok:true,
        msg: 'Patch API - controlador'
    })
}


const usuarioDelete = async(req, res = response) => {

    const {id} = req.params;

    //borrado fisicamente
    //const usuario = await Usuario.findByIdAndDelete(id);

    //cambiando el estado del usuario (eliminado)
    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});
    //const usuarioAutenticado = req.usuario;


    res.json({usuario})
}


module.exports = {
    usuariosGet,
    usuarioGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuarioDelete
}