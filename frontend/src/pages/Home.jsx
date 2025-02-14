import React, { useState, useEffect, useCallback, useRef } from 'react';
import Header from '../components/Header';
import PublicationItem from '../components/PublicationItem';
import '../scss/Home.scss';
import FixedMenu from '../components/FixedMenu';
import Loading from '../components/Loading';
import CommentSection from '../components/CommentSection';
import Empty from '../components/Empty'
import DeleteCommentSection from '../components/DeleteCommentSection';

const Home = ({ id_curso, id_alumno }) => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [moreLoading, setMoreLoading] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [deleteComment, setDeleteComment] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetched, setIsFetched] = useState(false)
  const observerRef = useRef(null);

  const fetchPublications = useCallback(async () => {
    if (!hasMore || loading) return;
    
    try {
      const response = await fetch('http://localhost:3000/search_all_publications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_alumno, id_curso, page, limit: 10 }),
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
    } finally {
      setLoading(false);
      setMoreLoading(false)
      setIsFetched(true)
    }
  }, [id_curso, page, hasMore, loading, id_alumno]);

  useEffect(() => {
    if (!isFetched) {
      setLoading(true)
      fetchPublications();
    }
  }, [fetchPublications, isFetched]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setMoreLoading(true)
          fetchPublications();
        }
      },
      { threshold: 1.0 }
    );

    const observerTarget = document.getElementById("load-more-trigger");
    if (observerTarget) observerRef.current.observe(observerTarget);

    return () => observerRef.current?.disconnect();
  }, [fetchPublications]);

  return (
    <>
      <Header inicio />
      <div id="main-content">
        <FixedMenu inicio />
        {
          !loading && publications.length !== 0 &&
          <div id="posts">
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
                courseName={publication.nombre_curso}
                content={publication.descripcion}
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
        {!loading && publications.length === 0 && <Empty />}
      </div>
    </>
  );
};

export default Home;
