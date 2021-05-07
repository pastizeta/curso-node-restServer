const { Router } = require('express');
const { validarJWT } = require('../middlewares');
const { sesionGet,cerrarSesion } = require('../controllers/sesiones');


const router = Router();

//GET sesiones por id usuario
router.get('/:id',[
    validarJWT
], sesionGet)


router.delete('/:id',[
    validarJWT
],cerrarSesion)

module.exports = router;