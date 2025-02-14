const mysql = require("mysql2/promise");
require('dotenv').config();

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;

module.exports = async (event, res) => {
  // Crear conexión a la base de datos con pool
  const pool = mysql.createPool({
    host,
    user,
    password,
    database
  });

  try {
    // Parseamos el cuerpo de la solicitud
    const { id_publicacion } = event.body;

    if (!id_publicacion) {
      res.status(400).json({ error: "id_publicacion es requerido" })
    }

    // Ejecutamos la consulta con JOIN para obtener nombre y apellido del alumno
    const [results] = await pool.execute(
      `SELECT c.id_comentario, c.id_publicacion, c.id_alumno, c.comentario, c.created_at,
              a.nombre, a.apellido 
       FROM comentarios c
       JOIN alumnos a ON c.id_alumno = a.id_alumno
       WHERE c.id_publicacion = ?`,
      [id_publicacion]
    );

    res.status(200).json(results)
  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({ error: "Error en el servidor" })
  } finally {
    // Cerrar la conexión
    await pool.end();
  }
};
