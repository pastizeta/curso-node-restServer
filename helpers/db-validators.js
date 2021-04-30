const Role = require('../models/role');
const Usuario = require('../models/usuario');

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

module.exports = {
    esRolevalido,
    emailExiste,
    existeUsuarioxID
}