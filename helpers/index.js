const dbSesion     = require('./db-sesion');
const generarJWT   = require('./generar-JWT');
const googleVerify = require('./google-verify');
const dbValidators = require('./db-validators');
const subirArchivo = require('./subir-archivo');



module.exports= {
    ...dbSesion,    
    ...generarJWT , 
    ...googleVerify,
    ...dbValidators,
    ...subirArchivo
}
