const mysql = require('mysql2/promise');
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

  const { id } = event.body;

  if (!id) {
    res.status(400).json({ message: "Se necesita un id de usuario" })
  }

  const queryMensajes = `
    SELECT DISTINCT
      CASE 
        WHEN emisor = ? THEN receptor 
        WHEN receptor = ? THEN emisor 
      END AS contacto_id
    FROM mensajes
    WHERE emisor = ? OR receptor = ?
    GROUP BY contacto_id;
  `;

  try {
    const [rows] = await pool.execute(queryMensajes, [id, id, id, id]);

    if (Array.isArray(rows) && rows.length > 0) {
      const contactos = rows.map(row => row.contacto_id);

      if (contactos.length === 0) {
        res.status(200).json([])
      }

      const queryAlumnos = `
        SELECT * FROM alumnos WHERE id_alumno IN (${contactos.map(() => '?').join(',')});`;

      const [alumnos] = await pool.execute(queryAlumnos, contactos);

      res.status(200).json(alumnos)
    } else {
      res.status(200).json([])
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Hubo un error en la consulta" })
  } finally {
    await pool.end();
  }
};