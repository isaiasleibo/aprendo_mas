const mysql = require("mysql2/promise");
require("dotenv").config();

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

  // Recuperar los datos desde el cuerpo de la solicitud
  const { id_alumno, id_publicacion, comentario } = event.body;

  // Validar los datos
  if (!id_alumno || !id_publicacion || !comentario) {
    res.status(400).json({ message: "Se requieren id_alumno, id_publicacion y comentario" })
  }

  // Consulta SQL para insertar el comentario
  const queryInsertComentario = `
    INSERT INTO comentarios (id_publicacion, id_alumno, comentario) 
    VALUES (?, ?, ?);
  `;

  try {
    // Ejecutar la consulta para insertar el comentario
    await pool.execute(queryInsertComentario, [id_publicacion, id_alumno, comentario]);

    res.status(200).json({ message: "Comentario agregado exitosamente" })
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Hubo un error al insertar el comentario" })
  } finally {
    // Cerrar la conexión
    await pool.end();
  }
};