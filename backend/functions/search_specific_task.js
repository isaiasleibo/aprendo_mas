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
        // Verifica que las variables de entorno estén configuradas
        if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
            console.error("Faltan variables de entorno para la configuración de la base de datos.");
            res.status(500).json({ error: "Error en la configuración del servidor." })
        }

        // Obtén los parámetros del query string o del cuerpo del evento
        const { id_publicacion, id_curso } = event.body || {};

        if (!id_publicacion || !id_curso) {
            res.status(400).json({ error: "Los parámetros 'id_publicacion' e 'id_curso' son obligatorios" })
        }

        // Función para consultar la base de datos
        const queryDatabase = async () => {
            const [results] = await pool.execute(
                `
                    SELECT 
                        p.id_publicacion,
                        p.id_materia,
                        p.titulo,
                        p.descripcion,
                        p.tipo,
                        p.fecha_limite,
                        p.created_at,
                        p.id_curso,
                        p.id_profesor,
                        p.evaluable,
                        m.nombre AS nombre_materia,
                        c.nombre AS nombre_curso,
                        CONCAT(prof.nombre, ' ', prof.apellido) AS nombre_completo_profesor
                    FROM publicaciones p
                    JOIN materias m ON p.id_materia = m.id_materia
                    JOIN cursos c ON p.id_curso = c.id_curso
                    JOIN profesores prof ON p.id_profesor = prof.id_profesor
                    WHERE p.id_publicacion = ? AND p.id_curso = ? AND p.tipo = 'tarea'
                `,
                [id_publicacion, id_curso]
            );
            return results;
        };

        // Ejecutar la consulta
        const results = await queryDatabase();

        res.status(200).json(results)
    } catch (error) {
        console.error("Error en la función:", error);

        res.status(500).json({ error: error.message || "Error inesperado en el servidor" })
    } finally {
        // Cerrar el pool de conexiones
        if (pool) await pool.end();
    }
};