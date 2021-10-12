const { response } = require("express");
const Categoria = require('../models/categoria');
const Usuario = require("../models/usuario");

// obtener categorias  paginado - total - populate(mongoose)
const getCategorias = async(req, res = response) =>{

    const {limite=5,desde = 0} = req.query;
    //const query = {estado:true}
    const query = {}

    const [total,categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
        .populate('usuario','nombre')
        .populate('subcategorias')
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

    const categoria = await Categoria.findById(id)
                                     .populate('usuario','nombre')
                                     .populate('subcategorias','nombre','estado');

    res.json({categoria})
}

const crearCategoria = async(req, res = response) =>{
    
    //obtenermos el nombre que nos mandan en el body del req que es el JSON
    const nombre = req.body.nombre.toUpperCase();
    const { subcategorias } = req.body;

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
        usuario: req.usuario._id, //aqui se lee el id del token que puse le validador en el request que es el que esta logeado en este momento
        subcategorias
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
    const { _id,usuario,...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoriaBD = await Categoria.findOne({nombre: data.nombre});

    if(categoriaBD){
        if(categoriaBD._id != id ){
            return res.json({
                msg:`La categoria con nombre ${categoriaBD.nombre} ya existe`
            });
        }
    }

    const categoria = await Categoria.findByIdAndUpdate(id,data,{new:true}); //new:true manda como resultado el objeto actualizado

    res.json({
        categoria
    })

}

//Actualiza estado Categoria
const actualizarEstadoCategoria = async(req,res = response) =>{
    const  { id } = req.params;
    const { estado } = req.body;

    const categoriaBD = await Categoria.findOne({_id: id})

    if(categoriaBD){

        const categoria = await Categoria.findByIdAndUpdate(id,{estado},{new:true});

        res.json({
            categoria
        })
    }else{
        return res.json({
            msg:`La categoria con id ${categoriaBD._id} no existe`
        });
    }

   
}

//Borrar Categoria - cambiar estado a false
const borrarCategoria = async(req,res=response) =>{

    const {id} = req.params;

    const categoria = await Categoria.findByIdAndUpdate(id,{estado:false},{new:true});
    //const categoria = await Categoria.deleteOne({_id:id});

    res.json({ categoria })

}

module.exports = {
    crearCategoria,
    getCategoriaID,
    getCategorias,
    actualizarCategoria,
    borrarCategoria,
    actualizarEstadoCategoria
}