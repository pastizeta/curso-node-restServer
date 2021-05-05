const {Router} = require('express');
const { check } = require('express-validator');
const { login,googleSignin } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const {tieneRole} = require('../middlewares')

const router = Router();

//un post por que manda el correo y al constraseña
router.post('/login',[
    check('correo','El correo es obligatorio').isEmail(),
    check('password','El password es obligatorio').not().isEmpty(),
    validarCampos
],login);


router.post('/google',[
    check('id_token','El id_token es necesario').not().isEmpty(),
    validarCampos
],googleSignin);



module.exports = router;