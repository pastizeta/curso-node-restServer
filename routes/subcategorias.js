const { Router } = require('express');
const { check } = require('express-validator');
const { existesubCategoria } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRol } = require('../middlewares');
const { getsubCategorias,
        getsubCategoriaID,
        crearsubCategoria,
        actualizarsubCategoria,
        borrarsubCategoria } = require('../controllers/subcategorias')

const router = Router();



//obtner todas las categorias - publico /paginar
router.get('/',getsubCategorias);


//Obtener una cateogoria en particular por id
//middle ware para validar ID que no exista
router.get('/:id',[
    check('id','no es un id valido').isMongoId(),
    check('id').custom(existesubCategoria), //db validators
    validarCampos
],getsubCategoriaID);


//Crear una nueva categoria - cualquier persona con un token valido
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],crearsubCategoria);


// Actualizar un registro por ID - cualquiera con token valido
router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id','no es un id valido').isMongoId(),
    check('id').custom(existesubCategoria),
    validarCampos
],actualizarsubCategoria);


// Borrar categoria solo si es admin, marcar estado de activo o inactvio
router.delete('/:id',[
    validarJWT,
    check('id','no es un id valido').isMongoId(),
    check('id').custom(existesubCategoria),
    esAdminRol,
    validarCampos
],borrarsubCategoria);


module.exports = router;