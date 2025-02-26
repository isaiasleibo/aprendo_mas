import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import FixedMenu from '../../components/FixedMenu'
import '../../scss/ProfesoresHome.scss'
import { Link } from 'react-router-dom'

const serverURL = process.env.REACT_APP_SERVER_URL
const serverApiKey = process.env.REACT_APP_API_KEY

const ProfesoresHome = () => {
    const [courses, setCourses] = useState([])

    const getCourses = async () => {
        try {
            const response = await fetch(`${serverURL}/profesores/get_courses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ profesor_id: 1, api_key: serverApiKey })
            });

            const data = await response.json();

            if (response.ok) {
                setCourses(data);
            } else {
                console.error('Curso no encontrado:', data.error);
            }
        } catch (error) {
            console.error('Error al obtener el curso:', error);
        }
    }

    useEffect(() => {
        getCourses()
    }, [])

    return (
        <>
            <Header inicio />

            <div id="main-content">
                <FixedMenu inicio />

                <div id="select-course">
                    <h2>Seleccione un curso</h2>

                    {
                        courses.map((course, index) => (
                                <div id="card" key={index} className={`${index === 0 ? 'primero' : ''}${index === courses.length -1 ? 'ultimo' : ''}`}>
                                    <h3>{course.nombre}</h3>
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-right" className="svg-inline--fa fa-arrow-right " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path></svg>
                                </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default ProfesoresHome