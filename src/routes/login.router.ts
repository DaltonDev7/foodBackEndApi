import Router from 'express'
const router = Router();

import * as authenticationController from '../controllers/authentication.controller'



router.post('/SignIn', authenticationController.SignIn)





export default router;