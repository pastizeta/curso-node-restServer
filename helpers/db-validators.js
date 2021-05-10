const Categoria = require('../models/categoria');
const Role = require('../models/role');
const Usuario = require('../models/usuario');
const Producto = require('../models/producto');
const subCategoria = require('../models/subcategoria');

const esRolevalido = async(rol = '') =>{
    const existeRol = await Role.findOne({rol});

    if (!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la base de datos`)
    }
}


const emailExiste = async(correo = '') =>{

    //verificar si el correo existe
    const existeEmail = await Usuario.findOne({correo});
    if ( existeEmail ){
        throw new Error(`El correo ${correo} ya esta registrado`)
        
    }

}

const existeUsuarioxID = async(id) =>{

    //verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ){
        throw new Error(`El id: ${ id } no existe`)
        
    }

}

const existeCategoria = async(id) =>{

    //verificar si la categoria existe
    const existeCategoria = await Categoria.findById(id);

    if ( !existeCategoria ){
        throw new Error(`El id: ${ id } no existe`)
        
    }

}

const existesubCategoria = async(id) =>{

    //verificar si la categoria existe
    const existesubCategoria = await subCategoria.findById(id);

    if ( !existesubCategoria ){
        throw new Error(`El id (sub-categoria): ${ id } no existe`)
        
    }

}

const existeProductoxID = async(id) =>{

    const existeProducto = await Producto.findById(id);

    if(!existeProducto){
        throw new Error(`El id ${ id } no existe`)
    }
}

module.exports = {
    esRolevalido,
    emailExiste,
    existeUsuarioxID,
    existeCategoria,
    existeProductoxID,
    existesubCategoria
}