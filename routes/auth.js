const {Router} = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

//un post por que manda el correo y al constraseña
router.post('/login',[
    check('correo','El correo es obligatorio').isEmail(),
    check('password','El password es obligatorio').not().isEmpty(),
    validarCampos
],login);



module.exports = router;