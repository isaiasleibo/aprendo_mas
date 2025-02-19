-- MySQL dump 10.13  Distrib 8.0.41, for Linux (x86_64)
--
-- Host: localhost    Database: aprendo_mas
-- ------------------------------------------------------
-- Server version	8.0.41-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alumnos`
--
USE aprendo_mas;
DROP TABLE IF EXISTS `alumnos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alumnos` (
  `id_alumno` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `apellido` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `telefono` varchar(15) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `usuario` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `contrasena` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_alumno`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumnos`
--

LOCK TABLES `alumnos` WRITE;
/*!40000 ALTER TABLE `alumnos` DISABLE KEYS */;
INSERT  IGNORE INTO `alumnos` VALUES (1,'Isaias','Leibovich','2008-05-09','isaias.leibovich@gmail.com','+543547513419','2025-01-09 15:28:45','48753016','Gatacasa!2023'),(2,'Juan','Perez','2007-02-09','juanperez@gmail.com','+1234567890','2025-01-13 23:09:22','11111111','hola123'),(3,'Antonio','Martinez','2007-04-12','antonio@martinez.com','+1234567890','2025-01-18 21:17:29','22222222','hola123');
/*!40000 ALTER TABLE `alumnos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alumnos_cursos`
--

DROP TABLE IF EXISTS `alumnos_cursos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alumnos_cursos` (
  `id_alumno` int NOT NULL,
  `id_curso` int NOT NULL,
  `fecha_inscripcion` datetime DEFAULT CURRENT_TIMESTAMP,
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

LOCK TABLES `alumnos_cursos` WRITE;
/*!40000 ALTER TABLE `alumnos_cursos` DISABLE KEYS */;
INSERT  IGNORE INTO `alumnos_cursos` VALUES (1,1,'2025-01-10 16:31:52');
/*!40000 ALTER TABLE `alumnos_cursos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alumnos_materias`
--

DROP TABLE IF EXISTS `alumnos_materias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alumnos_materias` (
  `id_alumno` int NOT NULL,
  `id_curso` int NOT NULL,
  `id_materia` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
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

LOCK TABLES `alumnos_materias` WRITE;
/*!40000 ALTER TABLE `alumnos_materias` DISABLE KEYS */;
INSERT  IGNORE INTO `alumnos_materias` VALUES (1,1,1,'2025-01-10 20:38:21'),(1,1,2,'2025-01-10 20:38:21'),(1,1,3,'2025-01-10 20:38:21'),(1,1,4,'2025-01-10 20:38:21'),(1,1,5,'2025-01-10 20:38:21'),(1,1,6,'2025-01-10 20:38:21'),(1,1,7,'2025-01-10 20:38:21'),(1,1,8,'2025-01-10 20:38:21'),(1,1,9,'2025-01-10 20:38:21'),(1,1,10,'2025-01-10 20:38:21'),(1,1,11,'2025-01-10 20:38:21');
/*!40000 ALTER TABLE `alumnos_materias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `calificaciones`
--

DROP TABLE IF EXISTS `calificaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `calificaciones` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `id_alumno` int NOT NULL,
  `id_materia` int NOT NULL,
  `calificacion` int DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calificaciones`
--

