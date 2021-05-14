const {Router} = require('express');
const { check } = require('express-validator');

const { validarCampos,validarArchivoSubir } = require('../middlewares');
const { cargar_archivo, actualizarImagen, mostrarImagen,actualizarImagenCloudinary,mostrarImagenImagenCloudinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');

const router = Router();


//cargar archivo fisico al servidor de rest
router.post( '/' ,validarArchivoSubir, cargar_archivo )

//actualizar archivo fisico en cloudinary y actualizarlo en BD por ID y coleccion
router.put('/:coleccion/:id',[
    validarArchivoSubir,
    check('id','el id debe ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios','productos'] ) ),
    validarCampos
],actualizarImagenCloudinary)
//],actualizarImagen)

router.get('/:coleccion/:id',[
    check('id','el id debe ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios','productos'] ) ),
    validarCampos
],mostrarImagen)

module.exports = router;