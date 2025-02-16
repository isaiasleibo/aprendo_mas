import React, { useState, useRef } from 'react';
import Header from '../components/Header';
import FixedMenu from '../components/FixedMenu';
import '../scss/TareaDetalle.scss';
import { useParams } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import Loading from '../components/Loading'
import Error404 from '../pages/Error404'
import DeleteTaskComment from '../components/DeleteTaskComment';

const serverURL = process.env.REACT_APP_SERVER_URL

const TareaDetalle = ({ course, id_alumno }) => {
  const { id_tarea } = useParams();
  const [publication, setPublication] = useState(null);
  const editorRef = useRef(null); // Referencia para el editor
  const [isFetched, setIsFetched] = useState(false)
  const [commentsFetched, setCommentsFetched] = useState(false)
  const [loading, setLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('enunciado');
  const [comments, setComments] = useState([])
  const [selectedComment, setSelectedComment] = useState()
  const [comentario, setComentario] = useState('')

  const fetchPublicacion = async () => {
    try {
      const response = await fetch(`${serverURL}/search_specific_task`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_publicacion: id_tarea,
          id_curso: course.id_curso
        })
      });

      if (!response.ok) {
        throw new Error('Error al obtener la publicación');
      }

      const data = await response.json();
      setPublication(data);
      setIsFetched(true);
    } catch (error) {
      console.error('Error en el fetch:', error);
    } finally {
      setLoading(false);
    }
  };


  async function getComments() {
    try {
      const response = await fetch(`${serverURL}/get_comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_publicacion: id_tarea })
      });

      const comments = await response.json();
      setComments(comments.length === 0 ? [] : comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setComments([]);
    } finally {
      setCommentsFetched(true);
      setCommentsLoading(false);
    }
  }

  const handleSubmit = async () => {
    if (!comentario.trim()) return;

    try {
      const response = await fetch(`${serverURL}/insert_comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_publicacion: id_tarea,
          comentario,
          id_alumno
        })
      });

      if (!response.ok) throw new Error('Error al enviar el comentario');
      setComentario('');
    } catch (error) {
      console.error('Error al enviar comentario:', error);
    } finally {
      setCommentsLoading(true)
      getComments()
    }
  };

  const handleEnviarRespuesta = () => {
    // Aquí puedes realizar un POST al backend para guardar la respuesta
  };

  if (!isFetched) {
    fetchPublicacion();
  }

  if (!commentsFetched) {
    getComments();
  }

  const editorConfig = {
    buttons: [
      'bold',
      'underline',
      'strikethrough',
      'superscript',
      'subscript',
      'link',
      'align',
    ],
    buttonsMD: [
      'bold',
      'underline',
      'strikethrough',
      'superscript',
      'subscript',
      'link',
      'align', // Negrita y cursiva en dispositivos medianos
    ],
    buttonsSM: [
      'bold',
      'underline',
      'strikethrough',
      'superscript',
      'subscript',
      'link',
      'align', // Negrita y cursiva en dispositivos medianos
    ],
    buttonsXS: [
      'bold',
      'underline',
      'strikethrough',
      'superscript',
      'subscript',
      'link',
      'align', // Para dispositivos pequeños
    ],
    height: 300,
    allowResizeX: false,
    allowResizeY: false,
    readonly: false,
    showCharsCounter: false,
    placeholder: "Escribe aquí...", // Placeholder del editor
    afterInit: (editor) => {
      editorRef.current = editor;
    },
  };

  const getPublication = () => {
    const fecha = new Date(publication[0].created_at);
    const meses = ["Eenero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Dicienmbre"]

    return (
      <div className="tarea-detalle">
        <DeleteTaskComment id_alumno={id_alumno} id_comentario={selectedComment} setComment={setSelectedComment} getComments={() => { setCommentsLoading(true); getComments() }} />
        <div className="tarea-header">
          <h2>{publication[0].titulo}</h2>
          <p>{publication[0].nombre_materia} - {course.nombre}</p>
          <p className="responsable">{publication[0].nombre_completo_profesor}</p>
          <p className="fecha">{fecha.getDate()} de {meses[fecha.getMonth()]} del {fecha.getFullYear()}</p>
          <button className={publication[0].evaluable === 1 ? 'evaluable' : 'non-evaluable'}>{publication[0].evaluable === 1 ? 'Evaluable' : 'No Evaluable'}</button>
        </div>

        <div className="tarea-contenido">
          <div className="tarea-respuesta">
            <ul className="tabs">
              <li className={activeTab === 'enunciado' ? 'active' : ''} onClick={() => setActiveTab('enunciado')}>
                Enunciado
              </li>
              <li className={activeTab === 'respuesta' ? 'active' : ''} onClick={() => setActiveTab('respuesta')}>
                Respuesta
              </li>
              <li className={activeTab === 'comentarios' ? 'active' : ''} onClick={() => setActiveTab('comentarios')}>
                Comentarios ({comments.length})
              </li>
            </ul>

            {activeTab === 'enunciado' && (
              <div className="tarea-enunciado">
                <h3>Enunciado de la tarea</h3>
                <p>{publication[0].descripcion}</p>
                <p>{publication[0].descripcion === null ? (<>*Contenido vacío*</>) : null}</p>
              </div>
            )}

            {activeTab === 'respuesta' ? (
              <div className={`respuesta-editor`}>
                <JoditEditor ref={editorRef} config={editorConfig} />
                <div className="botones">
                  <button className="adjuntar">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                      <path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4 10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z" />
                    </svg>
                    Adjuntar contenido
                  </button>
                  <div className="botones-envio">
                    <button className="enviar" onClick={handleEnviarRespuesta}>
                      Enviar respuesta
                    </button>
                  </div>
                </div>
              </div>
            ) : null}

            {activeTab === 'comentarios' ? (
              <div className={`comentarios-editor`}>

                {commentsLoading ? <Loading /> : (
                  <>
                    {comments.length === 0 ? (
                      <div id="comments-empty">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M208 352c114.9 0 208-78.8 208-176S322.9 0 208 0S0 78.8 0 176c0 38.6 14.7 74.3 39.6 103.4c-3.5 9.4-8.7 17.7-14.2 24.7c-4.8 6.2-9.7 11-13.3 14.3c-1.8 1.6-3.3 2.9-4.3 3.7c-.5 .4-.9 .7-1.1 .8l-.2 .2s0 0 0 0s0 0 0 0C1 327.2-1.4 334.4 .8 340.9S9.1 352 16 352c21.8 0 43.8-5.6 62.1-12.5c9.2-3.5 17.8-7.4 25.2-11.4C134.1 343.3 169.8 352 208 352zM448 176c0 112.3-99.1 196.9-216.5 207C255.8 457.4 336.4 512 432 512c38.2 0 73.9-8.7 104.7-23.9c7.5 4 16 7.9 25.2 11.4c18.3 6.9 40.3 12.5 62.1 12.5c6.9 0 13.1-4.5 15.2-11.1c2.1-6.6-.2-13.8-5.8-17.9c0 0 0 0 0 0s0 0 0 0l-.2-.2c-.2-.2-.6-.4-1.1-.8c-1-.8-2.5-2-4.3-3.7c-3.6-3.3-8.5-8.1-13.3-14.3c-5.5-7-10.7-15.4-14.2-24.7c24.9-29 39.6-64.7 39.6-103.4c0-92.8-84.9-168.9-192.6-175.5c.4 5.1 .6 10.3 .6 15.5z" /></svg>
                        <p>No hay comentarios</p>
                      </div>
                    ) : (
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
                                {c.id_alumno === id_alumno && <svg onClick={() => setSelectedComment(c.id_comentario)} className='delete-comment' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </>
                )}

                <div id="write-comment">
                  <textarea name="" id="" placeholder='Escribe un comentario' value={comentario} onChange={(e) => setComentario(e.target.value)}></textarea>
                  <button onClick={handleSubmit}>Enviar</button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    )
  }

  if (!loading) {
    if (publication[[0]]) {
      return (
        <>
          <Header />

          <div id="main-content" className="tarea-detalle-container">
            <FixedMenu />
            {getPublication()}

          </div>
        </>
      )
    } else {
      return (<Error404 />)
    }
  } else {
    return (<Loading />)
  }
};

export default TareaDetalle;
