import {pool} from '../db.js'

export const getEstudiante = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM estudiante')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error inesperado'
        })
    }
}

export const getEstudianteId = async (req, res) => {
    
    try {
        const [rows] = await pool.query('SELECT * FROM estudiante WHERE numeroCuenta = ?', [req.params.id])

        if (rows.length <= 0) return res.status(404).json({
        message: 'Estudiante no encontrado'
        })
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
        message: 'Ocurrio un error inesperado'
        })
    }
}

export const createEstudiante = async (req, res) => {
    const {fechaIngreso, idPersona} = req.body

    try {
        const [rows] = await pool.query('INSERT INTO estudiante(fechaIngreso, idPersona) VALUES (?, ?)', [fechaIngreso, idPersona])
        res.send({
            numeroCuenta: rows.insertId,
            fechaIngreso,
            idPersona
        })
    } catch (error) {
        return res.status(500).json({
        message: 'Ocurrio un error inesperado'
        })
    }
}


export const deleteEstudiante = async (req, res) => {
   try {
    const [result] = await pool.query('DELETE FROM estudiante WHERE numeroCuenta = ?', [req.params.id])

    if (result.affectedRows <= 0) return res.status(404).json({
        message: 'Estudiante no encontrado'
    })
    res.sendStatus(204)
   } catch (error) {
    return res.status(500).json({
    message: 'Ocurrio un error inesperado'
    })
   }
} 

export const updateEstudiante = async(req, res) => {
    const { id } = req.params
    const { fechaIngreso, idPersona } = req.body


    try {
        const [result] = await pool.query('UPDATE estudiante SET fechaIngreso = IFNULL(?, fechaIngreso), idPersona = IFNULL(?, idPersona) WHERE numeroCuenta = ?', [fechaIngreso, idPersona,id])

        console.log(result)

    if (result.affectedRows === 0) return res.status(404).json({
        message: 'Estudiante no encontrado'
    })

    const [rows] = await pool.query('SELECT * FROM estudiante WHERE numeroCuenta = ?', [id])
    res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
        message: 'Ocurrio un error inesperado'
        })
    }
    
}