LOCK TABLES `calificaciones` WRITE;
/*!40000 ALTER TABLE `calificaciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `calificaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comentarios`
--

DROP TABLE IF EXISTS `comentarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comentarios` (
  `id_comentario` int NOT NULL AUTO_INCREMENT,
  `id_publicacion` int NOT NULL,
  `id_alumno` int NOT NULL,
  `comentario` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_comentario`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comentarios`
--

LOCK TABLES `comentarios` WRITE;
/*!40000 ALTER TABLE `comentarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `comentarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cursos`
--

DROP TABLE IF EXISTS `cursos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cursos` (
  `id_curso` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `nivel` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_curso`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cursos`
--

LOCK TABLES `cursos` WRITE;
/*!40000 ALTER TABLE `cursos` DISABLE KEYS */;
INSERT  IGNORE INTO `cursos` VALUES (1,'5° Año','Secundario','2025-01-10 16:31:20');
/*!40000 ALTER TABLE `cursos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materias`
--

DROP TABLE IF EXISTS `materias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materias` (
  `id_materia` int NOT NULL AUTO_INCREMENT,
  `id_curso` int NOT NULL,
  `nombre` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `descripción` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_materia`),
  KEY `cursos` (`id_curso`),
  CONSTRAINT `cursos` FOREIGN KEY (`id_curso`) REFERENCES `cursos` (`id_curso`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materias`
--

LOCK TABLES `materias` WRITE;
/*!40000 ALTER TABLE `materias` DISABLE KEYS */;
INSERT  IGNORE INTO `materias` VALUES (1,1,'Matemática',NULL,'2025-01-10 20:36:12'),(2,1,'Física',NULL,'2025-01-10 20:36:12'),(3,1,'Química',NULL,'2025-01-10 20:36:12'),(4,1,'Biología',NULL,'2025-01-10 20:36:12'),(5,1,'Historia',NULL,'2025-01-10 20:36:12'),(6,1,'Geografía',NULL,'2025-01-10 20:36:12'),(7,1,'Literatura',NULL,'2025-01-10 20:36:12'),(8,1,'Inglés',NULL,'2025-01-10 20:36:12'),(9,1,'Educación Física',NULL,'2025-01-10 20:36:12'),(10,1,'Arte',NULL,'2025-01-10 20:36:12'),(11,1,'Filosofía',NULL,'2025-01-10 20:36:12');
/*!40000 ALTER TABLE `materias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mensajes`
--

DROP TABLE IF EXISTS `mensajes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mensajes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `emisor` int DEFAULT NULL,
  `receptor` int DEFAULT NULL,
  `message` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mensajes`
--

LOCK TABLES `mensajes` WRITE;
/*!40000 ALTER TABLE `mensajes` DISABLE KEYS */;
INSERT  IGNORE INTO `mensajes` VALUES (1,2,1,'Hola, ¿cómo estás?','2025-01-13 23:21:21'),(2,1,2,'Todo bien, ¿y tú?','2025-01-13 23:21:21'),(3,2,1,'Perfecto, gracias por preguntar.','2025-01-13 23:21:21'),(4,1,2,'¿Qué planes tienes para hoy?','2025-01-13 23:21:21'),(5,2,1,'Nada en especial, solo relajarme un poco.','2025-01-13 23:21:21'),(6,1,2,'Eso suena genial, ¡disfruta tu día!','2025-01-13 23:21:21'),(7,2,1,'Gracias, igualmente. Nos hablamos luego.','2025-01-13 23:21:21'),(9,1,3,'Hola, ¿cómo estás?','2025-01-18 21:00:00'),(10,3,1,'Todo bien, ¿y tú?','2025-01-18 21:01:00'),(11,1,3,'Perfecto, gracias por preguntar.','2025-01-18 21:02:00'),(12,3,1,'¿Qué planes tienes para el fin de semana?','2025-01-18 21:03:00'),(13,1,3,'Nada en especial, quizá salga a caminar.','2025-01-18 21:04:00'),(14,3,1,'Eso suena relajante, ¡disfruta!','2025-01-18 21:05:00');
/*!40000 ALTER TABLE `mensajes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profesores`
--

DROP TABLE IF EXISTS `profesores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profesores` (
  `id_profesor` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `apellido` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `telefono` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_profesor`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profesores`
--

LOCK TABLES `profesores` WRITE;
/*!40000 ALTER TABLE `profesores` DISABLE KEYS */;
INSERT  IGNORE INTO `profesores` VALUES (1,'Sofía','Pérez','1985-03-12','1123456789','sofia.perez@mail.com','2025-01-11 20:32:44'),(2,'Juan','Martínez','1978-07-21','1134567890','juan.martinez@mail.com','2025-01-11 20:32:44'),(3,'Ana','Gómez','1990-05-14','1145678901','ana.gomez@mail.com','2025-01-11 20:32:44'),(4,'Carlos','Rodríguez','1982-11-03','1156789012','carlos.rodriguez@mail.com','2025-01-11 20:32:44'),(5,'María','Fernández','1995-01-25','1167890123','maria.fernandez@mail.com','2025-01-11 20:32:44'),(6,'José','López','1988-09-15','1178901234','jose.lopez@mail.com','2025-01-11 20:32:44'),(7,'Elena','Sánchez','1993-04-18','1189012345','elena.sanchez@mail.com','2025-01-11 20:32:44'),(8,'Miguel','Romero','1986-12-07','1190123456','miguel.romero@mail.com','2025-01-11 20:32:44'),(9,'Lucía','Díaz','1992-06-30','1201234567','lucia.diaz@mail.com','2025-01-11 20:32:44'),(10,'Fernando','Cruz','1980-08-11','1212345678','fernando.cruz@mail.com','2025-01-11 20:32:44'),(11,'Clara','Torres','1984-10-19','1223456789','clara.torres@mail.com','2025-01-11 20:32:44');
/*!40000 ALTER TABLE `profesores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profesores_materias`
--

DROP TABLE IF EXISTS `profesores_materias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profesores_materias` (
  `id_profesor` int NOT NULL,
  `id_materia` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profesores_materias`
--

LOCK TABLES `profesores_materias` WRITE;
/*!40000 ALTER TABLE `profesores_materias` DISABLE KEYS */;
INSERT  IGNORE INTO `profesores_materias` VALUES (1,1,'2025-01-11 20:41:12'),(2,2,'2025-01-11 20:44:26'),(3,3,'2025-01-11 20:44:26'),(4,4,'2025-01-11 20:44:26'),(5,5,'2025-01-11 20:44:26'),(6,6,'2025-01-11 20:44:26'),(7,7,'2025-01-11 20:44:26'),(8,8,'2025-01-11 20:44:26'),(9,9,'2025-01-11 20:44:26'),(10,10,'2025-01-11 20:44:26'),(11,11,'2025-01-11 20:44:26');
/*!40000 ALTER TABLE `profesores_materias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publicaciones`
--

DROP TABLE IF EXISTS `publicaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publicaciones` (
  `id_publicacion` int NOT NULL AUTO_INCREMENT,
  `id_materia` int NOT NULL,
  `titulo` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `descripcion` text COLLATE utf8mb4_general_ci,
  `tipo` varchar(15) COLLATE utf8mb4_general_ci NOT NULL,
  `fecha_limite` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `id_curso` int DEFAULT NULL,
  `id_profesor` int NOT NULL,
  `evaluable` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id_publicacion`),
  KEY `materia_fk1` (`id_materia`),
  CONSTRAINT `materia_fk1` FOREIGN KEY (`id_materia`) REFERENCES `materias` (`id_materia`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publicaciones`
--

LOCK TABLES `publicaciones` WRITE;
/*!40000 ALTER TABLE `publicaciones` DISABLE KEYS */;
INSERT  IGNORE INTO `publicaciones` VALUES (1,7,'Preparar un ensayo crítico sobre la obra \'Cien años de soledad\'',NULL,'tarea','2025-01-16 00:00:00','2025-01-15 03:00:00',1,7,1),(6,1,'Resolver ecuaciones cuadráticas','Realiza los ejercicios de la página 45, números del 1 al 10.','tarea','2025-01-15 00:00:00','2025-01-15 03:00:00',1,1,1),(7,2,'Problemas de cinemática','Resuelve los problemas del capítulo 3, sección 2.','tarea','','2025-01-16 03:00:00',1,2,0),(8,3,NULL,'Consulta el nuevo material sobre reacciones químicas subido al portal.','publicacion',NULL,'2025-01-11 16:00:06',1,3,NULL),(9,4,'Análisis de ecosistemas','Investiga y elabora un informe sobre un ecosistema cercano.','tarea','2025-01-17 00:00:00','2025-01-17 03:00:00',1,4,1),(10,5,NULL,'Nuevo video explicativo sobre la Revolución Industrial disponible.','publicacion',NULL,'2025-01-11 16:00:06',1,5,NULL),(11,6,'Mapa político de Sudamérica','Dibuja un mapa identificando las principales capitales.','tarea','','2025-01-18 03:00:00',1,6,0),(12,7,NULL,'Lee el poema \'El Cuervo\' de Edgar Allan Poe antes de la próxima clase.','publicacion',NULL,'2025-01-11 16:00:06',1,7,NULL),(13,8,'Ensayo sobre Shakespeare','Escribe un ensayo de 500 palabras sobre su impacto en la literatura.','tarea','2025-01-19 00:00:00','2025-01-19 03:00:00',1,8,1),(14,9,NULL,'Recuerda traer ropa deportiva para la clase del viernes.','publicacion',NULL,'2025-01-11 16:00:06',1,9,NULL),(15,10,'Dibujo de perspectiva','Crea un dibujo en perspectiva utilizando las técnicas vistas en clase.','tarea','2025-01-20 00:00:00','2025-01-20 03:00:00',1,10,1),(16,11,NULL,'Nuevo material sobre la Ética de Aristóteles disponible en el portal.','publicacion',NULL,'2025-01-11 16:00:06',1,11,NULL),(17,1,'Problemas de álgebra','Resuelve los ejercicios 3 a 8 de la página 78.','tarea','','2025-01-21 03:00:00',1,1,0),(18,2,'Trabajo sobre energía','Prepara un resumen de 2 páginas sobre los diferentes tipos de energía.','tarea','2025-01-22 00:00:00','2025-01-22 03:00:00',1,2,1),(19,3,NULL,'Descarga el nuevo cuestionario de química orgánica.','publicacion',NULL,'2025-01-11 16:00:06',1,3,NULL),(20,4,'Presentación sobre células','Prepara una presentación sobre las células y sus funciones principales.','tarea','2025-01-23 00:00:00','2025-01-23 03:00:00',1,4,1),(21,5,'Ensayo sobre la Guerra Fría','Escribe un ensayo de 1000 palabras sobre las causas y efectos de la Guerra Fría.','tarea','2025-01-24 00:00:00','2025-01-24 03:00:00',1,5,1),(22,6,NULL,'Revisa el video sobre glaciares en el portal de clases.','publicacion',NULL,'2025-01-11 16:00:06',1,6,NULL),(23,7,'Lectura y análisis','Lee el cuento \'Casa tomada\' de Cortázar y responde las preguntas.','tarea','','2025-01-25 03:00:00',1,7,0),(24,8,NULL,'Nuevo vocabulario disponible: verbos irregulares comunes.','publicacion',NULL,'2025-01-11 16:00:06',1,8,NULL),(25,10,'Escultura con materiales reciclados','Crea una escultura con materiales reciclados y describe el proceso.','tarea','2025-01-26 00:00:00','2025-01-26 03:00:00',1,10,1);
/*!40000 ALTER TABLE `publicaciones` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-19  0:47:19
