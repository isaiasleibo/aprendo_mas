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
        if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
            console.error("Faltan variables de entorno para la configuración de la base de datos.");
            res.status(500).json({ error: "Error en la configuración del servidor." })
        }


        const { id_alumno, id_curso, startDate, endDate } = event.body || {};

        if (!id_alumno || !id_curso || !startDate || !endDate) {
            res.status(400).json ({ error: "El ID del alumno, el curso y las fechas de inicio y fin son obligatorios." })
        }

        const [materiasRows] = await pool.execute(
            `SELECT id_materia FROM alumnos_materias WHERE id_alumno = ?`,
            [id_alumno]
        );

        const materias = materiasRows.map(row => row.id_materia);

        if (materias.length === 0) {
            res.status(200).json([])
        }

        const placeholders = materias.map(() => "?").join(",");

        const [publicaciones] = await pool.query(
            `SELECT 
                p.*, 
                m.nombre AS nombre_materia,
                c.nombre AS nombre_curso,
                CONCAT(prof.nombre, ' ', prof.apellido) AS nombre_completo_profesor
            FROM publicaciones p
            JOIN materias m ON p.id_materia = m.id_materia
            JOIN cursos c ON p.id_curso = c.id_curso
            JOIN profesores prof ON p.id_profesor = prof.id_profesor
            WHERE p.id_curso = ? AND p.tipo = 'tarea'
            AND p.id_materia IN (${placeholders})
            AND (
                DATE(p.created_at) BETWEEN ? AND ?
                OR DATE(p.fecha_limite) BETWEEN ? AND ?
            )
            ORDER BY p.created_at DESC`,
            [id_curso, ...materias, startDate, endDate, startDate, endDate]
        );

        res.status(200).json(publicaciones)
    } catch (error) {
        console.error("Error en la función:", error);
        res.status(500).json({ error: error.message || "Error inesperado en el servidor" })
    } finally {
        if (pool) await pool.end();
    }
};