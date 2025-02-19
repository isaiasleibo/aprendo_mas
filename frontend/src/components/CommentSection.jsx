import React, { useEffect, useState } from 'react';
import '../scss/CommentSection.scss';
import Loading from '../components/Loading';

const serverURL = process.env.REACT_APP_SERVER_URL
const serverApiKey = process.env.REACT_APP_API_KEY

const CommentSection = ({ data, comment, id_alumno, deleteComment }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [comentario, setComentario] = useState('');

    const fetchComments = () => {
        setLoading(true)
        fetch(`${serverURL}/get_comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_publicacion: data.id, api_key: serverApiKey })
        })
            .then(response => response.json())
            .then(comments => {
                setComments(comments.length === 0 ? [] : comments);
            })
            .catch(error => {
                console.error('Error fetching comments:', error);
                setComments([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }


    useEffect(() => {
        setLoading(true);
        fetch(`${serverURL}/get_comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_publicacion: data.id, api_key: serverApiKey })
        })
            .then(response => response.json())
            .then(comments => { setComments(comments.length === 0 ? [] : comments); data.obtenerCantidadComentarios() })
            .catch(error => {
                console.error('Error fetching comments:', error);
                setComments([]);
            })
            .finally(() => setLoading(false));

    }, [data]);

    const handleSubmit = async () => {
        if (!comentario.trim()) return;

        try {
            const response = await fetch(`${serverURL}/insert_comment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id_publicacion: data.id,
                    comentario,
                    id_alumno, 
                    api_key: serverApiKey
                })
            });

            if (!response.ok) throw new Error('Error al enviar el comentario');
            fetchComments() // Agrega el nuevo comentario a la lista
            setComentario('');
            data.obtenerCantidadComentarios()
        } catch (error) {
            console.error('Error al enviar comentario:', error);
        }
    };

    const ComentariosEmpty = () => (
        <div id="comments-empty">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M208 352c114.9 0 208-78.8 208-176S322.9 0 208 0S0 78.8 0 176c0 38.6 14.7 74.3 39.6 103.4c-3.5 9.4-8.7 17.7-14.2 24.7c-4.8 6.2-9.7 11-13.3 14.3c-1.8 1.6-3.3 2.9-4.3 3.7c-.5 .4-.9 .7-1.1 .8l-.2 .2s0 0 0 0s0 0 0 0C1 327.2-1.4 334.4 .8 340.9S9.1 352 16 352c21.8 0 43.8-5.6 62.1-12.5c9.2-3.5 17.8-7.4 25.2-11.4C134.1 343.3 169.8 352 208 352zM448 176c0 112.3-99.1 196.9-216.5 207C255.8 457.4 336.4 512 432 512c38.2 0 73.9-8.7 104.7-23.9c7.5 4 16 7.9 25.2 11.4c18.3 6.9 40.3 12.5 62.1 12.5c6.9 0 13.1-4.5 15.2-11.1c2.1-6.6-.2-13.8-5.8-17.9c0 0 0 0 0 0s0 0 0 0l-.2-.2c-.2-.2-.6-.4-1.1-.8c-1-.8-2.5-2-4.3-3.7c-3.6-3.3-8.5-8.1-13.3-14.3c-5.5-7-10.7-15.4-14.2-24.7c24.9-29 39.6-64.7 39.6-103.4c0-92.8-84.9-168.9-192.6-175.5c.4 5.1 .6 10.3 .6 15.5z" /></svg>
            <p>No hay comentarios</p>
        </div>
    );

    return (
        <div id="comment-section">
            <div className={`comments-container ${loading ? 'comments-container-loading' : ''}`}>
                {loading ? (<Loading />) : (
                    <>
                        <div id="top-bar">
                            <p>Comentarios ({comments.length})</p>
                            <svg onClick={() => comment(null)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
                        </div>

                        {comments.length === 0 ? <ComentariosEmpty /> : (
                            <div id="comments">
                                {comments.map((c, index) => {
                                    const fecha = new Date(c.created_at);
                                    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

                                    return (
                                        <div className="comment" key={index}>
                                            <div className="avatar">
                                                <img src={require('../img/persona.webp')} alt="" />
                                            </div>
                                            <div className="content">
                                                <div className="data">
                                                    <p className='username'>{c.nombre} {c.apellido}</p>
                                                    <p>{c.comentario}</p>
                                                    <p className='date'>{fecha.getDate()} de {meses[fecha.getMonth()]} de {fecha.getFullYear()} a las {fecha.getHours()}:{fecha.getMinutes()}</p>
                                                </div>
                                                {c.id_alumno === id_alumno && <svg onClick={() => deleteComment({id_alumno, id_comentario: c.id_comentario, fetchComments})} className='delete-comment' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        <div id="write-comment">
                            <textarea placeholder='Escribe un comentario' value={comentario} onChange={(e) => setComentario(e.target.value)}></textarea>
                            <button onClick={handleSubmit}>Enviar</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default CommentSection;
