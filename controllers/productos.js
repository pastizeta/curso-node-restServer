const { response } = require('express');
const { Producto } = require('../models');


const getProductos= async(req, res = response) =>{

    const {limite =5, desde = 0} = req.query;
    const query = {estado:true}

    const [ total,productos ]  = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
        .populate('usuario','nombre')
        .populate('categoria','nombre')
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        productos
    })
}

const crearProducto = async(req,res=response)=>{

    const { estado,usuario,...resto } = req.body;

    const nombre = req.body.nombre.toUpperCase();

    const productoBD = await Producto.findOne({nombre});

    if (productoBD){
        return res.status(400).json({
            msg:`El Producto con el nombre ${productoBD.nombre} ya existe`
        })
    }

    const data = {
        nombre,
        usuario: req.usuario._id, //se obtiene el id del request que se asigno en el token valido 
        precio : resto.precio,
        categoria : resto.categoria,
        descripcion : resto.descripcion
    }

    const producto = new Producto(data);
    await producto.save();

    res.status(201).json({ producto })

}

const getProductoxID = async(req,res=response) =>{

    const { id } = req.params;

    const producto = await Producto.findById(id)
                            .populate('categoria','nombre')
                            .populate('usuario','nombre');

    res.status(200).json({
        producto
    })

}

const actualizaProducto = async(req,res = response) =>{

    const { id } = req.params;
    const {_id,estado,usuario,...data} = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const productoBD = await Producto.findOne({ nombre: data.nombre});

    if(productoBD){
        if(productoBD._id != id ){

            return res.json({
                msg:`El producto con nombre ${productoBD.nombre} ya existe con otro ID`
            })
        }
    }

    
    const producto = await Producto.findByIdAndUpdate(id,data,{new:true});

    res.json({
        producto
    })

}

const borrarProducto = async(req,res=response)=>{

   const { id } = req.params;

   const producto = await Producto.findByIdAndUpdate(id,{estado:false},{new:true})

   res.json({
       producto
   })

}

module.exports ={
    getProductos,
    crearProducto,
    getProductoxID,
    actualizaProducto,
    borrarProducto
}