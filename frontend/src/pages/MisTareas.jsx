import React, { useEffect, useState, useRef, useCallback } from 'react';
import Header from '../components/Header';
import FixedMenu from '../components/FixedMenu';
import '../scss/MisTareas.scss';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import Empty from '../components/Empty';

const serverURL = process.env.REACT_APP_SERVER_URL

const MisTareas = ({ id_curso, id_alumno }) => {
    const [tareas, setTareas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [moreLoading, setMoreLoading] = useState(false)
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const observerRef = useRef(null);

    const fetchTasks = useCallback(async () => {
        if (!hasMore) {
            setLoading(false)
            setMoreLoading(false)
            return
        };

        try {
            const response = await fetch(`${serverURL}/search_tasks`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_alumno, id_curso, page, limit: 10 }),
            });

            if (!response.ok) throw new Error('Error al cargar las tareas');

            const data = await response.json();
            setTareas(prev => [...prev, ...data]);
            setHasMore(data.length === 10);
        } catch (err) {
            console.error(err.message);
        } finally {
            setLoading(false);
            setMoreLoading(false)
        }
    }, [id_curso, page, hasMore, id_alumno]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setMoreLoading(true)
                setPage(prevPage => prevPage + 1);
            }
        }, { threshold: 1.0 });

        const observerTarget = document.getElementById("load-more-trigger");
        if (observerTarget) observerRef.current.observe(observerTarget);

        return () => observerRef.current?.disconnect();
    }, [loading]);

    return (
        <>
            <Header tareas />
            <div id="main-content">
                <FixedMenu tareas />
                {!loading ? tareas.length !== 0 && (<div id="tasks-container">
                    <div className="task-card">
                        <div id="main-task-header">
                            <div className="task-header">
                                <h2>Mis Tareas</h2>
                            </div>
                            <div className="reload">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M463.5 224l8.5 0c13.3 0 24-10.7 24-24l0-128c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8l119.5 0z" /></svg>
                                <span>Recargar</span>
                            </div>
                            <div className="task-legend">
                                <span className="not-evaluable">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" /></svg>
                                    <p>No Evaluable</p>
                                </span>
                                <span className="evaluable">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" /></svg>
                                    <p>Evaluable</p>
                                </span>
                            </div>
                        </div>
                        <div className="task-tabs">
                            <button className="tab active">Pendientes</button>
                            <button className="tab">Completadas</button>
                            <button className="tab">Todas</button>
                        </div>
                    </div>
                    <div className="task-container">
                        {tareas.map(t => {
                            const convertirFecha = fecha => {
                                const date = new Date(fecha);
                                const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
                                return `${date.getDate()} de ${meses[date.getMonth()]} del ${date.getFullYear()}`;
                            };

                            return (
                                <div key={t.id_publicacion} className={`task-item-2 ${t.evaluable === 1 ? "evaluable" : "not-evaluable"}`}>
                                    <h3>{t.titulo}</h3>
                                    <p>{t.nombre_materia} - {t.nombre_curso}</p>
                                    <p>Inicio: {convertirFecha(t.created_at)}</p>
                                    {t.fecha_limite && <p>Fin: {convertirFecha(t.fecha_limite)}</p>}
                                    <p>{t.evaluable === 1 ? "Evaluable" : "No evaluable"}</p>
                                    <p id='teacher'>{t.nombre_completo_profesor}</p>
                                    <Link to={`/tareas/${t.id_publicacion}`}>
                                        <button>Ver detalle</button>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                    {!loading && tareas && (<div id="load-more-trigger" style={{ height: "20px" }}>
                        {moreLoading ? <Loading /> : null}
                    </div>)}
                </div>) : <Loading />}

                {!loading && tareas.length === 0 && <Empty />}
            </div>
        </>
    );
};

export default MisTareas;
