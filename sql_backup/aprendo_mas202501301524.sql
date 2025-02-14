-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: aprendo_mas
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `aprendo_mas`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `aprendo_mas` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;

USE `aprendo_mas`;

--
-- Table structure for table `alumnos`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE IF NOT EXISTS `alumnos` (
  `id_alumno` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `usuario` varchar(255) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  PRIMARY KEY (`id_alumno`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumnos`
--

INSERT INTO `alumnos` (`id_alumno`, `nombre`, `apellido`, `fecha_nacimiento`, `email`, `telefono`, `created_at`, `usuario`, `contrasena`) VALUES (1,'Isaias','Leibovich','2008-05-09','isaias.leibovich@gmail.com','+543547513419','2025-01-09 15:28:45','48753016','Gatacasa!2023'),(2,'Juan','Perez','2007-02-09','juanperez@gmail.com','+1234567890','2025-01-13 23:09:22','11111111','hola123'),(3,'Antonio','Martinez','2007-04-12','antonio@martinez.com','+1234567890','2025-01-18 21:17:29','22222222','hola123');

--
-- Table structure for table `alumnos_cursos`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE IF NOT EXISTS `alumnos_cursos` (
  `id_alumno` int(11) NOT NULL,
  `id_curso` int(11) NOT NULL,
  `fecha_inscripcion` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id_alumno`,`id_curso`),
  KEY `id_alumno` (`id_alumno`),
  KEY `id_curso` (`id_curso`),
  CONSTRAINT `fk_id_alumno` FOREIGN KEY (`id_alumno`) REFERENCES `alumnos` (`id_alumno`) ON DELETE CASCADE,
  CONSTRAINT `fk_id_curso` FOREIGN KEY (`id_curso`) REFERENCES `cursos` (`id_curso`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumnos_cursos`
--

INSERT INTO `alumnos_cursos` (`id_alumno`, `id_curso`, `fecha_inscripcion`) VALUES (1,1,'2025-01-10 16:31:52');

--
-- Table structure for table `alumnos_materias`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE IF NOT EXISTS `alumnos_materias` (
  `id_alumno` int(11) NOT NULL,
  `id_curso` int(11) NOT NULL,
  `id_materia` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  UNIQUE KEY `materia` (`id_materia`),
  KEY `alumno` (`id_alumno`),
  KEY `curso` (`id_curso`),
  CONSTRAINT `alumno` FOREIGN KEY (`id_alumno`) REFERENCES `alumnos` (`id_alumno`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `curso` FOREIGN KEY (`id_curso`) REFERENCES `cursos` (`id_curso`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `materia` FOREIGN KEY (`id_materia`) REFERENCES `materias` (`id_materia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumnos_materias`
--

INSERT INTO `alumnos_materias` (`id_alumno`, `id_curso`, `id_materia`, `created_at`) VALUES (1,1,1,'2025-01-10 20:38:21'),(1,1,2,'2025-01-10 20:38:21'),(1,1,3,'2025-01-10 20:38:21'),(1,1,4,'2025-01-10 20:38:21'),(1,1,5,'2025-01-10 20:38:21'),(1,1,6,'2025-01-10 20:38:21'),(1,1,7,'2025-01-10 20:38:21'),(1,1,8,'2025-01-10 20:38:21'),(1,1,9,'2025-01-10 20:38:21'),(1,1,10,'2025-01-10 20:38:21'),(1,1,11,'2025-01-10 20:38:21');

--
-- Table structure for table `comentarios`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE IF NOT EXISTS `comentarios` (
  `id_comentario` int(11) NOT NULL AUTO_INCREMENT,
  `id_publicacion` int(11) NOT NULL,
  `id_alumno` int(11) NOT NULL,
  `comentario` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id_comentario`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comentarios`
--

INSERT INTO `comentarios` (`id_comentario`, `id_publicacion`, `id_alumno`, `comentario`, `created_at`) VALUES (1,25,1,'Ok profe, lo voy a tener en cuenta.','2025-01-30 17:56:02');

--
-- Table structure for table `cursos`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE IF NOT EXISTS `cursos` (
  `id_curso` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `nivel` varchar(50) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id_curso`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cursos`
--

INSERT INTO `cursos` (`id_curso`, `nombre`, `nivel`, `created_at`) VALUES (1,'5° Año','Secundario','2025-01-10 16:31:20');

--
-- Table structure for table `materias`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE IF NOT EXISTS `materias` (
  `id_materia` int(11) NOT NULL AUTO_INCREMENT,
  `id_curso` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripción` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id_materia`),
  KEY `cursos` (`id_curso`),
  CONSTRAINT `cursos` FOREIGN KEY (`id_curso`) REFERENCES `cursos` (`id_curso`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materias`
--

INSERT INTO `materias` (`id_materia`, `id_curso`, `nombre`, `descripción`, `created_at`) VALUES (1,1,'Matemática',NULL,'2025-01-10 20:36:12'),(2,1,'Física',NULL,'2025-01-10 20:36:12'),(3,1,'Química',NULL,'2025-01-10 20:36:12'),(4,1,'Biología',NULL,'2025-01-10 20:36:12'),(5,1,'Historia',NULL,'2025-01-10 20:36:12'),(6,1,'Geografía',NULL,'2025-01-10 20:36:12'),(7,1,'Literatura',NULL,'2025-01-10 20:36:12'),(8,1,'Inglés',NULL,'2025-01-10 20:36:12'),(9,1,'Educación Física',NULL,'2025-01-10 20:36:12'),(10,1,'Arte',NULL,'2025-01-10 20:36:12'),(11,1,'Filosofía',NULL,'2025-01-10 20:36:12');

--
-- Table structure for table `mensajes`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE IF NOT EXISTS `mensajes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `emisor` int(11) DEFAULT NULL,
  `receptor` int(11) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mensajes`
--

INSERT INTO `mensajes` (`id`, `emisor`, `receptor`, `message`, `created_at`) VALUES (1,2,1,'Hola, ¿cómo estás?','2025-01-13 23:21:21'),(2,1,2,'Todo bien, ¿y tú?','2025-01-13 23:21:21'),(3,2,1,'Perfecto, gracias por preguntar.','2025-01-13 23:21:21'),(4,1,2,'¿Qué planes tienes para hoy?','2025-01-13 23:21:21'),(5,2,1,'Nada en especial, solo relajarme un poco.','2025-01-13 23:21:21'),(6,1,2,'Eso suena genial, ¡disfruta tu día!','2025-01-13 23:21:21'),(7,2,1,'Gracias, igualmente. Nos hablamos luego.','2025-01-13 23:21:21'),(9,1,3,'Hola, ¿cómo estás?','2025-01-18 21:00:00'),(10,3,1,'Todo bien, ¿y tú?','2025-01-18 21:01:00'),(11,1,3,'Perfecto, gracias por preguntar.','2025-01-18 21:02:00'),(12,3,1,'¿Qué planes tienes para el fin de semana?','2025-01-18 21:03:00'),(13,1,3,'Nada en especial, quizá salga a caminar.','2025-01-18 21:04:00'),(14,3,1,'Eso suena relajante, ¡disfruta!','2025-01-18 21:05:00');

--
-- Table structure for table `profesores`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE IF NOT EXISTS `profesores` (
  `id_profesor` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id_profesor`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profesores`
--

INSERT INTO `profesores` (`id_profesor`, `nombre`, `apellido`, `fecha_nacimiento`, `telefono`, `email`, `created_at`) VALUES (1,'Sofía','Pérez','1985-03-12','1123456789','sofia.perez@mail.com','2025-01-11 20:32:44'),(2,'Juan','Martínez','1978-07-21','1134567890','juan.martinez@mail.com','2025-01-11 20:32:44'),(3,'Ana','Gómez','1990-05-14','1145678901','ana.gomez@mail.com','2025-01-11 20:32:44'),(4,'Carlos','Rodríguez','1982-11-03','1156789012','carlos.rodriguez@mail.com','2025-01-11 20:32:44'),(5,'María','Fernández','1995-01-25','1167890123','maria.fernandez@mail.com','2025-01-11 20:32:44'),(6,'José','López','1988-09-15','1178901234','jose.lopez@mail.com','2025-01-11 20:32:44'),(7,'Elena','Sánchez','1993-04-18','1189012345','elena.sanchez@mail.com','2025-01-11 20:32:44'),(8,'Miguel','Romero','1986-12-07','1190123456','miguel.romero@mail.com','2025-01-11 20:32:44'),(9,'Lucía','Díaz','1992-06-30','1201234567','lucia.diaz@mail.com','2025-01-11 20:32:44'),(10,'Fernando','Cruz','1980-08-11','1212345678','fernando.cruz@mail.com','2025-01-11 20:32:44'),(11,'Clara','Torres','1984-10-19','1223456789','clara.torres@mail.com','2025-01-11 20:32:44');

--
-- Table structure for table `profesores_materias`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE IF NOT EXISTS `profesores_materias` (
  `id_profesor` int(11) NOT NULL,
  `id_materia` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profesores_materias`
--

INSERT INTO `profesores_materias` (`id_profesor`, `id_materia`, `created_at`) VALUES (1,1,'2025-01-11 20:41:12'),(2,2,'2025-01-11 20:44:26'),(3,3,'2025-01-11 20:44:26'),(4,4,'2025-01-11 20:44:26'),(5,5,'2025-01-11 20:44:26'),(6,6,'2025-01-11 20:44:26'),(7,7,'2025-01-11 20:44:26'),(8,8,'2025-01-11 20:44:26'),(9,9,'2025-01-11 20:44:26'),(10,10,'2025-01-11 20:44:26'),(11,11,'2025-01-11 20:44:26');

--
-- Table structure for table `publicaciones`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE IF NOT EXISTS `publicaciones` (
  `id_publicacion` int(11) NOT NULL AUTO_INCREMENT,
  `id_materia` int(11) NOT NULL,
  `titulo` varchar(255) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `tipo` varchar(15) NOT NULL,
  `fecha_limite` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `id_curso` int(11) DEFAULT NULL,
  `id_profesor` int(11) NOT NULL,
  `evaluable` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id_publicacion`),
  KEY `materia_fk1` (`id_materia`),
  CONSTRAINT `materia_fk1` FOREIGN KEY (`id_materia`) REFERENCES `materias` (`id_materia`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publicaciones`
--

INSERT INTO `publicaciones` (`id_publicacion`, `id_materia`, `titulo`, `descripcion`, `tipo`, `fecha_limite`, `created_at`, `id_curso`, `id_profesor`, `evaluable`) VALUES (1,7,'Preparar un ensayo crítico sobre la obra \'Cien años de soledad\'',NULL,'tarea','2025-01-15 00:00:00','2025-01-15 03:00:00',1,7,1),(6,1,'Resolver ecuaciones cuadráticas','Realiza los ejercicios de la página 45, números del 1 al 10.','tarea','2025-01-15 00:00:00','2025-01-15 03:00:00',1,1,1),(7,2,'Problemas de cinemática','Resuelve los problemas del capítulo 3, sección 2.','tarea','','2025-01-16 03:00:00',1,2,0),(8,3,NULL,'Consulta el nuevo material sobre reacciones químicas subido al portal.','publicacion',NULL,'2025-01-11 16:00:06',1,3,NULL),(9,4,'Análisis de ecosistemas','Investiga y elabora un informe sobre un ecosistema cercano.','tarea','2025-01-17 00:00:00','2025-01-17 03:00:00',1,4,1),(10,5,NULL,'Nuevo video explicativo sobre la Revolución Industrial disponible.','publicacion',NULL,'2025-01-11 16:00:06',1,5,NULL),(11,6,'Mapa político de Sudamérica','Dibuja un mapa identificando las principales capitales.','tarea','','2025-01-18 03:00:00',1,6,0),(12,7,NULL,'Lee el poema \'El Cuervo\' de Edgar Allan Poe antes de la próxima clase.','publicacion',NULL,'2025-01-11 16:00:06',1,7,NULL),(13,8,'Ensayo sobre Shakespeare','Escribe un ensayo de 500 palabras sobre su impacto en la literatura.','tarea','2025-01-19 00:00:00','2025-01-19 03:00:00',1,8,1),(14,9,NULL,'Recuerda traer ropa deportiva para la clase del viernes.','publicacion',NULL,'2025-01-11 16:00:06',1,9,NULL),(15,10,'Dibujo de perspectiva','Crea un dibujo en perspectiva utilizando las técnicas vistas en clase.','tarea','2025-01-20 00:00:00','2025-01-20 03:00:00',1,10,1),(16,11,NULL,'Nuevo material sobre la Ética de Aristóteles disponible en el portal.','publicacion',NULL,'2025-01-11 16:00:06',1,11,NULL),(17,1,'Problemas de álgebra','Resuelve los ejercicios 3 a 8 de la página 78.','tarea','','2025-01-21 03:00:00',1,1,0),(18,2,'Trabajo sobre energía','Prepara un resumen de 2 páginas sobre los diferentes tipos de energía.','tarea','2025-01-22 00:00:00','2025-01-22 03:00:00',1,2,1),(19,3,NULL,'Descarga el nuevo cuestionario de química orgánica.','publicacion',NULL,'2025-01-11 16:00:06',1,3,NULL),(20,4,'Presentación sobre células','Prepara una presentación sobre las células y sus funciones principales.','tarea','2025-01-23 00:00:00','2025-01-23 03:00:00',1,4,1),(21,5,'Ensayo sobre la Guerra Fría','Escribe un ensayo de 1000 palabras sobre las causas y efectos de la Guerra Fría.','tarea','2025-01-24 00:00:00','2025-01-24 03:00:00',1,5,1),(22,6,NULL,'Revisa el video sobre glaciares en el portal de clases.','publicacion',NULL,'2025-01-11 16:00:06',1,6,NULL),(23,7,'Lectura y análisis','Lee el cuento \'Casa tomada\' de Cortázar y responde las preguntas.','tarea','','2025-01-25 03:00:00',1,7,0),(24,8,NULL,'Nuevo vocabulario disponible: verbos irregulares comunes.','publicacion',NULL,'2025-01-11 16:00:06',1,8,NULL),(25,10,'Escultura con materiales reciclados','Crea una escultura con materiales reciclados y describe el proceso.','tarea','2025-01-26 00:00:00','2025-01-26 03:00:00',1,10,1);

--
-- Dumping routines for database 'aprendo_mas'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-30 15:24:54
