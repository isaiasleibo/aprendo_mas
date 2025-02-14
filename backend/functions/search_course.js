const mysql = require("mysql2/promise");
require("dotenv").config();

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;

module.exports = async (req, res) => {
    const pool = mysql.createPool({
        host,
        user,
        password,
        database
    });

    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ error: "Se requiere un id de alumno" });
        }

        // Obtener el alumno con el id recibido
        const [alumno] = await pool.execute(
            "SELECT * FROM alumnos_cursos WHERE id_alumno = ?",
            [id]
        );

        if (alumno.length === 0) {
            return res.status(404).json({ error: "Alumno no encontrado" });
        }

        // Obtener el id_curso del alumno
        const idCurso = alumno[0].id_curso;

        // Buscar el curso correspondiente con el id_curso
        const [curso] = await pool.execute(
            "SELECT * FROM cursos WHERE id_curso = ?",
            [idCurso]
        );

        if (curso.length === 0) {
            return res.status(404).json({ error: "Curso no encontrado" });
        }

        return res.status(200).json(curso[0]);
    } catch (err) {
        console.error("Error en la consulta:", err);
        return res.status(500).json({ error: "Error ejecutando la consulta" });
    }
};
