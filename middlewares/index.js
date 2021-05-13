
const validaCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-JWT');
const validaRoles = require('../middlewares/validar-roles');
const validarArchivoSubir = require('../middlewares/validar-archivo');


module.exports = {
    ...validaCampos,
    ...validarJWT,
    ...validaRoles,
    ...validarArchivoSubir
}