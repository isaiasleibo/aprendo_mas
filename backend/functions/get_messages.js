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
  // Recuperar los IDs desde los parámetros de la consulta
  const { id1, id2 } = event.body;

  // Validar los IDs
  if (!id1 || !id2) {
    res.status(400).json({ message: "Se necesitan ambos IDs de usuario" })
  }

  // Consulta SQL para obtener los mensajes entre ambos IDs
  const queryMensajes = `
    SELECT *
    FROM mensajes
    WHERE (emisor = ? AND receptor = ?)
       OR (emisor = ? AND receptor = ?)
  `;

  try {
    // Ejecutar la consulta
    const [mensajes] = await pool.execute(queryMensajes, [id1, id2, id2, id1]);

    res.status(200).json(mensajes)
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Hubo un error en la consulta" })
  } finally {
    // Cerrar la conexión
    await pool.end();
  }
};
