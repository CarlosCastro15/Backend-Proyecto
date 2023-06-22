import express from 'express'
import administradorRoutes from './routes/administrador.routes.js'
import estudiantesRoutes from './routes/estudiantes.routes.js'
import indexRoutes from './routes/index.routes.js'


const app = express()

//para poder leer json 
app.use(express.json())

//estamos usando las rutas creadas
app.use(indexRoutes)
app.use('/api', administradorRoutes)
app.use('/api', estudiantesRoutes)

app.use((req,res, next) => {
    res.status(404).json({
        message: 'No se encontro la ruta'
    })
})

app.listen(4000)
console.log('Server running on port 4000')