import Router from 'express'
const router = Router();


import usuariosRouter from './usuario.router'
import alimentosRouter from './alimentos.router'
import loginRouter from './login.router'

router.use('/Usuarios', usuariosRouter)
router.use('/Alimentos', alimentosRouter)
router.use('/Login', loginRouter)




export default router;