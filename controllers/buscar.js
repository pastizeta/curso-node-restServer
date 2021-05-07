const { response } = require("express");
const { ObjectId } = require('mongoose').Types;
const { Usuario,Categoria,Producto } = require('../models');

const coleccionPermitidas=[
    'usuarios',
    'categorias',
    'productos',
    'roles'
];

const buscarProductos = async(termino='', res=response)=>{

    const esMongoID = ObjectId.isValid(termino); //TRUE

    if( esMongoID ){
        const producto = await Producto.findById(termino).populate('categoria','nombre');

        return res.json({
            results: ( producto ) ? [ producto ] : [] //regresa un arreglo de resultados 
        })
    }

    //busqueda por correo o nombre de categoria
    const regex = new RegExp( termino,'i' );

    const producto = await Producto.find({ nombre:regex, estado:true })
                                    .populate('categoria','nombre');     

    res.json({
        results: producto
    })
}

const buscarCategorias = async( termino = '',res = response) =>{

    const esMongoID = ObjectId.isValid(termino); //TRUE

    if( esMongoID ){
        const categoria = await Categoria.findById(termino);

        return res.json({
            results: ( categoria ) ? [ categoria ] : [] //regresa un arreglo de resultados 
        })
    }

    //busqueda por correo o nombre de categoria
    const regex = new RegExp( termino,'i' );

    const categoria = await Categoria.find({ nombre:regex ,estado:true });

    res.json({
        results: categoria
    })

}

const buscarUsuarios = async(termino = '',res = response)=>{

    //busqueda por ID de mongo
    //validar si es un ID de mongo lo que mandan
    const esMongoID = ObjectId.isValid(termino); //TRUE

    if( esMongoID ){
        const usuario = await Usuario.findById( termino );

        return res.json({
            results: ( usuario ) ? [ usuario ] : []
        })
    }

    //busqueda por correo o nombre de usuario
    const regex = new RegExp( termino,'i' );

    const usuarios = await Usuario.find({ 
        $or: [{ nombre: regex },{correo,regex}], //condicion or con mongo
        $and: [{ estado: true }]
        
    });

    res.json({
        results: usuarios
    })


}


const buscar =(req, res = response)=>{

    const { coleccion,termino } = req.params;

    if(!coleccionPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg: `Las colecciones permitidas son ${coleccionPermitidas}`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino,res)
            break;
    
        case 'categorias':
            buscarCategorias(termino,res)
            break;
        case 'productos':
            buscarProductos(termino,res)
            break;

        default:
            res.status(500).json({
                msg:`Se me olvido hacer esta busqueda`
            })
    }

}


module.exports = {
    buscar
}