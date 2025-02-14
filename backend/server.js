const express = require("express");
const cors = require("cors"); // Importar CORS

const app = express();

app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.json()); // Middleware para parsear JSON

// Función auxiliar para cargar módulos y validar que sean funciones
const loadFunction = (path) => {
    const func = require(path);
    if (typeof func === "function") {
        return func;
    } else {
        console.error(`❌ Error: ${path} no exporta una función.`);
        return null;
    }
};

// Importar y validar funciones
const checkStudent = loadFunction("./functions/check_student");
const countComments = loadFunction("./functions/count_comments");
const deleteComment = loadFunction("./functions/delete_comment");
const fetchSubject = loadFunction("./functions/fetch_subject");
const getChats = loadFunction("./functions/get_chats");
const getComments = loadFunction("./functions/get_comments");
const getMessages = loadFunction("./functions/get_messages");
const insertComment = loadFunction("./functions/insert_comment");
const searchAllPublications = loadFunction("./functions/search_all_publications");
const searchCourse = loadFunction("./functions/search_course");
const searchPublicationsBySubject = loadFunction("./functions/search_publications_by_subject");
const searchSpecificTask = loadFunction("./functions/search_specific_task");
const searchSubjects = loadFunction("./functions/search_subjects");
const searchTasksByDate = loadFunction("./functions/search_tasks_by_date");
const searchTasks = loadFunction("./functions/search_tasks");

// Rutas para aceptar cualquier método HTTP si la función fue importada correctamente
if (checkStudent) app.all("/check_student", checkStudent);
if (countComments) app.all("/count_comments", countComments);
if (deleteComment) app.all("/delete_comment", deleteComment);
if (fetchSubject) app.all("/fetch_subject", fetchSubject);
if (getChats) app.all("/get_chats", getChats);
if (getComments) app.all("/get_comments", getComments);
if (getMessages) app.all("/get_messages", getMessages);
if (insertComment) app.all("/insert_comment", insertComment);
if (searchAllPublications) app.all("/search_all_publications", searchAllPublications);
if (searchCourse) app.all("/search_course", searchCourse);
if (searchPublicationsBySubject) app.all("/search_publications_by_subject", searchPublicationsBySubject);
if (searchSpecificTask) app.all("/search_specific_task", searchSpecificTask);
if (searchSubjects) app.all("/search_subjects", searchSubjects);
if (searchTasksByDate) app.all("/search_tasks_by_date", searchTasksByDate);
if (searchTasks) app.all("/search_tasks", searchTasks);

app.listen(3000, () => console.log("🚀 Servidor corriendo en http://localhost:3000"));
