import Router from 'express'
const router = Router();

import * as usuarioController from '../controllers/usuario.controller'
import { validarJwt } from '../middleware/validar-jwt';

router.get('/Saludo', usuarioController.Saludo)
router.get('/Get', usuarioController.getUser)
router.get('/GetDataUser', [validarJwt], usuarioController.getDataUsuario)
router.post('/Save', usuarioController.createUser)
router.put('/Update', [validarJwt], usuarioController.updateUser)
router.post('/UpdatePassword', [validarJwt], usuarioController.updatePassWordUser)




export default router;