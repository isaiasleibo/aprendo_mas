import React, { useState } from 'react';
import FixedMenu from '../components/FixedMenu';
import Header from '../components/Header';
import '../scss/Mensajes.scss';
import Loading from '../components/Loading';

const Mensajes = ({ id }) => {
  const [activeChat, setActiveChat] = useState(null); // Estado para el chat activo
  const [chats, setChats] = useState()
  const [mensajes, setMensajes] = useState()
  const [isFetched, setIsFetched] = useState(false)
  const [loading, setLoading] = useState(true)
  const [chatLoading, setChatLoading] = useState(false)

  const fetchContacts = async () => {
    try {
      const response = await fetch("http://localhost:3000/get_chats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }), // Enviar userId en el cuerpo
      });

      if (!response.ok) {
        throw new Error("Error al obtener los contactos");
      }

      const data = await response.json();
      setChats(data)
      setIsFetched(true)
    } catch (error) {
      console.error("Error al hacer fetch:", error);
      return [];
    } finally {
      setLoading(false)
    }
  };

  if (!isFetched) {
    fetchContacts()
  }

  const fetchMessages = async (id1, id2) => {
    setChatLoading(true)

    try {
      const response = await fetch("http://localhost:3000/get_messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id1, id2 }), // Enviar los IDs en el cuerpo
      });

      if (!response.ok) {
        throw new Error("Error al obtener los mensajes");
      }

      const data = await response.json();
      setMensajes(data)
    } catch (error) {
      console.error("Error al hacer fetch:", error);
      return []; // Devolver un array vacío en caso de error
    } finally {
      setChatLoading(false)
    }
  };



  return (
    <>
      <Header mensajes />

      <div id="main-content" className="mensajes-container">
        <FixedMenu mensajes />

        {loading ? (<Loading />) : (
          <div className="mensajes-layout">
            <div id="top-bar">
              <h2>Mis Mensajes</h2>
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" />
                </svg>
                <p>Nuevo chat</p>
              </button>
            </div>

            {/* Sidebar de usuarios */}
            <div className="sidebar">
              {chats && chats.map((chat, index) => (
                <div
                  key={index}
                  className={`user ${activeChat === chat.id_alumno ? 'active' : ''}`}
                  onClick={() => { fetchMessages(id, chat.id_alumno); setActiveChat(chat.id_alumno) }}
                >
                  <div className="avatar">
                    <img src={require('../img/persona.webp')} alt={`Avatar de Usuario`} />
                  </div>
                  <div className="user-info">
                    <p>{chat.nombre} {chat.apellido}</p>
                    <span>Último mensaje hace 1 hora</span>
                  </div>
                </div>
              ))}
              {chats.length === 0 && 
                <div id='empty-contacts'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M88.7 223.8L0 375.8 0 96C0 60.7 28.7 32 64 32l117.5 0c17 0 33.3 6.7 45.3 18.7l26.5 26.5c12 12 28.3 18.7 45.3 18.7L416 96c35.3 0 64 28.7 64 64l0 32-336 0c-22.8 0-43.8 12.1-55.3 31.8zm27.6 16.1C122.1 230 132.6 224 144 224l400 0c11.5 0 22 6.1 27.7 16.1s5.7 22.2-.1 32.1l-112 192C453.9 474 443.4 480 432 480L32 480c-11.5 0-22-6.1-27.7-16.1s-5.7-22.2 .1-32.1l112-192z"/></svg>
                  <p>No hay contactos, cree un nuevo chat.</p>
                </div>}
            </div>

            {/* Área de mensajes */}
            <div className="chat-area">
              {chatLoading ? (<Loading />) : (
                <>
                  {mensajes ? (
                    mensajes.map((mensaje, index) => (
                      <div
                        key={index}
                        className={`mensaje ${mensaje.emisor === id ? 'enviado' : 'recibido'}`}
                      >
                        {mensaje.emisor !== id && <div className="avatar" />}
                        <div className="texto">{mensaje.message}</div>
                        {mensaje.emisor === id && <div className="avatar" />}
                      </div>
                    ))
                  ) : (
                    <div className="empty-chat">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M121 32C91.6 32 66 52 58.9 80.5L1.9 308.4C.6 313.5 0 318.7 0 323.9L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-92.1c0-5.2-.6-10.4-1.9-15.5l-57-227.9C446 52 420.4 32 391 32L121 32zm0 64l270 0 48 192-51.2 0c-12.1 0-23.2 6.8-28.6 17.7l-14.3 28.6c-5.4 10.8-16.5 17.7-28.6 17.7l-120.4 0c-12.1 0-23.2-6.8-28.6-17.7l-14.3-28.6c-5.4-10.8-16.5-17.7-28.6-17.7L73 288 121 96z" /></svg>
                      <p>Selecciona un chat para empezar.</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Mensajes;
