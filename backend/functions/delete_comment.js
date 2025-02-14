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
        const { id_alumno, id_comentario } = req.body;
        
        if (!id_alumno || !id_comentario) {
            return res.status(400).json({ error: "Faltan parámetros obligatorios" });
        }

        // Ejecutamos la consulta de eliminación
        const [result] = await pool.execute(
            "DELETE FROM comentarios WHERE id_alumno = ? AND id_comentario = ?",
            [id_alumno, id_comentario]
        );

        return res.status(200).json({ 
            mensaje: result.affectedRows > 0 ? "Comentario eliminado" : "No se encontró el comentario" 
        });
    } catch (error) {
        console.error("Error en la consulta:", error);
        return res.status(500).json({ error: "Error en el servidor" });
    }
};
