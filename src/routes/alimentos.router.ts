import Router from 'express'
const router = Router();

import * as alimentosController from '../controllers/alimentos.controller'
import { validarJwt } from '../middleware/validar-jwt';

//router.get('/Saludo', alimentosController.Saludo)
router.get('/Get',  [validarJwt], alimentosController.getAlimentos)
router.get('/GetByIdUser/:id', [validarJwt], alimentosController.getAlimentosByIdUser)
router.post('/Save', [validarJwt], alimentosController.saveAlimentos)
router.put('/Update', [validarJwt], alimentosController.updateAlimento)
router.delete('/Delete/:id', [validarJwt], alimentosController.deleteAlimento)



export default router;