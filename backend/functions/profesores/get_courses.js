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
        const { profesor_id } = req.body;

        if (!profesor_id) {
            return res.status(400).json({ error: "Se requiere el ID del profesor" });
        }

        // Consulta para obtener los cursos del profesor
        const [results] = await pool.execute(
            `SELECT c.* FROM cursos c
            INNER JOIN profesores_cursos pc ON c.id_curso = pc.id_curso
            WHERE pc.id_profesor = ?`,
            [profesor_id]
        );

        res.status(200).json(results);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Error en el servidor" });
    }
};