const { response } = require("express");
const Categoria = require('../models/categoria');
const Usuario = require("../models/usuario");

// obtener categorias  paginado - total - populate(mongoose)
const getCategorias = async(req, res = response) =>{

    const {limite=5,desde = 0} = req.query;
    const query = {estado:true}

    const [total,categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
        .populate('usuario','nombre')
        .skip(Number(desde))
        .limit(Number(limite))
    ]);


    res.json({
        total,
        categorias
    })
}

//obtener categoria - populate() regresar el objeto de la categoria
const getCategoriaID = async( req, res = response) =>{


    const {id} = req.params;

   await Categoria.findById(id,function(err,categoria){
       Usuario.populate(categoria,{path:'usuario',select:"nombre correo"},function(err,categoria){
            res.status(200).json({categoria})
       });
   });

}

const crearCategoria = async(req, res = response) =>{
    
    //obtenermos el nombre que nos mandan en el body del req que es el JSON
    const nombre = req.body.nombre.toUpperCase();

    //validamos si ya existe una categoria con ese nombre
    const categoriaDB = await Categoria.findOne({nombre});


    if (categoriaDB){
        return res.status(400).json({
            msg:`La categoria ${categoriaDB.nombre}, ya existe`
        });
    }

    //Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id //aqui se lee el id del token que es el que esta logeado en este momento
    }

    const categoria = new Categoria(data);

    //guardar DB
    await categoria.save();

    //impresion de respuesta
    res.status(201).json(categoria);

}

// actualizarCategoria recibiendo el nombre validar que el nuevo no existe

const actualizarCategoria = async(req,res = response) =>{

    const  { id } = req.params;
    const { nombre } = req.body;
    const { _id,usuario,...resto } = req.body;

    const categoriaBD = await Categoria.findOne({nombre});

    if(categoriaBD){
        return res.json({
            msg:`La categoria con nombre ${categoriaBD.nombre} ya existe`
        });
    }

    const categoria = await Categoria.findByIdAndUpdate(id,resto);

    res.json({
        categoria
    })

}

//Borrar Categoria - cambiar estado a false

const borrarCategoria = async(req,res=response) =>{

    const {id} = req.params;

    const categoria = await Categoria.findByIdAndUpdate(id,{estado:false});

    res.json({
        categoria
    })

}

module.exports = {
    crearCategoria,
    getCategoriaID,
    getCategorias,
    actualizarCategoria,
    borrarCategoria
}