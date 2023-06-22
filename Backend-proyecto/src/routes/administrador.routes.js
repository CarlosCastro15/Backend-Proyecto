import {Router} from 'express'
import {getAdministrador,createAdministrador,updateAdministrador,deleteAdministrador,getAdministradorId} from '../controllers/administrador.controller.js'

const router = Router()

router.get('/administrador', getAdministrador)

router.get('/administrador/:id', getAdministradorId)

router.post('/administrador', createAdministrador)

router.patch('/administrador/:id', updateAdministrador)

router.delete('/administrador/:id', deleteAdministrador)

export default router 