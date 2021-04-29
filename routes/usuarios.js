
const {Router} = require('express');
const { usuariosGet,
        usuariosPost,
        usuariosPut,
        usuariosPatch,
        usuarioDelete} = require('../controllers/usuarios');

const router = Router();

 //GET
router.get('/', usuariosGet)

router.post('/', usuariosPost)

router.put('/:id', usuariosPut)

router.delete('/', usuarioDelete)

router.patch('/', usuariosPatch)




module.exports = router;


