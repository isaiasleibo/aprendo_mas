import React from 'react';
import '../scss/DeleteCommentSection.scss';

const serverURL = process.env.REACT_APP_SERVER_URL
const serverApiKey = process.env.REACT_APP_API_KEY

const DeleteCommentSection = ({ deleteComment, data, comment }) => {

    const handleDelete = async () => {
        if (!data?.id_alumno || !data?.id_comentario) {
            console.error("Faltan datos para eliminar el comentario");
            return;
        }

        try {
            const response = await fetch(`${serverURL}/delete_comment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_alumno: data.id_alumno,
                    id_comentario: data.id_comentario,
                    api_key: serverApiKey
                }),
            });

            const result = await response.json();

            if (response.ok) {
                deleteComment(null); // Cierra el modal o reinicia el estado
            } else {
                alert(result.error || "Error al eliminar el comentario");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("No se pudo conectar con el servidor");
        } finally {
            comment.obtenerCantidadComentarios()
            data.fetchComments()
        }
    };

    return (
        <div id="delete-comment-section">
            <div id="delete-container">
                <div id="top-bar">
                    <p>Eliminar comentario</p>
                </div>

                <div id="main">
                    <p>¿Seguro que quieres borrar este comentario?</p>
                    <div id="botones">
                        <button onClick={() => deleteComment(null)}>Cancelar</button>
                        <button onClick={handleDelete}>Aceptar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteCommentSection;
