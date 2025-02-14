import React, { useEffect, useState, useCallback } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import Error404 from './pages/Error404'
import Home from './pages/Home'
import MisMaterias from './pages/MisMaterias'
import MisTareas from './pages/MisTareas'
import Calendario from './pages/Calendario'
import Login from './pages/Login'
import Mensajes from './pages/Mensajes'
import TareaDetalle from './pages/TareaDetalle'
import './App.scss'
import Loading from './components/Loading'
import SubjectHome from './pages/SubjectHome'

const App = () => {
  const [user, setUser] = useState();
  const [course, setCourse] = useState(null);
  const savedUser = localStorage.getItem('usuario');
  const savedPassword = localStorage.getItem('contraseña');
  const [hasAutoLogged, setHasAutoLogged] = useState(false);
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();

  const handleLogin = async (e, doc, pass) => {
    if (e) e.preventDefault();

    const loginData = { usuario: doc, contrasena: pass };

    try {
      const response = await fetch("http://localhost:3000/check_student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (data.usuario) {
        setUser(data);
      } else {
        navigate("/login")
        console.error("No se pudo iniciar sesión automáticamente. Datos incorrectos o conexión perdida.");
      }
    } catch (error) {
      navigate("/login")
      console.error("Error al hacer la solicitud:", error);
    } finally {
      setLoading(false)
    }
  };

  // Lógica para auto-login
  useEffect(() => {
    if (savedPassword && savedUser && !hasAutoLogged) {
      setHasAutoLogged(true);
      handleLogin(null, savedUser, savedPassword);
    } else if (!hasAutoLogged) {
      setLoading(false);
      navigate("/login")
    }
  }, [savedPassword, savedUser, hasAutoLogged]);
  

  const checkCourse = useCallback(async () => {
    if (user) {
      try {
        const response = await fetch('http://localhost:3000/search_course', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: user.id_alumno })
        });

        const data = await response.json();

        if (response.ok) {
          setCourse(data);
        } else {
          console.error('Curso no encontrado:', data.error);
        }
      } catch (error) {
        console.error('Error al obtener el curso:', error);
      }
    }
  }, [user]);  // `checkCourse` ahora depende de `user`

  useEffect(() => {
    if (user) {
      checkCourse(); // Llamamos a la función solo cuando `user` esté disponible
    }
  }, [checkCourse, user]);


  return (
    !loading ? (
      <Routes>
      {user && course ? (<>
        <Route path="/login" element={<Navigate to="/" />} />
        <Route path='/' element={<Home id_curso={course.id_curso} id_alumno={user.id_alumno} />} />
        <Route path='/materias' element={<MisMaterias id={user.id_alumno} />} />
        <Route path='/tareas' element={<MisTareas id_curso={course.id_curso} id_alumno={user.id_alumno} />} />
        <Route path='/calendario' element={<Calendario id_curso={course.id_curso} id_alumno={user.id_alumno} />} />
        <Route path='/mensajes' element={<Mensajes id={user.id_alumno} />} />
        <Route path='/tareas/:id_tarea' element={<TareaDetalle course={course} id_alumno={user.id_alumno} />} />
        <Route path='/materia/:id_materia' element={<SubjectHome id_alumno={user.id_alumno} id_curso={course.id_curso} />} />
        <Route path='*' element={<Error404 />} />
      </>
      ) : (
        <>
          <Route path='/login' element={<Login setUser={setUser} />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
    ) : (
      <Loading />
    )
  )
}

export default App
