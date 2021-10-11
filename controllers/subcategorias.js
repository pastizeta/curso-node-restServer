const { response } = require("express");
const { Subcategoria } = require('../models');



// obtener subcategorias  paginado - total - populate(mongoose)
const getsubCategorias = async(req, res = response) =>{

    const {limite=5,desde = 0} = req.query;
    const query = {estado:true}

    const [total,subcategorias] = await Promise.all([
        Subcategoria.countDocuments(query),
        Subcategoria.find(query)
        .populate('usuario','nombre')
        .skip(Number(desde))
        .limit(Number(limite))
    ]);


    res.json({
        total,
        subcategorias
    })
}

//obtener subcategoria - populate() regresar el objeto de la categoria
const getsubCategoriaID = async( req, res = response) =>{


    const {id} = req.params;

    const subcategoria = await Subcategoria.findById(id)
                                     .populate('usuario','nombre');

    res.json({subcategoria})
}

const crearsubCategoria = async(req, res = response) =>{
    
    //obtenermos el nombre que nos mandan en el body del req que es el JSON
    const nombre = req.body.nombre.toUpperCase();

    //validamos si ya existe una categoria con ese nombre
    const subcategoriaDB = await Subcategoria.findOne({nombre});


    if (subcategoriaDB){
        return res.status(400).json({
            msg:`La sub-categoria ${subcategoriaDB.nombre}, ya existe`
        });
    }

    //Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id //aqui se lee el id del token que puse le validador en el request que es el que esta logeado en este momento
    }

    const subcategoria = new Subcategoria(data);

    //guardar DB
    await subcategoria.save();

    //impresion de respuesta
    res.status(201).json(subcategoria);

}


const actualizarsubCategoria = async(req,res = response) =>{

    const  { id } = req.params;
    const { _id,usuario,estado,...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const subcategoriaBD = await Subcategoria.findOne({nombre: data.nombre});

    if(subcategoriaBD){
        if(subcategoriaBD._id != id ){
            return res.json({
                msg:`La categoria con nombre ${subcategoriaBD.nombre} ya existe`
            });
        }
    }

    const subcategoria = await Subcategoria.findByIdAndUpdate(id,data,{new:true}); //new:true manda como resultado el objeto actualizado

    res.json({
        subcategoria
    })

}

const borrarsubCategoria = async(req,res=response) =>{

    const {id} = req.params;

    //const subcategoria = await Subcategoria.findByIdAndUpdate(id,{estado:false},{new:true});
    const subcategoria = await Subcategoria.deleteOne({_id:id});
    res.json({ subcategoria })

}

module.exports = {
    crearsubCategoria,
    getsubCategoriaID,
    getsubCategorias,
    actualizarsubCategoria,
    borrarsubCategoria
}