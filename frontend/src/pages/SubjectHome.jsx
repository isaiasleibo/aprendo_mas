import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import PublicationItem from '../components/PublicationItem';
import '../scss/Home.scss';
import FixedMenu from '../components/FixedMenu';
import Loading from '../components/Loading';
import CommentSection from '../components/CommentSection';
import Empty from '../components/Empty';
import DeleteCommentSection from '../components/DeleteCommentSection';
import { useParams } from 'react-router-dom';
import Error404 from './Error404';

const serverURL = process.env.REACT_APP_SERVER_URL
const serverApiKey = process.env.REACT_APP_API_KEY

const SubjectHome = ({ id_alumno, id_curso }) => {
const { id_materia } = useParams();
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [moreLoading, setMoreLoading] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [deleteComment, setDeleteComment] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetched, setIsFetched] = useState(false);
  const observerRef = useRef(null);
  const [materiaFetched, setMateriaFetched] = useState(false)
  const [materia, setMateria] = useState({})
  const [error, setError] = useState(false)

  const fetchPublications = async () => {
    if (!hasMore || loading) return;
    setError(false)
    
    try {
      const response = await fetch(`${serverURL}/main/search_publications_by_subject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_alumno, id_curso, id_materia, page, limit: 10, api_key: serverApiKey }),
      });

      if (!response.ok) {
        throw new Error('Error al cargar las publicaciones');
      }

      const data = await response.json();
      setPublications(prev => [...prev, ...data]);
      setHasMore(data.length === 10);
      setPage(prevPage => prevPage + 1);
    } catch (err) {
      console.error(err.message);
      setError(true)
    } finally {
      setLoading(false);
      setMoreLoading(false);
      setIsFetched(true);
    }
  };

  const fetchMateria = async () => {
    try {
        const response = await fetch(`${serverURL}/main/fetch_subject`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id_materia, id_curso, api_key: serverApiKey }),
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        const data = await response.json();
        setMateria(data)
    } catch (error) {
        console.error("Error al obtener la materia:", error.message);
        return null;
    }
};

  if (!materiaFetched) {
    fetchMateria()
    setMateriaFetched(true)
  }

  useEffect(() => {
    if (!isFetched) {
      setLoading(true);
      fetchPublications();
    }
  }, [fetchPublications, isFetched]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setMoreLoading(true);
          fetchPublications();
        }
      },
      { threshold: 1.0 }
    );

    const observerTarget = document.getElementById("load-more-trigger");
    if (observerTarget) observerRef.current.observe(observerTarget);

    return () => observerRef.current?.disconnect();
  }, [fetchPublications]);

  if (!loading && !moreLoading && error) {
    return(
      <Error404 />
    )
  }

  return (
    <>
      <Header />
      <div id="main-content">
        <FixedMenu />
        {
          !loading && publications.length !== 0 &&
          <div id="posts">
            <div id="materia-title">
              <h2>{materia.nombre}</h2>
              <p>{materia.nombre_curso}</p>
            </div>

            {selectedComment && <CommentSection data={selectedComment} id_alumno={id_alumno} comment={setSelectedComment} deleteComment={setDeleteComment} />}
            {selectedComment && deleteComment && <DeleteCommentSection comment={selectedComment} deleteComment={setDeleteComment} data={deleteComment} />}
            {publications.map(publication => (
              <PublicationItem
                key={publication.id_publicacion}
                id={publication.id_publicacion}
                itemType={publication.tipo}
                taskTitle={publication.titulo}
                teacherName={publication.nombre_completo_profesor}
                profilePhoto={require('../img/persona.webp')}
                subjectName={publication.nombre_materia}
                content={publication.descripcion}
                courseName={publication.nombre_curso}
                datePublished={publication.created_at}
                comment={setSelectedComment}
              />
            ))}
            <div id="load-more-trigger" style={{ height: '20px', background: 'transparent' }}>
              {moreLoading && !loading && hasMore ? <Loading /> : null}
            </div>
          </div>
        }

        {loading && <Loading />}
        {!loading && !error && publications.length === 0 && <Empty />}
      </div>
    </>
  );
};

export default SubjectHome;
