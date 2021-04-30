
const {Router} = require('express');
const { check } = require('express-validator');


const{ validarCampos } = require('../middlewares/validar-campos');
const { usuariosGet,
        usuariosPost,
        usuariosPut,
        usuariosPatch,
        usuarioDelete} = require('../controllers/usuarios');
const {esRolevalido,emailExiste,existeUsuarioxID} = require('../helpers/db-validators');

const router = Router();

 //GET
router.get('/', usuariosGet)

router.post('/', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe ser mas de 6 letras').isLength({min:6}),
    check('correo','El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    //check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( esRolevalido  ),
    validarCampos
],usuariosPost)

router.put('/:id', [
    check('id','no es un id valido').isMongoId(),
    check('id').custom(existeUsuarioxID),
    check('rol').custom( esRolevalido  ),
    validarCampos
],usuariosPut)

router.delete('/:id', [
    check('id','no es un id valido').isMongoId(),
    check('id').custom(existeUsuarioxID),
    validarCampos
],usuarioDelete)

router.patch('/', usuariosPatch)

module.exports = router;


