const {response, request} = require('express');


//crear funciones y exportarlas
const usuariosGet = (req = request, res = response) => {

    const {q,nombre = 'no name',apikey } = req.query;

    res.json({
        msg: 'get API - controlador',
        q,nombre,apikey
    })
}

const usuariosPost = (req, res = response) => {

    const {nombre,edad} = req.body;

    res.json({
        msg: 'Post API - controlador',
        nombre,
        edad
    })
}

const usuariosPut = (req,  res = response) => {

    const  { id } = req.params

    res.json({
        msg: 'Put API - controlador',
        id
    })
}

const usuariosPatch = (req, res = response) => {
    res.json({
        ok:true,
        msg: 'Patch API - controlador'
    })
}


const usuarioDelete = (req, res = response) => {
    res.json({
        ok:true,
        msg: 'Delete API - controlador'
    })
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuarioDelete
}