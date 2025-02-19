import React, { useState, useEffect } from "react";
// import "../scss/Calificaciones.scss";
import Header from "../components/Header";
import FixedMenu from "../components/FixedMenu";
import Loading from "../components/Loading";
import Empty from "../components/Empty";
import { Link } from "react-router-dom";

const serverURL = process.env.REACT_APP_SERVER_URL
const serverApiKey = process.env.REACT_APP_API_KEY

const Calificaciones = ({ id }) => {
  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFetched, setIsFetched] = useState(false)

  const checkSubjects = async () => {
    try {
      const response = await fetch(`${serverURL}/search_subjects_with_score`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, api_key: serverApiKey })
      });

      const data = await response.json();

      if (response.ok) {
        setMaterias(data)
        setIsFetched(true)
      } else {
        console.error('Materias no encontradas:', data.error);
      }
    } catch (error) {
      console.error('Error al obtener las materias:', error);
    } finally {
      setLoading(false)
    }
  };

  if (!isFetched) {
    checkSubjects()
  }

  return (
    <>
      <Header calificaciones />
      <div id="main-content">
        <FixedMenu calificaciones />
        {loading ? (
          <Loading />
        ) : materias.length !== 0 ? (
          <div className="mis-materias">
            <h2>Mis Calificaciones</h2>
            {materias.map((materia, index) => (
              <Link key={index}>
                <div key={materia.id} className={`materia-card ${index === 0 ? "primero" : ""} ${index === materias.length - 1 ? "ultimo" : ""}`}>
                  <div className="materia-info">
                    <h3>{materia.nombre_materia}</h3>
                    <span>{materia.nombre_curso}</span>
                  </div>
                  <div className={`promedio ${(Math.round(materia.promedio_nota * 100) / 100) >= 6 ? 'aprobado' : 'desaprobado'}`}>{Math.round(materia.promedio_nota * 100) / 100}</div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <Empty />
        )}
      </div>
    </>
  );
};

export default Calificaciones;
