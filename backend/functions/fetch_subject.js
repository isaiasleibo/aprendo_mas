const mysql = require("mysql2/promise");
require("dotenv").config();

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;

const pool = mysql.createPool({
    host,
    user,
    password,
    database
});

module.exports = async (req, res) => {
    try {
        const { id_materia, id_curso } = req.body;

        if (!id_materia) {
            return res.status(400).json({ error: "El ID de la materia es obligatorio." });
        }

        // Obtener la materia
        const [materias] = await pool.execute(
            "SELECT * FROM materias WHERE id_materia = ?" + (id_curso ? " AND id_curso = ?" : ""),
            id_curso ? [id_materia, id_curso] : [id_materia]
        );

        if (materias.length === 0) {
            return res.status(404).json({ error: "Materia no encontrada." });
        }

        const materia = materias[0];

        // Obtener el nombre del curso si tiene id_curso
        let nombreCurso = null;
        if (materia.id_curso) {
            const [cursos] = await pool.execute(
                "SELECT nombre FROM cursos WHERE id_curso = ?",
                [materia.id_curso]
            );
            nombreCurso = cursos.length > 0 ? cursos[0].nombre : null;
        }

        return res.status(200).json({ ...materia, nombre_curso: nombreCurso });
    } catch (error) {
        console.error("Error en la función:", error);
        return res.status(500).json({ error: "Error inesperado en el servidor" });
    }
};
