import React, { useState, useEffect } from 'react';
import '../scss/Publication.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const serverURL = process.env.REACT_APP_SERVER_URL
const serverApiKey = process.env.REACT_APP_API_KEY

const PublicationItem = ({ id, itemType, teacherName, profilePhoto, subjectName, courseName, content, datePublished, taskTitle, comment }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [maxLength, setMaxLength] = useState(getMaxLength(window.innerWidth));
  const [cantidadComentarios, setCantidadComentarios] = useState(0);
  const [isFetched, setIsFetched] = useState(false)
  const dateDatePublished = new Date(datePublished);
  const meses = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];


  // Función para calcular el límite según el ancho de la pantalla
  function getMaxLength(width) {
    if (width >= 1400) return 400; 
    if (width >= 1100) return 300; 
    if (width >= 1030) return 400; 
    if (width > 768) return 300; 
    return 150;
  }

  // Actualizar el límite al cambiar el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      setMaxLength(getMaxLength(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function formatTextWithLineBreaks(text) {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const isContentLong = content ? content.length > maxLength : null;

  const obtenerCantidadComentarios = async () => {
    try {
      const response = await fetch(`${serverURL}/main/count_comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_publicacion: id, api_key: serverApiKey }),
      });
  
      if (!response.ok) {
        throw new Error('Error al obtener los comentarios');
      }
  
      const data = await response.json();
      setCantidadComentarios(data.cantidad_comentarios)
    } catch (error) {
      console.error('Error:', error);
      return null;
    } finally {
      setIsFetched(true)
    }
  };

  if (!isFetched) {
    obtenerCantidadComentarios()
  }

  return (
    <div id="publication" className={itemType === 'tarea' ? 'task-item' : 'publication-item'}>
      <div className="header">
        <img src={profilePhoto} alt="User Avatar" />
        <div className="header-details">
          <h2>{teacherName}</h2>
          <p className="subject-course">{subjectName} - {courseName}</p>
        </div>
      </div>

      <div className="content">
        {itemType === 'tarea' && (
          <>
            <strong>Nueva tarea:</strong> {taskTitle}
          </>
        )}
        {itemType === 'publicacion' && (
          <>
            {isExpanded
              ? formatTextWithLineBreaks(content)
              : formatTextWithLineBreaks(content.slice(0, maxLength))}
            {!isExpanded && isContentLong ? '...' : ''}
            {isContentLong && (
              <span className="expand-button" onClick={toggleExpand}>{isExpanded ? 'Mostrar menos' : 'Expandir'}</span>
            )}
          </>
        )}
      </div>
      <hr />
      <p className="date-published">Publicado el {dateDatePublished.getDate()} de {meses[dateDatePublished.getMonth()]} del {dateDatePublished.getFullYear()}</p>
      <div className="interactive-section">
        <div className="details-section">
          {itemType === 'tarea' && (
            <Link to={`/tareas/${id}`}>
              <FontAwesomeIcon icon={faBookOpen} />
              <p>Ver detalles</p>
            </Link>
          )}
        </div>
        <div className="comments-section" onClick={() => {comment({id: id, count: cantidadComentarios, obtenerCantidadComentarios })}}>
          <FontAwesomeIcon icon={faComment}/>
          <p>Comentarios <span>({cantidadComentarios})</span></p>
        </div>
      </div>
    </div>
  );
};

export default PublicationItem;
