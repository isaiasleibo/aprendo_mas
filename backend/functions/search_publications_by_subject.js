const mysql = require("mysql2/promise");
require("dotenv").config();

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
        if (!host || !user || !password || !database) {
            console.error("Faltan variables de entorno para la configuración de la base de datos.");
            res.status(500).json({ error: "Error en la configuración del servidor." })
        }

        const { id_alumno, id_curso, id_materia, page = 1, limit = 10 } = event.body || {};
        const offset = (page - 1) * limit;

        if (!id_alumno || !id_curso) {
            res.status(400).json({ error: "El ID del alumno y del curso son obligatorios." })
        }

        const getMaterias = async () => {
            const [results] = await pool.execute(
                "SELECT id_materia FROM alumnos_materias WHERE id_alumno = ?",
                [id_alumno]
            );
            return results.map(row => row.id_materia);
        };

        let materias = await getMaterias();

        if (id_materia) {
            if (!materias.includes(parseInt(id_materia))) {
                res.status(403).json({ error: "El alumno no está registrado en esta materia." })
            }
            materias = [id_materia];
        }

        if (materias.length === 0) {
            res.status(200).json([])
        }

        const getPublicaciones = async (materias) => {
            const [results] = await pool.query(
                `
                    SELECT 
                        p.*, 
                        m.nombre AS nombre_materia,
                        c.nombre AS nombre_curso,
                        CONCAT(prof.nombre, ' ', prof.apellido) AS nombre_completo_profesor
                    FROM publicaciones p
                    JOIN materias m ON p.id_materia = m.id_materia
                    JOIN cursos c ON p.id_curso = c.id_curso
                    JOIN profesores prof ON p.id_profesor = prof.id_profesor
                    WHERE p.id_curso = ? AND p.id_materia IN (?)
                    ORDER BY p.created_at DESC
                    LIMIT ? OFFSET ?
                `,
                [id_curso, materias, parseInt(limit), parseInt(offset)]
            );
            return results;
        };

        const publicaciones = await getPublicaciones(materias);

        res.status(200).json(publicaciones)
    } catch (error) {
        console.error("Error en la función:", error);
        res.status(500).json({ error: error.message || "Error inesperado en el servidor" })
    } finally {
        if (pool) await pool.end();
    }
};