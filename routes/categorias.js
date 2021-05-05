const {Router} = require('express');
const { check } = require('express-validator');

const { validarJWT,validarCampos,esAdminRol } = require('../middlewares');
const { crearCategoria,getCategoriaID,getCategorias,actualizarCategoria,borrarCategoria } = require('../controllers/categorias');
const { existeCategoria } = require('../helpers/db-validators');

const router = Router();

/*
    /api/categorias
*/

//obtner todas las categorias - publico /paginar
router.get('/',getCategorias);


//Obtener una cateogoria en particular por id
//middle ware para validar ID que no exista
router.get('/:id',[
    check('id','no es un id valido').isMongoId(),
    check('id').custom(existeCategoria), //db validators
    validarCampos
],getCategoriaID);


//Crear una nueva categoria - cualquier persona con un token valido
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],crearCategoria);


// Actualizar un registro por ID - cualquiera con token valido
router.put('/:id',[
    validarJWT,
    check('id','no es un id valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
],actualizarCategoria);


// Borrar categoria solo si es admin, marcar estado de activo o inactvio
router.delete('/:id',[
    validarJWT,
    check('id','no es un id valido').isMongoId(),
    check('id').custom(existeCategoria),
    esAdminRol,
    validarCampos
],borrarCategoria);


module.exports = router;