import {Router} from 'express'
import {getEstudiante,getEstudianteId,createEstudiante,updateEstudiante,deleteEstudiante} from '../controllers/estudiantes.controller.js'

const router = Router()

router.get('/estudiante', getEstudiante)

router.get('/estudiante/:id', getEstudianteId)

router.post('/estudiante', createEstudiante)

router.patch('/estudiante/:id', updateEstudiante)

router.delete('/estudiante/:id', deleteEstudiante)

export default router 