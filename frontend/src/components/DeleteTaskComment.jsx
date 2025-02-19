import React from 'react'

const serverURL = process.env.REACT_APP_SERVER_URL
const serverApiKey = process.env.REACT_APP_API_KEY

const DeleteTaskComment = ({id_alumno, id_comentario, setComment, getComments}) => {

    const handleDelete = async () => {
        try {
            const response = await fetch(`${serverURL}/main/delete_comment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_alumno,
                    id_comentario,
                    api_key: serverApiKey
                }),
            });

            const result = await response.json();

            if (response.ok) {
                return; // Cierra el modal o reinicia el estado
            } else {
                alert(result.error || "Error al eliminar el comentario");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("No se pudo conectar con el servidor");
        } finally {
            getComments()
            setComment()
        }
    };

    if (id_comentario) {
        return (
            <div id="delete-comment-section">
                <div id="delete-container">
                    <div id="top-bar">
                        <p>Eliminar comentario</p>
                    </div>
    
                    <div id="main">
                        <p>¿Seguro que quieres borrar este comentario?</p>
                        <div id="botones">
                            <button onClick={() => setComment()}>Cancelar</button>
                            <button onClick={handleDelete}>Aceptar</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DeleteTaskComment