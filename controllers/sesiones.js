const { response } = require('express');
const { Sesion } = require('../models');


const sesionGet = async(req = request, res = response) => {

    const { id } = req.params;

    const total = await Sesion.countDocuments({_id:id});
    

    res.json({
        total
    })
}


const cerrarSesion = async(req = request, res = response) =>{

    const { id } =  req.params;

    const sesion = await Sesion.findByIdAndDelete(id);

    res.json({
        sesion
    })
}

module.exports = {
    sesionGet,
    cerrarSesion
}