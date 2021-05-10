const { response } = require('express');
const { Producto, Categoria } = require('../models');
const categoria = require('../models/categoria');
const ObjectId = require('mongoose').Types.ObjectId;


const getProductos= async(req, res = response) =>{

    const {limite =5, desde = 0} = req.query;
    const query = {estado:true}

    const [ total,productos ]  = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
        .populate('usuario','nombre')
        .populate('categoria','nombre')
        .populate('subcategoria','nombre')
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
        ...resto,
        nombre,
        usuario: req.usuario._id, //se obtiene el id del request que se asigno en el token valido 
        
    }

    const producto = new Producto(data);
    await producto.save();

    res.status(201).json({ producto })

}

const getProductoxID = async(req,res=response) =>{

    const { id } = req.params;

    const producto = await Producto.findById(id)
                            .populate('categoria','nombre')
                            .populate('usuario','nombre')
                            .populate('subcategoria','nombre');

    res.status(200).json({
        producto
    })

}

const actualizaProducto = async(req,res = response) =>{

    const { id } = req.params;
    const {_id,estado,usuario,...data} = req.body;


    if (data.nombre){
        data.nombre = data.nombre.toUpperCase();
    }

    if(data.precio){
        
        if(!Number(data.precio)){
            return res.json({
                msg:`El precio debe ser un numero`
            })
        }
    }
    
    if(data.categoria){

        if(ObjectId.isValid(data.categoria)){

            const categoriaDB = await Categoria.findById(data.categoria)

            if(!categoriaDB){
                return res.json({
                    msg:`La Categoria no es parte del catalogo`
                })
            }
        }else{
            return res.json({
                msg:`El ID de la Categoria no es valido`
            })
        }

        
    }

    data.usuario = req.usuario._id;
    
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

const getProductosxCategoria = async (req,res=response) =>{
    
    const { id } = req.params;

    const productos = await Producto.find( { categoria: ObjectId(id), estado:true } )
                                    .populate('categoria','nombre')
                                    .populate('subcategoria','nombre')
    
    res.json({
        results : ( productos ) ? [ productos ] : []
    })
}

const getProductosxsubcategoria = async( req, res = response) =>{
    
    const { id } = req.params;

    const productos = await Producto.find( { subcategoria: ObjectId(id), estado:true } )
                                    .populate('categoria','nombre')
                                    .populate('subcategoria','nombre')

    res.json({
        results : (productos) ? [ productos ] : []
    })                               

}


module.exports ={
    getProductos,
    crearProducto,
    getProductoxID,
    actualizaProducto,
    borrarProducto,
    getProductosxCategoria,
    getProductosxsubcategoria
}