import React, { useState } from "react";
import "../scss/MisMaterias.scss";
import Header from '../components/Header'
import FixedMenu from "../components/FixedMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Loading from "../components/Loading";
import Empty from "../components/Empty";
import { Link } from "react-router-dom";

const serverURL = process.env.REACT_APP_SERVER_URL
const serverApiKey = process.env.REACT_APP_API_KEY

const MisMaterias = ({ id }) => {
  const [materias, setMaterias] = useState([])
  const [isFetched, setIsFetched] = useState(false)
  const [loading, setLoading] = useState(true)

  const checkSubjects = async () => {
    try {
      const response = await fetch(`${serverURL}/search_subjects`, {
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
      <Header materias />

      <div id="main-content">
        <FixedMenu materias />

        {
          loading ? (<Loading />) : materias.length !== 0 && (
            <div className="mis-materias">
              <h2>Mis Materias</h2>
              {materias.map((materia, index) => (
                <Link to={`/materia/${materia.id_materia}`} key={index}>
                  <div className={`materia-card ${index === 0 ? "primero" : ""} ${index === materias.length - 1 ? "ultimo" : ""}`}>

                    <div className="materia-info">
                      <h3>{materia.nombre}</h3>
                      <span>{materia.curso}</span>
                    </div>

                    <FontAwesomeIcon icon={faArrowRight} />
                  </div>
                </Link>
              ))}
            </div>
          )
        }

        {!loading && materias.length === 0 && <Empty />}
      </div>
    </>
  );
};

export default MisMaterias;
