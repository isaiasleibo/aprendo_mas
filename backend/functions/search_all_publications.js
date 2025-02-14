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
        database,
    });

    try {
        // Verificar que las variables de entorno estén configuradas correctamente

        // Crear el pool de conexione

        const body = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
        const { id_alumno, id_curso, page = 1, limit = 10 } = body;
        const offset = (page - 1) * limit;

        if (!id_alumno || !id_curso) {
            res.status(400).json({ error: "El ID del alumno y del curso son obligatorios." })
        }

        // Función para obtener las materias en las que el alumno está registrado
        const getMaterias = async () => {
            const [results] = await pool.execute(
                "SELECT id_materia FROM alumnos_materias WHERE id_alumno = ?",
                [id_alumno]
            );
            return results.map(row => row.id_materia);
        };

        // Obtener las materias del alumno
        const materias = await getMaterias();

        if (materias.length === 0) {
            res.status(200).json([])
        }

        // Función para obtener publicaciones filtradas por curso y materias
        const getPublicaciones = async (materias) => {
            if (materias.length === 0) {
                return [];
            }

            const placeholders = materias.map(() => "?").join(",");
            const query = `
            SELECT 
                p.*, 
                m.nombre AS nombre_materia,
                c.nombre AS nombre_curso,
                CONCAT(prof.nombre, ' ', prof.apellido) AS nombre_completo_profesor
            FROM publicaciones p
            JOIN materias m ON p.id_materia = m.id_materia
            JOIN cursos c ON p.id_curso = c.id_curso
            JOIN profesores prof ON p.id_profesor = prof.id_profesor
            WHERE p.id_curso = ? AND p.id_materia IN (${placeholders})
            ORDER BY p.created_at DESC
            LIMIT ? OFFSET ?
            `;

            const params = [id_curso, ...materias, parseInt(limit), parseInt(offset)];

            const [results] = await pool.query(query, params); 
            return results;
        };



        // Obtener las publicaciones del alumno según las materias
        const publicaciones = await getPublicaciones(materias);

        res.status(200).json(publicaciones)
    } catch (error) {
        console.error("Error en la función:", error);
        res.status(500).json({ error: error.message || "Error inesperado en el servidor" })
    } finally {
        // Cerrar la conexión del pool
        if (pool) await pool.end();
    }
};
