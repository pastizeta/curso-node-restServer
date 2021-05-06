const { Router } = require('express');
const { check } = require('express-validator');

const { getProductos, 
        crearProducto,
        getProductoxID,
        actualizaProducto,
        borrarProducto } = require('../controllers/productos');

const { validarJWT, validarCampos, esAdminRol } = require('../middlewares');
const { existeCategoria,existeProductoxID } = require('../helpers/db-validators');


const router = new Router();

//obtiene lista de productos - acceso publico
router.get('/',getProductos);

//obitiene un producto por id - middleware para validar id de producto que no existe
router.get('/:id',[
    check('id','no es un id de Mongo valido').isMongoId(),
    check('id').custom(existeProductoxID),
    validarCampos
],getProductoxID)

//inserta un nuevo producto en BD solo tendran acceso con token valido
router.post('/',[
    validarJWT,
    check('nombre','El nombre del producto es obligatorio').not().isEmpty(),
    check('precio','El precio es obligatorio').not().isEmpty(),
    check('precio','El precio debe ser un numero').isNumeric(),
    check('categoria','El id de la categoria no es un id de mongo valido').isMongoId(),
    check('categoria').custom(existeCategoria),
    check('descripcion','La descripcion es obligatoria').not().isEmpty(),
    validarCampos
],crearProducto);

//Modifica un producto por id - validacion por token y adminsitrador
router.put('/:id',[
    validarJWT,
    check('id','no es un id de Mongo valido').isMongoId(),
    check('id').custom(existeProductoxID),
    check('nombre','El nombre del producto es obligatorio').not().isEmpty(),
    check('precio','El precio es obligatorio').not().isEmpty(),
    check('precio','El precio debe ser un numero').isNumeric(),
    check('categoria','El id de la categoria no es un id de mongo valido').isMongoId(),
    check('categoria').custom(existeCategoria),
    check('descripcion','La descripcion es obligatoria').not().isEmpty(),
    esAdminRol,
    validarCampos
],actualizaProducto)


router.delete('/:id',[
    validarJWT,
    check('id','no es un id de Mongo valido').isMongoId(),
    check('id').custom(existeProductoxID),
    esAdminRol,
    validarCampos
],borrarProducto)

module.exports = router;