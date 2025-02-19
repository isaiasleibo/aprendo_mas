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
        const { usuario, contrasena } = req.body;

        // Usar el pool para ejecutar la consulta
        const [results] = await pool.execute(
            "SELECT * FROM profesores WHERE usuario = ? AND contrasena = ?",
            [usuario, contrasena]
        );

        res.status(200).json(results.length > 0 ? results[0] : { error: "Datos incorrectos." });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Error en el servidor" });
    }
};