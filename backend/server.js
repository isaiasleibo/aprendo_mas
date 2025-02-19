const express = require("express");
const cors = require("cors"); // Importar CORS

const app = express();

app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.json()); // Middleware para parsear JSON

// Middleware para validar API_KEY desde la petición
app.use((req, res, next) => {
    const apiKey = req.headers["api_key"] || req.query.api_key || req.body.api_key;
    if (apiKey !== process.env.API_KEY) {
        return res.status(403).json({ error: "API Key inválida" });
    }
    next();
});

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
const checkStudent = loadFunction("./functions/main/check_student");
const countComments = loadFunction("./functions/main/count_comments");
const deleteComment = loadFunction("./functions/main/delete_comment");
const fetchSubject = loadFunction("./functions/main/fetch_subject");
const getChats = loadFunction("./functions/main/get_chats");
const getComments = loadFunction("./functions/main/get_comments");
const getMessages = loadFunction("./functions/main/get_messages");
const insertComment = loadFunction("./functions/main/insert_comment");
const searchAllPublications = loadFunction("./functions/main/search_all_publications");
const searchCourse = loadFunction("./functions/main/search_course");
const searchPublicationsBySubject = loadFunction("./functions/main/search_publications_by_subject");
const searchSpecificTask = loadFunction("./functions/main/search_specific_task");
const searchSubjects = loadFunction("./functions/main/search_subjects");
const searchSubjectsWithScore = loadFunction("./functions/main/search_subjects_with_score");
const searchTasksByDate = loadFunction("./functions/main/search_tasks_by_date");
const searchTasks = loadFunction("./functions/main/search_tasks");

const getUser = loadFunction("./functions/profesores/get_user");

// Main
if (checkStudent) app.all("/main/check_student", checkStudent);
if (countComments) app.all("/main/count_comments", countComments);
if (deleteComment) app.all("/main/delete_comment", deleteComment);
if (fetchSubject) app.all("/main/fetch_subject", fetchSubject);
if (getChats) app.all("/main/get_chats", getChats);
if (getComments) app.all("/main/get_comments", getComments);
if (getMessages) app.all("/main/get_messages", getMessages);
if (insertComment) app.all("/main/insert_comment", insertComment);
if (searchAllPublications) app.all("/main/search_all_publications", searchAllPublications);
if (searchCourse) app.all("/main/search_course", searchCourse);
if (searchPublicationsBySubject) app.all("/main/search_publications_by_subject", searchPublicationsBySubject);
if (searchSpecificTask) app.all("/main/search_specific_task", searchSpecificTask);
if (searchSubjects) app.all("/main/search_subjects", searchSubjects);
if (searchSubjectsWithScore) app.all("/main/search_subjects_with_score", searchSubjectsWithScore);
if (searchTasksByDate) app.all("/main/search_tasks_by_date", searchTasksByDate);
if (searchTasks) app.all("/main/search_tasks", searchTasks);

// Profesores
if (getUser) app.all("/profesores/get_user", getUser);

app.listen(3000, () => console.log("🚀 Servidor corriendo en http://localhost:3000"));
