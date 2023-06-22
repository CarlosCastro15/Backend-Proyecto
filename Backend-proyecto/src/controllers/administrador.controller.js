import {pool} from '../db.js'

export const getAdministrador = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM docente')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error inesperado'
        })
    }
}

export const getAdministradorId = async (req, res) => {
    
    try {
        const [rows] = await pool.query('SELECT * FROM docente WHERE idDocente = ?', [req.params.id])

        if (rows.length <= 0) return res.status(404).json({
        message: 'Administrador no encontrado'
        })
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
        message: 'Ocurrio un error inesperado'
        })
    }
}

export const createAdministrador = async (req, res) => {
    const {fechaIngreso, idPersona, cantidadMaximaClases, Rol} = req.body

    try {
        const [rows] = await pool.query('INSERT INTO docente(fechaIngreso, idPersona, cantidadMaximaClases, Rol) VALUES (?, ?, ?, ? )', [fechaIngreso, idPersona, cantidadMaximaClases, Rol])
        res.send({
            idDocente: rows.insertId,
            fechaIngreso,
            idPersona,
            cantidadMaximaClases,
            Rol
        })
    } catch (error) {
        return res.status(500).json({
        message: 'Ocurrio un error inesperado'
        })
    }
}


export const deleteAdministrador = async (req, res) => {
   try {
    const [result] = await pool.query('DELETE FROM docente WHERE idDocente = ?', [req.params.id])

    if (result.affectedRows <= 0) return res.status(404).json({
        message: 'Administrador no encontrado'
    })
    res.sendStatus(204)
   } catch (error) {
    return res.status(500).json({
    message: 'Ocurrio un error inesperado'
    })
   }
} 

export const updateAdministrador = async(req, res) => {
    const { id } = req.params
    const { fechaIngreso,idPersona,cantidadMaximaClases,Rol } = req.body


    try {
        const [result] = await pool.query('UPDATE docente SET fechaIngreso = IFNULL(?, fechaIngreso), idPersona = IFNULL(?, idPersona), cantidadMaximaClases = IFNULL(?, cantidadMaximaClases), Rol = IFNULL(?, Rol) WHERE idDocente = ?', [fechaIngreso, idPersona, cantidadMaximaClases, Rol,id])

        console.log(result)

    if (result.affectedRows === 0) return res.status(404).json({
        message: 'Administrador no encontrado'
    })

    const [rows] = await pool.query('SELECT * FROM docente WHERE idDocente = ?', [id])
    res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
        message: 'Ocurrio un error inesperado'
        })
    }
    
}
