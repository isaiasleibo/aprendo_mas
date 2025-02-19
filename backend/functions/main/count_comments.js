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
        const { id_publicacion } = req.body;
        
        if (!id_publicacion) {
            return res.status(400).json({ message: "Se necesita un id_publicacion" });
        }

        // Consulta SQL para contar los comentarios con el id_publicacion proporcionado
        const [rows] = await pool.execute(
            "SELECT COUNT(*) AS cantidad_comentarios FROM comentarios WHERE id_publicacion = ?;",
            [id_publicacion]
        );

        if (rows.length > 0) {
            return res.status(200).json({ cantidad_comentarios: rows[0].cantidad_comentarios });
        } else {
            return res.status(404).json({ message: "No se encontraron comentarios para el id_publicacion proporcionado" });
        }
    } catch (error) {
        console.error("Error en la consulta:", error);
        return res.status(500).json({ message: "Hubo un error en la consulta" });
    }
};