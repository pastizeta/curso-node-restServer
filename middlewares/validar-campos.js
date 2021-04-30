const { validationResult } = require('express-validator');


const validarCampos = ( req,res,next ) =>{
     //cacha los errores mandandos desde el routes
     const errors = validationResult(req);

     if ( !errors.isEmpty() ){
         return res.status(400).json(errors);
     }

     //si pasa hasta aqui sigue con el siguiente middleware
     next();
}




module.exports = {
    validarCampos
}