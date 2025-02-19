const mysql = require('mysql2/promise');
require('dotenv').config();

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;

module.exports = async (event, res) => {
    const pool = mysql.createPool({
            host,
            user,
            password,
            database
        });

    try {
        // Verifica que las variables de entorno estén configuradas
        if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
            console.error("Faltan variables de entorno para la configuración de la base de datos.");
            res.status(500).json({ error: "Error en la configuración del servidor." })
        }
        // Obtener el id del alumno desde el cuerpo de la solicitud
        const { id } = event.body;
        

        if (!id) {
            res.status(400).json({ error: 'Se requiere un id de alumno' })
        }

        // Obtener las materias del alumno
        const [materiasAlumno] = await pool.execute('SELECT * FROM alumnos_materias WHERE id_alumno = ?', [id]);

        if (materiasAlumno.length === 0) {
            res.status(404).json({ error: 'Alumno no encontrado o sin materias asignadas' })
        }

        const idMaterias = materiasAlumno.map(m => m.id_materia);

        // Obtener las materias con su respectivo curso
        const [materiasConCurso] = await pool.query(`
            SELECT m.id_materia, m.nombre AS nombre, c.id_curso, c.nombre AS curso
            FROM materias m
            JOIN cursos c ON m.id_curso = c.id_curso
            WHERE m.id_materia IN (?)
        `, [idMaterias]);

        if (materiasConCurso.length === 0) {
            res.status(404).json({ error: 'No se encontraron materias o cursos asociados' })
        }

        res.status(200).json(materiasConCurso)
    } catch (err) {
        console.error("Error ejecutando la consulta:", err);
        res.status(500).json({ error: 'Error ejecutando la consulta' })
    } finally {
        if (pool) await pool.end(); // Cerrar el pool de conexiones
    }
};