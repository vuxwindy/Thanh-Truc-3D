-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: thanh_truc
-- ------------------------------------------------------
-- Server version	8.0.42

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

-- Create database if not exists
-- CREATE DATABASE IF NOT EXISTS thanh_truc;
-- USE thanh_truc;

-- -- Create examples table
-- CREATE TABLE IF NOT EXISTS examples (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   name VARCHAR(255) NOT NULL,
--   description TEXT,
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
-- Table structure for table `banners`
--

DROP TABLE IF EXISTS `banners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `banners` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image` text NOT NULL,
  `link` varchar(255) DEFAULT NULL,
  `order` int DEFAULT '0',
  `deleted_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banners`
--

LOCK TABLES `banners` WRITE;
/*!40000 ALTER TABLE `banners` DISABLE KEYS */;
INSERT INTO `banners` VALUES (1,'banners/banner-1-1745594541969.jpg','',1,NULL,'2025-04-19 16:04:14','2025-04-25 15:24:13'),(2,'banners/banner-2-1745594555147.jpg','',2,NULL,'2025-04-19 16:04:14','2025-04-25 15:24:17'),(3,'banners/banner-3-1745594568672.jpg','',3,NULL,'2025-04-19 16:04:14','2025-04-25 15:24:21'),(4,'banners/banner-4-1745594579278.jpg','',4,NULL,'2025-04-19 16:04:14','2025-04-25 15:24:26'),(5,'banners/banner-5-1745594589134.jpg','',5,NULL,'2025-04-19 16:04:14','2025-04-25 15:24:30'),(6,'banners/banner-1745594610127.jpg','',0,NULL,'2025-04-25 15:23:30','2025-04-25 15:23:30'),(7,'banners/banner-1745594648282.jpg','',0,NULL,'2025-04-25 15:24:08','2025-04-25 15:24:08');
/*!40000 ALTER TABLE `banners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `deleted_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `cart_items_ibfk_39` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `cart_items_ibfk_40` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
INSERT INTO `cart_items` VALUES (1,4,57,1,NULL,'2025-04-19 16:04:14','2025-04-19 16:04:14'),(2,4,119,1,NULL,'2025-04-19 16:04:14','2025-04-19 16:04:14'),(3,4,96,3,NULL,'2025-04-19 16:04:14','2025-04-19 16:04:14'),(4,16,28,1,NULL,'2025-04-19 16:04:14','2025-04-19 16:04:14'),(5,12,107,3,NULL,'2025-04-19 16:04:14','2025-04-19 16:04:14'),(6,12,50,1,NULL,'2025-04-19 16:04:14','2025-04-19 16:04:14'),(7,12,124,3,NULL,'2025-04-19 16:04:14','2025-04-19 16:04:14'),(8,12,65,1,NULL,'2025-04-19 16:04:14','2025-04-19 16:04:14'),(9,12,106,2,NULL,'2025-04-19 16:04:14','2025-04-19 16:04:14'),(10,17,86,2,NULL,'2025-04-19 16:04:14','2025-04-19 16:04:14'),(11,19,65,3,NULL,'2025-04-19 16:04:14','2025-04-19 16:04:14'),(12,19,94,2,NULL,'2025-04-19 16:04:14','2025-04-19 16:04:14'),(13,19,49,3,NULL,'2025-04-19 16:04:14','2025-04-19 16:04:14'),(14,19,89,3,NULL,'2025-04-19 16:04:14','2025-04-19 16:04:14'),(15,19,123,3,NULL,'2025-04-19 16:04:14','2025-04-19 16:04:14'),(16,8,80,1,NULL,'2025-04-19 16:04:14','2025-04-19 16:04:14'),(17,8,12,1,NULL,'2025-04-19 16:04:14','2025-04-19 16:04:14'),(18,8,9,3,NULL,'2025-04-19 16:04:14','2025-04-19 16:04:14'),(19,8,2,2,NULL,'2025-04-19 16:04:14','2025-04-19 16:04:14'),(20,8,84,1,NULL,'2025-04-19 16:04:14','2025-04-19 16:04:14'),(21,21,78,3,NULL,'2025-04-19 16:04:14','2025-04-19 16:04:14'),(22,21,85,1,NULL,'2025-04-19 16:04:14','2025-04-19 16:04:14'),(23,21,127,2,NULL,'2025-04-19 16:04:14','2025-04-19 16:04:14'),(24,20,96,3,NULL,'2025-04-19 16:04:14','2025-04-19 16:04:14'),(25,20,2,3,NULL,'2025-04-19 16:04:14','2025-04-19 16:04:14'),(26,20,49,3,NULL,'2025-04-19 16:04:14','2025-04-19 16:04:14'),(27,20,19,3,NULL,'2025-04-19 16:04:14','2025-04-19 16:04:14'),(28,20,34,2,NULL,'2025-04-19 16:04:14','2025-04-19 16:04:14'),(29,10,26,2,NULL,'2025-04-19 16:04:14','2025-04-19 16:04:14'),(30,10,89,3,NULL,'2025-04-19 16:04:14','2025-04-19 16:04:14'),(31,10,79,3,NULL,'2025-04-19 16:04:14','2025-04-19 16:04:14'),(32,22,29,1,'2025-04-20 13:12:03','2025-04-19 17:59:35','2025-04-19 17:59:35'),(33,22,28,2,'2025-04-20 13:12:03','2025-04-19 17:59:43','2025-04-19 17:59:47'),(34,22,129,1,'2025-04-21 14:31:25','2025-04-21 01:39:22','2025-04-21 01:39:22'),(35,22,128,1,'2025-04-21 14:31:25','2025-04-21 01:39:26','2025-04-21 01:39:26'),(36,22,127,1,'2025-04-21 14:31:25','2025-04-21 01:39:30','2025-04-21 01:39:30'),(37,22,110,4,'2025-04-21 14:43:29','2025-04-21 14:43:05','2025-04-21 14:43:17'),(38,24,129,1,'2025-04-23 17:31:27','2025-04-23 17:31:16','2025-04-23 17:31:16'),(39,24,129,2,'2025-04-23 17:37:03','2025-04-23 17:36:07','2025-04-23 17:36:58'),(40,24,128,2,'2025-04-23 17:37:03','2025-04-23 17:36:33','2025-04-23 17:36:59'),(41,24,130,1,'2025-04-23 17:37:02','2025-04-23 17:36:37','2025-04-23 17:36:37'),(42,24,127,1,'2025-04-23 17:37:03','2025-04-23 17:36:40','2025-04-23 17:36:40'),(43,24,129,1,'2025-04-24 08:08:14','2025-04-24 07:59:56','2025-04-24 07:59:56'),(44,24,125,1,'2025-04-24 08:08:14','2025-04-24 08:00:02','2025-04-24 08:00:02'),(45,24,123,1,'2025-04-24 08:08:14','2025-04-24 08:00:08','2025-04-24 08:00:08'),(46,24,129,1,'2025-04-24 08:57:50','2025-04-24 08:40:46','2025-04-24 08:40:46'),(47,24,108,1,'2025-04-24 09:00:43','2025-04-24 08:57:40','2025-04-24 08:57:40'),(48,24,120,4,'2025-04-24 15:23:04','2025-04-24 15:22:34','2025-04-24 15:23:02'),(49,26,129,1,'2025-04-26 19:24:06','2025-04-25 14:38:41','2025-04-25 14:38:41'),(50,26,140,1,'2025-04-26 20:27:19','2025-04-26 20:27:11','2025-04-26 20:27:11'),(51,26,132,1,'2025-04-26 20:28:06','2025-04-26 20:27:59','2025-04-26 20:27:59'),(52,26,126,1,'2025-04-26 20:28:45','2025-04-26 20:28:36','2025-04-26 20:28:36'),(53,26,142,1,NULL,'2025-04-26 21:54:45','2025-04-26 21:54:45'),(54,26,147,1,NULL,'2025-04-26 22:37:44','2025-04-26 22:37:44'),(55,26,159,1,NULL,'2025-04-26 22:38:39','2025-04-26 22:38:39'),(56,26,157,1,NULL,'2025-04-26 22:42:10','2025-04-26 22:42:10');
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `name_2` (`name`),
  UNIQUE KEY `name_3` (`name`),
  UNIQUE KEY `name_4` (`name`),
  UNIQUE KEY `name_5` (`name`),
  UNIQUE KEY `name_6` (`name`),
  UNIQUE KEY `name_7` (`name`),
  UNIQUE KEY `name_8` (`name`),
  UNIQUE KEY `name_9` (`name`),
  UNIQUE KEY `name_10` (`name`),
  UNIQUE KEY `name_11` (`name`),
  UNIQUE KEY `name_12` (`name`),
  UNIQUE KEY `name_13` (`name`),
  UNIQUE KEY `name_14` (`name`),
  UNIQUE KEY `name_15` (`name`),
  UNIQUE KEY `name_16` (`name`),
  UNIQUE KEY `name_17` (`name`),
  UNIQUE KEY `name_18` (`name`),
  UNIQUE KEY `name_19` (`name`),
  UNIQUE KEY `name_20` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Game Mobile',NULL,'2025-04-19 16:02:47','2025-04-19 16:02:47'),(2,'Game Web',NULL,'2025-04-19 16:02:47','2025-04-19 16:02:47'),(3,'Blocktrain',NULL,'2025-04-19 16:02:47','2025-04-19 16:02:47'),(4,'Electronics',NULL,'2025-04-19 16:04:13','2025-04-19 16:04:13'),(5,'Clothing',NULL,'2025-04-19 16:04:13','2025-04-19 16:04:13'),(6,'Home & Kitchen',NULL,'2025-04-19 16:04:13','2025-04-19 16:04:13'),(7,'Books',NULL,'2025-04-19 16:04:13','2025-04-19 16:04:13'),(8,'Sports & Outdoors',NULL,'2025-04-19 16:04:13','2025-04-19 16:04:13'),(9,'Beauty & Personal Care',NULL,'2025-04-19 16:04:13','2025-04-19 16:04:13'),(10,'Toys & Games',NULL,'2025-04-19 16:04:13','2025-04-19 16:04:13'),(11,'Health & Household',NULL,'2025-04-19 16:04:13','2025-04-19 16:04:13'),(12,'Automotive',NULL,'2025-04-19 16:04:13','2025-04-19 16:04:13'),(13,'Office Products',NULL,'2025-04-19 16:04:13','2025-04-19 16:04:13');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conversations`
--

DROP TABLE IF EXISTS `conversations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conversations` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `userId` int DEFAULT NULL,
  `status` enum('active','ended') DEFAULT 'active',
  `rating` int DEFAULT NULL,
  `feedback` text,
  `sessionId` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `conversations_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `conversations_ibfk_10` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `conversations_ibfk_11` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `conversations_ibfk_12` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `conversations_ibfk_13` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `conversations_ibfk_14` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `conversations_ibfk_15` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `conversations_ibfk_16` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `conversations_ibfk_17` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `conversations_ibfk_18` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `conversations_ibfk_19` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `conversations_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `conversations_ibfk_20` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `conversations_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `conversations_ibfk_4` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `conversations_ibfk_5` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `conversations_ibfk_6` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `conversations_ibfk_7` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `conversations_ibfk_8` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `conversations_ibfk_9` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conversations`
--

LOCK TABLES `conversations` WRITE;
/*!40000 ALTER TABLE `conversations` DISABLE KEYS */;
/*!40000 ALTER TABLE `conversations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `examples`
--

DROP TABLE IF EXISTS `examples`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `examples` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `name_2` (`name`),
  UNIQUE KEY `name_3` (`name`),
  UNIQUE KEY `name_4` (`name`),
  UNIQUE KEY `name_5` (`name`),
  UNIQUE KEY `name_6` (`name`),
  UNIQUE KEY `name_7` (`name`),
  UNIQUE KEY `name_8` (`name`),
  UNIQUE KEY `name_9` (`name`),
  UNIQUE KEY `name_10` (`name`),
  UNIQUE KEY `name_11` (`name`),
  UNIQUE KEY `name_12` (`name`),
  UNIQUE KEY `name_13` (`name`),
  UNIQUE KEY `name_14` (`name`),
  UNIQUE KEY `name_15` (`name`),
  UNIQUE KEY `name_16` (`name`),
  UNIQUE KEY `name_17` (`name`),
  UNIQUE KEY `name_18` (`name`),
  UNIQUE KEY `name_19` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `examples`
--

LOCK TABLES `examples` WRITE;
/*!40000 ALTER TABLE `examples` DISABLE KEYS */;
/*!40000 ALTER TABLE `examples` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `conversationId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `content` text NOT NULL,
  `sender` enum('user','bot') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `conversationId` (`conversationId`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`conversationId`) REFERENCES `conversations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `messages_ibfk_10` FOREIGN KEY (`conversationId`) REFERENCES `conversations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `messages_ibfk_11` FOREIGN KEY (`conversationId`) REFERENCES `conversations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `messages_ibfk_12` FOREIGN KEY (`conversationId`) REFERENCES `conversations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `messages_ibfk_13` FOREIGN KEY (`conversationId`) REFERENCES `conversations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `messages_ibfk_14` FOREIGN KEY (`conversationId`) REFERENCES `conversations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `messages_ibfk_15` FOREIGN KEY (`conversationId`) REFERENCES `conversations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `messages_ibfk_16` FOREIGN KEY (`conversationId`) REFERENCES `conversations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `messages_ibfk_17` FOREIGN KEY (`conversationId`) REFERENCES `conversations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `messages_ibfk_18` FOREIGN KEY (`conversationId`) REFERENCES `conversations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `messages_ibfk_19` FOREIGN KEY (`conversationId`) REFERENCES `conversations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`conversationId`) REFERENCES `conversations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `messages_ibfk_20` FOREIGN KEY (`conversationId`) REFERENCES `conversations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `messages_ibfk_3` FOREIGN KEY (`conversationId`) REFERENCES `conversations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `messages_ibfk_4` FOREIGN KEY (`conversationId`) REFERENCES `conversations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `messages_ibfk_5` FOREIGN KEY (`conversationId`) REFERENCES `conversations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `messages_ibfk_6` FOREIGN KEY (`conversationId`) REFERENCES `conversations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `messages_ibfk_7` FOREIGN KEY (`conversationId`) REFERENCES `conversations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `messages_ibfk_8` FOREIGN KEY (`conversationId`) REFERENCES `conversations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `messages_ibfk_9` FOREIGN KEY (`conversationId`) REFERENCES `conversations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_products`
--

DROP TABLE IF EXISTS `order_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_products` (
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `price` decimal(10,2) NOT NULL,
  `licence` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`order_id`,`product_id`),
  UNIQUE KEY `order_products_order_id_product_id_unique` (`order_id`,`product_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_products_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_products_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_products`
--

LOCK TABLES `order_products` WRITE;
/*!40000 ALTER TABLE `order_products` DISABLE KEYS */;
INSERT INTO `order_products` VALUES (1,48,2,268.45,'BHQSSAMQIE','2024-12-28 19:41:14','2024-12-28 19:41:14'),(1,51,2,333.00,'V1XTXYNGML','2024-12-28 19:41:14','2024-12-28 19:41:14'),(1,110,1,451.72,'HHHTT3UBFO','2024-12-28 19:41:14','2024-12-28 19:41:14'),(2,22,3,95.46,'PCBGOD4YPK','2024-05-10 21:31:52','2024-05-10 21:31:52'),(2,98,3,87.32,'QSAKHOMKTY','2024-05-10 21:31:52','2024-05-10 21:31:52'),(2,116,1,319.95,'PJEBG1DMLA','2024-05-10 21:31:52','2024-05-10 21:31:52'),(3,22,1,95.46,'9FCU3FYEDD','2025-02-04 07:05:58','2025-02-04 07:05:58'),(3,82,3,184.80,'LDZHI57NV8','2025-02-04 07:05:58','2025-02-04 07:05:58'),(4,9,3,13.00,'GZSYNFFR7U','2025-01-14 18:04:06','2025-01-14 18:04:06'),(5,2,2,183.87,'2PJ6A0GQSS','2024-10-01 19:10:51','2024-10-01 19:10:51'),(5,95,2,58.08,'QCK2HVQEDE','2024-10-01 19:10:51','2024-10-01 19:10:51'),(6,88,1,242.00,'JWIFZGKMZH','2024-09-09 06:18:58','2024-09-09 06:18:58'),(6,110,1,451.72,'BYSJAJ8XEH','2024-09-09 06:18:58','2024-09-09 06:18:58'),(6,112,3,122.40,'UCFLNTJENE','2024-09-09 06:18:58','2024-09-09 06:18:58'),(6,116,2,319.95,'JGHFLJP5UP','2024-09-09 06:18:58','2024-09-09 06:18:58'),(7,22,2,95.46,'VRJ8JMKDHO','2025-01-06 16:47:57','2025-01-06 16:47:57'),(7,58,1,204.00,'4DXTRH0HVL','2025-01-06 16:47:57','2025-01-06 16:47:57'),(8,5,1,43.00,'DYUAQC72QJ','2024-08-05 07:11:48','2024-08-05 07:11:48'),(8,53,2,334.08,'GHCOY68Y6B','2024-08-05 07:11:48','2024-08-05 07:11:48'),(8,106,2,257.69,'FCRCGASN30','2024-08-05 07:11:48','2024-08-05 07:11:48'),(9,1,1,87.36,'Q79R6AH7TD','2024-10-09 19:07:52','2024-10-09 19:07:52'),(9,26,2,331.65,'RIJQONVD15','2024-10-09 19:07:52','2024-10-09 19:07:52'),(9,97,1,191.35,'RCQ2BXWA4F','2024-10-09 19:07:52','2024-10-09 19:07:52'),(10,70,1,468.00,'WHHNDM9HLU','2024-08-29 12:52:21','2024-08-29 12:52:21'),(11,37,3,39.20,'NTHWFTYIPJ','2025-03-26 08:11:08','2025-03-26 08:11:08'),(11,84,3,214.06,'BDCFXCYBDN','2025-03-26 08:11:08','2025-03-26 08:11:08'),(11,94,1,168.00,'PIPQXFYBM8','2025-03-26 08:11:08','2025-03-26 08:11:08'),(11,105,2,378.02,'STRNY45LPH','2025-03-26 08:11:08','2025-03-26 08:11:08'),(12,3,3,9.96,'IJFOB17PKQ','2025-02-09 10:32:13','2025-02-09 10:32:13'),(12,53,1,334.08,'07TUKVOOU3','2025-02-09 10:32:13','2025-02-09 10:32:13'),(12,64,2,118.37,'1ETORCQ9TE','2025-02-09 10:32:13','2025-02-09 10:32:13'),(12,80,1,147.20,'WLTPH221XF','2025-02-09 10:32:13','2025-02-09 10:32:13'),(13,118,3,387.99,'IFEFS8KPUP','2024-05-28 22:38:15','2024-05-28 22:38:15'),(14,33,2,251.20,'RJKV1SKPMA','2024-08-24 20:12:24','2024-08-24 20:12:24'),(14,95,2,58.08,'WZZRPOQAPJ','2024-08-24 20:12:24','2024-08-24 20:12:24'),(14,104,2,448.00,'GKNATOTKSZ','2024-08-24 20:12:24','2024-08-24 20:12:24'),(15,28,3,134.40,'UD3SCUIYUB','2025-03-08 10:42:21','2025-03-08 10:42:21'),(15,79,2,198.00,'T7FE1O6GDC','2025-03-08 10:42:21','2025-03-08 10:42:21'),(15,92,2,33.18,'SIASBGPHAG','2025-03-08 10:42:21','2025-03-08 10:42:21'),(16,69,3,102.00,'MITRVNBSJX','2025-01-09 21:19:35','2025-01-09 21:19:35'),(16,117,3,384.58,'L7F7FVGKRC','2025-01-09 21:19:35','2025-01-09 21:19:35'),(17,52,2,211.00,'M2JZ6PVIOZ','2024-06-22 11:01:01','2024-06-22 11:01:01'),(17,53,1,334.08,'OQCNAZKLWK','2024-06-22 11:01:01','2024-06-22 11:01:01'),(17,108,1,280.00,'XMUKOLVTU0','2024-06-22 11:01:01','2024-06-22 11:01:01'),(18,78,2,110.00,'BA3NVLP2AI','2025-02-24 12:38:56','2025-02-24 12:38:56'),(19,9,1,13.00,'4MRGDVMRX5','2025-04-19 04:40:29','2025-04-19 04:40:29'),(19,78,1,110.00,'CH7O4CZXKR','2025-04-19 04:40:29','2025-04-19 04:40:29'),(19,79,3,198.00,'Y5UO86OUEN','2025-04-19 04:40:29','2025-04-19 04:40:29'),(20,1,2,87.36,'3RRHX9TJTN','2024-07-04 13:30:34','2024-07-04 13:30:34'),(20,123,1,406.00,'PA7LITBHCQ','2024-07-04 13:30:34','2024-07-04 13:30:34'),(21,46,3,21.36,'QUNUPAZYNS','2024-08-09 00:30:23','2024-08-09 00:30:23'),(21,48,2,268.45,'MEZHDIQMY1','2024-08-09 00:30:23','2024-08-09 00:30:23'),(21,100,1,54.67,'40F0VKVE7M','2024-08-09 00:30:23','2024-08-09 00:30:23'),(22,24,2,333.00,'5QEWSITAME','2024-12-26 16:27:06','2024-12-26 16:27:06'),(23,23,3,99.12,'C6HVK1JYSM','2024-10-11 07:15:49','2024-10-11 07:15:49'),(24,53,2,334.08,'QCITTIJLQ0','2024-12-29 14:53:26','2024-12-29 14:53:26'),(24,105,3,378.02,'CDHUKPU4LX','2024-12-29 14:53:26','2024-12-29 14:53:26'),(25,114,1,174.47,'MUZHF06ZRC','2024-06-14 01:18:12','2024-06-14 01:18:12'),(26,66,2,106.11,'DD8CV4KBYC','2024-09-13 01:56:16','2024-09-13 01:56:16'),(26,124,2,248.00,'3KHPMXC8JR','2024-09-13 01:56:16','2024-09-13 01:56:16'),(27,102,3,100.08,'JWN96O44Q7','2024-07-30 05:07:10','2024-07-30 05:07:10'),(28,100,2,54.67,'T3EZRLJTPA','2024-11-01 18:06:56','2024-11-01 18:06:56'),(29,31,1,319.00,'SXALOCTCGU','2024-10-02 13:51:36','2024-10-02 13:51:36'),(29,35,2,219.45,'UFOEU9HHKE','2024-10-02 13:51:36','2024-10-02 13:51:36'),(29,50,1,397.10,'HVMWFROMH7','2024-10-02 13:51:36','2024-10-02 13:51:36'),(29,83,3,191.00,'2TBZLUCP1Z','2024-10-02 13:51:36','2024-10-02 13:51:36'),(30,53,3,334.08,'RVNNIYUZTR','2024-07-06 21:31:44','2024-07-06 21:31:44'),(31,28,2,134.40,NULL,'2025-04-20 13:12:03','2025-04-20 13:12:03'),(31,29,1,196.91,NULL,'2025-04-20 13:12:03','2025-04-20 13:12:03'),(32,127,1,304.78,NULL,'2025-04-21 14:31:25','2025-04-21 14:31:25'),(32,128,1,262.80,NULL,'2025-04-21 14:31:25','2025-04-21 14:31:25'),(32,129,1,388.00,NULL,'2025-04-21 14:31:25','2025-04-21 14:31:25'),(33,110,4,451.72,NULL,'2025-04-21 14:43:29','2025-04-21 14:43:29'),(34,129,1,388.00,NULL,'2025-04-23 17:31:27','2025-04-23 17:31:27'),(35,127,1,304.78,NULL,'2025-04-23 17:37:03','2025-04-23 17:37:03'),(35,128,2,262.80,NULL,'2025-04-23 17:37:03','2025-04-23 17:37:03'),(35,129,2,388.00,NULL,'2025-04-23 17:37:03','2025-04-23 17:37:03'),(36,123,1,406.00,NULL,'2025-04-24 08:08:14','2025-04-24 08:08:14'),(36,125,1,68.00,NULL,'2025-04-24 08:08:14','2025-04-24 08:08:14'),(36,129,1,388.00,NULL,'2025-04-24 08:08:14','2025-04-24 08:08:14'),(37,108,1,280.00,NULL,'2025-04-24 09:00:43','2025-04-24 09:00:43'),(38,120,4,368.14,NULL,'2025-04-24 15:23:04','2025-04-24 15:23:04'),(39,129,1,388.00,NULL,'2025-04-26 19:24:06','2025-04-26 19:24:06'),(40,140,1,0.00,NULL,'2025-04-26 20:27:19','2025-04-26 20:27:19'),(41,132,1,0.00,NULL,'2025-04-26 20:28:06','2025-04-26 20:28:06'),(42,126,1,349.28,NULL,'2025-04-26 20:28:45','2025-04-26 20:28:45');
/*!40000 ALTER TABLE `order_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cid` int NOT NULL,
  `payment_method` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `status` enum('pending','processing','completed','cancelled') NOT NULL DEFAULT 'pending',
  `transaction_id` varchar(255) DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `transaction_id` (`transaction_id`),
  UNIQUE KEY `transaction_id_2` (`transaction_id`),
  UNIQUE KEY `transaction_id_3` (`transaction_id`),
  UNIQUE KEY `transaction_id_4` (`transaction_id`),
  UNIQUE KEY `transaction_id_5` (`transaction_id`),
  UNIQUE KEY `transaction_id_6` (`transaction_id`),
  UNIQUE KEY `transaction_id_7` (`transaction_id`),
  UNIQUE KEY `transaction_id_8` (`transaction_id`),
  UNIQUE KEY `transaction_id_9` (`transaction_id`),
  UNIQUE KEY `transaction_id_10` (`transaction_id`),
  UNIQUE KEY `transaction_id_11` (`transaction_id`),
  UNIQUE KEY `transaction_id_12` (`transaction_id`),
  UNIQUE KEY `transaction_id_13` (`transaction_id`),
  UNIQUE KEY `transaction_id_14` (`transaction_id`),
  UNIQUE KEY `transaction_id_15` (`transaction_id`),
  UNIQUE KEY `transaction_id_16` (`transaction_id`),
  UNIQUE KEY `transaction_id_17` (`transaction_id`),
  UNIQUE KEY `transaction_id_18` (`transaction_id`),
  UNIQUE KEY `transaction_id_19` (`transaction_id`),
  KEY `cid` (`cid`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`cid`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,4,2,920.45,'processing','4a6d5bff-bd9d-4685-9b3c-5ed2543bde6b',NULL,'2024-12-28 19:41:14','2024-12-28 19:41:14'),(2,16,1,1501.41,'pending','e1bdd1fe-64a7-48a4-a9b9-43d7887a55e5',NULL,'2024-05-10 21:31:52','2024-05-10 21:31:52'),(3,16,2,1232.12,'processing','8905e502-9574-4716-bb67-40a51ce28089',NULL,'2025-02-04 07:05:58','2025-02-04 07:05:58'),(4,16,2,268.00,'pending','5436b90b-052e-480f-bd03-8d4fb139c9c0',NULL,'2025-01-14 18:04:06','2025-01-14 18:04:06'),(5,12,1,1282.42,'completed','1590b6a1-8bd5-44c6-ae98-b30f0af494c1',NULL,'2024-10-01 19:10:51','2024-10-01 19:10:51'),(6,12,2,692.96,'processing','9881e226-f6a3-4938-8fa2-c1aafc1b80ab',NULL,'2024-09-09 06:18:58','2024-09-09 06:18:58'),(7,17,1,979.82,'pending','f28ac5c5-9e5d-4c62-9cc4-5c8efc5c6871',NULL,'2025-01-06 16:47:57','2025-01-06 16:47:57'),(8,17,2,512.22,'pending','2f1943de-90a5-487a-81f9-6001712c4df0',NULL,'2024-08-05 07:11:48','2024-08-05 07:11:48'),(9,19,2,1167.08,'pending','01afa24b-baf3-4939-ba4c-e420691ac53e',NULL,'2024-10-09 19:07:52','2024-10-09 19:07:52'),(10,19,2,914.34,'completed','ed36bf5a-a31c-476f-b429-d9c5f4756655',NULL,'2024-08-29 12:52:21','2024-08-29 12:52:21'),(11,19,1,2744.16,'completed','57c99b53-191e-46bc-aa23-cf2faeea3d97',NULL,'2025-03-26 08:11:08','2025-03-26 08:11:08'),(12,8,1,2528.66,'processing','210b09b8-8524-4da0-a72d-bdaf11b67732',NULL,'2025-02-09 10:32:13','2025-02-09 10:32:13'),(13,8,2,1355.16,'completed','99fffed3-a00f-45ed-8bd5-9270145a1dcf',NULL,'2024-05-28 22:38:15','2024-05-28 22:38:15'),(14,8,1,2012.71,'pending','7d00176d-798a-42e6-a53d-a66bf39179d0',NULL,'2024-08-24 20:12:24','2024-08-24 20:12:24'),(15,21,1,2608.50,'completed','1901291b-5825-48e0-b5a8-2ce1854944f8',NULL,'2025-03-08 10:42:21','2025-03-08 10:42:21'),(16,21,1,609.01,'processing','2fdb0fea-7995-49ac-9352-612cc07cc56d',NULL,'2025-01-09 21:19:35','2025-01-09 21:19:35'),(17,20,1,604.04,'completed','7773801d-fb80-4665-aa04-8ecd255ae5e6',NULL,'2024-06-22 11:01:01','2024-06-22 11:01:01'),(18,20,1,646.20,'completed','32162af5-59fc-413e-9697-816042fd1b5a',NULL,'2025-02-24 12:38:56','2025-02-24 12:38:56'),(19,10,1,1618.34,'processing','e08917ed-deb4-4d16-a418-e10f80cf87dd',NULL,'2025-04-19 04:40:29','2025-04-19 04:40:29'),(20,10,2,1110.90,'pending','0773f0ee-b7cf-45b5-93c5-2f4c8eba5919',NULL,'2024-07-04 13:30:34','2024-07-04 13:30:34'),(21,9,2,1863.71,'pending','c99cf1ac-be05-42e9-91a6-a1dc2b175cea',NULL,'2024-08-09 00:30:23','2024-08-09 00:30:23'),(22,5,2,382.70,'pending','eae42581-824c-49ef-85d2-73be154d1047',NULL,'2024-12-26 16:27:06','2024-12-26 16:27:06'),(23,5,2,366.00,'processing','6c1ae989-6599-4949-a1e2-a3a73d170886',NULL,'2024-10-11 07:15:49','2024-10-11 07:15:49'),(24,5,2,951.53,'pending','3a39636d-8a94-440a-a9de-3102f3a68b98',NULL,'2024-12-29 14:53:26','2024-12-29 14:53:26'),(25,14,2,184.50,'processing','b0b1c5cd-c2c0-4506-8a42-423f68c5a92c',NULL,'2024-06-14 01:18:12','2024-06-14 01:18:12'),(26,14,2,666.96,'processing','553c8144-21c1-4502-88fd-661008ad4f44',NULL,'2024-09-13 01:56:16','2024-09-13 01:56:16'),(27,14,1,355.11,'pending','770793f2-d5fa-484a-98bf-18280a2861c1',NULL,'2024-07-30 05:07:10','2024-07-30 05:07:10'),(28,2,1,196.91,'completed','39db692d-d0f2-4fbc-a306-d8231a8b2fda',NULL,'2024-11-01 18:06:56','2024-11-01 18:06:56'),(29,13,2,2997.48,'processing','5ef4f473-4467-465b-881e-ec19bb7e577e',NULL,'2024-10-02 13:51:36','2024-10-02 13:51:36'),(30,13,1,496.00,'processing','6ab979cd-1ea3-46c2-abb7-f771efc03f5e',NULL,'2024-07-06 21:31:44','2024-07-06 21:31:44'),(31,22,1,465.71,'pending',NULL,NULL,'2025-04-20 13:12:03','2025-04-20 13:12:03'),(32,22,1,955.58,'pending',NULL,NULL,'2025-04-21 14:31:24','2025-04-21 14:31:24'),(33,22,1,1806.88,'pending',NULL,NULL,'2025-04-21 14:43:29','2025-04-21 14:43:29'),(34,24,1,388.00,'pending',NULL,NULL,'2025-04-23 17:31:27','2025-04-23 17:31:27'),(35,24,1,1606.38,'pending',NULL,NULL,'2025-04-23 17:37:03','2025-04-23 17:37:03'),(36,24,1,862.00,'pending',NULL,NULL,'2025-04-24 08:08:14','2025-04-24 08:08:14'),(37,24,1,280.00,'pending',NULL,NULL,'2025-04-24 09:00:43','2025-04-24 09:00:43'),(38,24,1,1472.56,'pending',NULL,NULL,'2025-04-24 15:23:04','2025-04-24 15:23:04'),(39,26,1,388.00,'pending',NULL,NULL,'2025-04-26 19:24:06','2025-04-26 19:24:06'),(40,26,1,0.00,'pending',NULL,NULL,'2025-04-26 20:27:19','2025-04-26 20:27:19'),(41,26,1,0.00,'pending',NULL,NULL,'2025-04-26 20:28:06','2025-04-26 20:28:06'),(42,26,1,349.28,'pending',NULL,NULL,'2025-04-26 20:28:45','2025-04-26 20:28:45');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `user_id` int NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (15,'Debeo tubineus ipsa. Volaticus verumtamen aggero uter soluta cui vereor voluptas vulgivagus cultura. Corroboro vinculum curvo.\nCicuta audacia cupiditate beneficium arcus summopere. Teres ea aro illum tendo praesentium tollo deripio. Subito corona decet vitium.\nVerbum clam cattus aegrus deserunt tredecim strues quo paens. Ipsum tardus vitae crebro abduco vero accommodo modi amita cenaculum. Thorax vitiosus colligo est cavus tyrannus arto aestus bis.\nSollicito vito tergiversatio depono. Ater deprimo arguo aperiam cometes accusantium. Solio solum vinculum advoco stipes amita somniculosus.\nUllam corrumpo cras ocer alienus cogo causa possimus depulso sordeo. Cursus theatrum carcer curiositas ipsam temperantia verus arbustum. Delicate veritas absque stillicidium.',15,NULL,'2025-04-19 16:04:14','2025-04-19 16:04:14'),(16,'<header class=\"entry-header\">\n<h1 class=\"entry-title mb uppercase\">Buying Guide</h1>\n</header>\n<p>&nbsp;</p>\n<p>To purchase on the website thanhtruckb.com, customers please follow the instructions below:</p>\n<p><strong>Step 1:&nbsp;</strong>Select the Games category you want.</p>\n<p><img class=\"img-fluid rounded mx-auto d-block\" src=\"../BuyingGuideS1.png\" alt=\"BuyingGuideS1\" width=\"667\" height=\"352\"></p>\n<p>&nbsp;</p>\n<p><strong>Step 2:&nbsp;</strong>The system moves to the game list page you have chosen.&nbsp; Next, Click on the product to see product details.</p>\n<p><img class=\"img-fluid rounded mx-auto d-block\" src=\"../BuyingGuideS2.png\" alt=\"BuyingGuideS2\" width=\"564\" height=\"289\"></p>\n<p>&nbsp;</p>\n<p><strong>Step 3:</strong>&nbsp;Product information will appear. &nbsp;Next, Add products to your cart.</p>\n<p><img class=\"img-fluid rounded mx-auto d-block\" src=\"../BuyingGuideS3.png\" alt=\"BuyingGuideS3\" width=\"519\" height=\"267\"></p>\n<p>There will be an additional product notice to the successful shopping cart.</p>\n<p>&nbsp;</p>\n<p><strong>Step 4:</strong>&nbsp;You need to visit the shopping cart page via&nbsp;<strong>Icon Cart</strong>.</p>\n<p>Then select<strong>Proceed to checkout</strong>&nbsp;to choose the payment method.</p>\n<p><img class=\"img-fluid rounded mx-auto d-block\" src=\"../BGS6.png\" alt=\"BuyingGuideS3\" width=\"535\" height=\"198\"></p>\n<p>&nbsp;</p>\n<p>The system will transfer you to the payment page.</p>\n<p><strong>Step 5:</strong>&nbsp;You can see the product information and choose the payment method here.</p>\n<p>If you choose to pay by payment card, select<strong>The Debit or Credit</strong>.</p>\n<p>If you choose to pay via Paypal, select<strong>Paypal</strong>.</p>\n<p><img class=\"img-fluid rounded mx-auto d-block\" src=\"../BGS2.png\" alt=\"BuyingGuideS3\" width=\"541\" height=\"308\"></p>\n<p>&nbsp;</p>\n<p><strong>The Debit or Credit&nbsp;</strong>After completing the card information, choose to pay to complete the purchase.</p>\n<p>Then enter the information</p>\n<p><img class=\"img-fluid rounded mx-auto d-block\" src=\"../BGS3.png\" alt=\"BuyingGuideS3\" width=\"600\" height=\"337\"></p>\n<p>&nbsp;</p>\n<p><strong>Step 6:</strong>&nbsp;You will be able to enter a successful purchase notification.</p>\n<p>Order successful display screen</p>\n<p><img class=\"img-fluid rounded mx-auto d-block\" src=\"../BGS4.png\" alt=\"BuyingGuideS3\" width=\"574\" height=\"250\"></p>\n<p>&nbsp;</p>\n<p><strong>Step 7:</strong>&nbsp;Now you can check your email to receive the product link.</p>\n<p><span style=\"background-color: #000000;\"><img class=\"img-fluid rounded mx-auto d-block\" src=\"../BGS5.png\" alt=\"BuyingGuideS3\" width=\"577\" height=\"288\"></span></p>\n<p>&nbsp;</p>',22,NULL,'2025-04-23 17:19:13','2025-04-26 23:38:12'),(17,'<header class=\"entry-header\">\n<h1 class=\"entry-title mb uppercase\">Privacy Policy</h1>\n</header>\n<p>Thanhtruckb supports entrepreneurs everywhere, creating more inclusive opportunities for everyone. We also help you manage your privacy preferences and exercise your privacy rights when visiting our website, using our services, and communicating with us.</p>\n<p>Personal data includes data that identifies or can be used to identify a specific person, along with any data about that person. For example, your name, address, and payment information are personal data.<br>We act as a controller when we process personal data for our own use. For example, we act as a controller when you provide personal data to open an account.<br>This notice does not apply when our customers or others process personal data for their own benefit. For example, when a customer sends emails for their own business purposes that include personal data, the customer acts as a &ldquo;controller.&rdquo; When our customer acts as a controller, we act as a &ldquo;processor&rdquo; and process personal data only on the customer&rsquo;s instructions or as required by law.</p>\n<p>This notice does not apply to third-party applications provided through our services or linked through our websites, such as Microsoft 365 and similar services. For information regarding the privacy practices of any third-party service, please review the privacy notice applicable to that service before using it.</p>\n<p><strong>Core Privacy Rights</strong><br>We recognise certain core privacy rights for all individuals:</p>\n<ul>\n<li><strong>The right to know what personal data we hold about you</strong></li>\n<li><strong>The right to access, correct or delete your personal data</strong></li>\n<li><strong>The right to port your personal data (data portability)</strong></li>\n<li><strong>The right to set your personal marketing and advertising preferences</strong></li>\n</ul>\n<p>Where appropriate and technically feasible, we will provide self-service and automated mechanisms to enable individuals to exercise their privacy rights. We also manually review requests to exercise privacy rights where self-service mechanisms are not appropriate or feasible. We will promptly review such requests to exercise privacy rights. If we need further information to process the request, we will contact the requester by email or, if the requester does not have an email address on file, by the same method as the request was made.</p>\n<p>If we do not act on the request for legal or other reasons, we will explain why we are not acting on the request, the right to appeal and any rights to lodge a complaint (if available where the requester lives).</p>\n<p><strong>What we collect</strong></p>\n<p><strong>Personal data provided by individuals</strong><br>We collect personal data when customers or others set up an account, use our services or contact us. Examples of personal data we may collect include a person&rsquo;s name, email address, telephone number, physical address, and payment method.</p>\n<p><strong>Personal Data We Collect Automatically</strong><br>We automatically collect personal data when you visit our website, use our services, contact us, open our emails, or view our advertisements. Examples of personal data we may collect include your device ID, your IP address, information about the website and other websites you visit, and other similar details.</p>\n<p><strong>Personal Data from Other Sources</strong><br>We may collect personal data about you from other sources. Examples of personal data collected from other sources include publicly available data, social media information, and information lawfully collected by third-party data providers.</p>\n<p><strong>Personal Data We Generate</strong><br>We process data in connection with our business and services to generate inferences and insights that can be associated with a specific person, including through the use of data analytics and artificial intelligence.</p>\n<p><strong>Use of Personal Data</strong><br>We use personal data to operate and improve our business and services. Examples of how we use personal data include:</p>\n<ul>\n<li><strong>Managing customer accounts</strong></li>\n<li><strong>Processing purchase requests</strong></li>\n<li><strong>Providing products and services</strong></li>\n<li><strong>Providing customer support</strong></li>\n<li><strong>Securing, updating and improving our services</strong></li>\n<li><strong>Marketing and promoting our services</strong></li>\n<li><strong>Contacting customers, potential customers and others by phone, text or messaging apps to provide you with our services</strong></li>\n<li><strong>Other uses consistent with the purpose for which personal data was collected or provided to us</strong></li>\n<li><strong>Not selling personal data personal</strong></li>\n<li><strong>We do not sell, rent, lease or otherwise transfer personal data to third parties for financial or other consideration.</strong></li>\n</ul>\n<p><strong>Disclosure to Others</strong><br>We disclose personal data:</p>\n<ul>\n<li><strong>To processors to operate our business and provide services, including but not limited to providing security, payment processing and customer support; conducting competitions and surveys; generating data insights; and to perform other activities related to our business and services.</strong></li>\n<li><strong>To business partners to provide certain services, such as payment processing and email.</strong></li>\n<li><strong>To marketers and advertisers, including for the purpose of creating and delivering personalized marketing messages and advertisements.</strong></li>\n<li><strong>To comply with law enforcement and other legal requests, protect our legal rights, prevent harm to us or to others, and enforce our policies and contracts.</strong></li>\n<li><strong>In addition, if we sell some or all of our assets or merge with a third party, we reserve the right to transfer relevant personal data to the buyer or new company.</strong></li>\n</ul>\n<p>We manage some identification data directly. Other identifiers are managed by third parties. For example, we use Google Analytics to track website performance and visitor engagement.</p>\n<p>We provide several methods to manage optional identifier settings. Individuals using our websites can manage their identifier settings by clicking Manage Privacy Settings via the link in this notice. Customers can also manage their identifier settings for our websites and services through their customer account settings. We do not provide mandatory identifier management because such identifiers are essential to providing our products and services.</p>\n<p><strong>&ldquo;Do Not Track&rdquo; and Other Optional Signals</strong><br>Some web browsers offer a &ldquo;Do Not Track&rdquo; feature. There is no generally accepted standard for this feature, and we do not respond to &ldquo;Do Not Track&rdquo; signs.</p>\n<p>We recognize common opt-out mechanisms, such as General Privacy Controls, where required by applicable law.</p>\n<p><strong>Storage</strong><br>We store personal data on our own systems and with trusted service providers</p>\n<p><strong>Retention Period</strong><br>We retain personal data for as long as our business needs allow and to comply with the law. If we no longer need the personal data, we may delete or de-identify it so that it no longer identifies a specific person. We consider the following factors when deciding when to delete or deactivate your personal data: (1) whether you still have an account, (2) whether we are required to retain the personal data to comply with the law, or (3) whether the personal data is necessary for other business purposes for tax purposes.</p>\n<p><strong>Security</strong><br>We use risk-based measures to protect personal data, including appropriate security controls and employee training. We also require our service providers, business partners, and advertisers to use appropriate risk-based controls to protect personal data.</p>\n<p><strong>No personal data collected from children</strong><br>We do not knowingly collect personal data from children under the age of 18 without the consent of their legal guardian. Please contact us at thanhtrutinhbac@gmail.com if you believe that we have collected information from a child without the consent of their legal guardian.</p>\n<p><strong>Legal basis for processing</strong><br>We process personal data at the request of a person, with their consent, to perform a contract with us, based on our legitimate interests or other lawful grounds. The specific basis for processing depends on the service you are using, the data being processed, where the processing takes place and where you live. If you have any questions about the basis for processing your personal data, please contact us at thanhtrutinhbac@gmail.com.</p>\n<p><strong>Non-discrimination</strong><br>We will not discriminate against you for exercising your privacy rights.</p>\n<p><strong>No financial incentives</strong><br>We do not offer any financial incentives for providing us with personal data.</p>\n<p><strong>Changes to the policy</strong><br>We may amend this global privacy notice by posting the amended statement at the same location as this Notice, at another location on our website, or by contacting customers directly. If we change this global privacy notice, the content of the notice will only apply to personal data collected before the new statement applies to the extent that the new statement does not reduce the rights of affected data subjects.</p>\n<p><strong>Contact us</strong></p>\n<p>If you have any questions, you can contact us:</p>\n<p><strong>THANH TRUC KINH BAC COMPANY LIMITED</strong><br>Hotline:&nbsp;<strong>0949942222</strong><br>Email:&nbsp;<strong>thanhtruckinhbac@gmail.com</strong><br>Address:&nbsp;<strong>Do Nha Quarter, Phuong Lieu Ward, Que Vo Town, Bac Ninh Province</strong></p>',22,NULL,'2025-04-24 07:08:16','2025-04-24 07:08:16'),(18,'<header class=\"entry-header\">\n<h1 class=\"entry-title mb uppercase\">Payment policy</h1>\n</header>\n<p>Currently, when purchasing products online on the website https://thanhtruckb.com/, customers make payment in the following ways:</p>\n<p><strong>Bank transfer<br></strong><br>Customers transfer money to our bank account below:</p>\n<p>Account name:&nbsp;<strong>THANH TRUC KINH BAC COMPANY LIMITED</strong></p>\n<p>Account number:&nbsp;<strong>9683666666</strong></p>\n<p><strong>Military Commercial Joint Stock Bank (MBBank)</strong></p>\n<p>* Note: Before ordering and paying by bank transfer, please carefully check the information about the ordered product (product type, description image, introduction information&hellip;) along with the amount to be paid clearly displayed in the order information on the thanhtruckb.com website interface.</p>',22,NULL,'2025-04-24 07:08:32','2025-04-24 07:08:32'),(19,'<header class=\"entry-header\">\n<h1 class=\"entry-title mb uppercase\">Inspection policy</h1>\n</header>\n<p>To protect the interests of customers when shopping on thanhtruckb.com, we have a policy to support customers to check upon receipt. That is, when you receive the link from the email, you are allowed to install and check directly.</p>\n<p><em>*</em> For more information, please contact us via hotline: 0949942222.</p>',22,NULL,'2025-04-24 07:08:49','2025-04-24 07:08:49'),(20,'<header class=\"entry-header\">\n<h1 class=\"entry-title mb uppercase\">Complaints reception and handling process</h1>\n</header>\n<p><strong>Article 1: Resolution mechanism</strong></p>\n<p>All complaints from the Customer are resolved on the basis of negotiation. In case of failure to reach the desired agreement, either party has the right to bring the case to the competent State agency for resolution.</p>\n<p>In case of an incident due to the fault of&nbsp;<u>thanhtruckb.com</u>, we will immediately apply necessary measures to ensure the rights of the customer.</p>\n<p><strong>Article 2: Method of submitting complaints</strong></p>\n<p>Customers can submit complaints to request Thanh Truc Kinh Bac Company Limited to resolve them in the following ways:</p>\n<p>* Method 1: Call our hotline: 0949942222</p>\n<p>* Method 2: Send an email to the address:&nbsp;<a href=\"mailto:thanhtruckinhbac@gmail.com\">thanhtruckinhbac@gmail.com</a></p>\n<p>* Method 3: Directly to the address: Do Nha Quarter, Phuong Lieu Ward, Que Vo Town, Bac Ninh Province</p>\n<p><strong>Article 3: Implementation procedure</strong></p>\n<p><em>Step 1:</em>Submit a complaint</p>\n<p>Customers submit complaints about services or benefits that have not been fully guaranteed to Thanh Truc Kinh Bac Company Limited through the methods specified above.</p>\n<p><em>Step 2:</em>Receiving and handling complaints</p>\n<p>Thanh Truc Kinh Bac Company Limited will receive complaints from Customers and proceed to verify information.</p>\n<p><em>Step 3:</em>Responding to Customers</p>\n<p>Thanh Truc Kinh Bac Company Limited will respond to the results of handling complaints to Customers within 03 working days from the date of completion of information verification and processing.</p>\n<p>Thanh Truc Kinh Bac Company Limited will try to verify information and resolve complaints quickly and promptly to ensure the rights of Customers. In cases beyond the ability and authority of the Center, we will request the Customer to bring this case to a competent state agency for settlement in accordance with the law.</p>',22,NULL,'2025-04-24 07:09:01','2025-04-24 07:09:01'),(21,'<header class=\"entry-header\">\n<h1 class=\"entry-title mb uppercase\">Return and Refund Policy</h1>\n</header>\n<ol>\n<li><strong>Cases accepted for return (only applicable to physical products)</strong></li>\n</ol>\n<p>&ndash; The product has a defect due to the design and technical department of http://thanhtruckb.com/</p>\n<ol start=\"2\">\n<li><strong>Regulations on product return:</strong></li>\n</ol>\n<p>&ndash; The time for customers to contact to request a valid return is 03 working days from the time of receiving the product.</p>\n<p>&ndash; How to return: Customers need to notify the staff of http://thanhtruckb.com/ via phone number 0949942222 about the reason for return, address and correct contact phone number so that we can carry out the product return process as quickly as possible according to your request. We will ask customers to provide proof of purchase (photos, videos of unpacking) to have a basis for processing customers&rsquo; requests to exchange/return goods.</p>\n<p>For valid return requests (customers provide full information proving that they purchased the product on the website http://thanhtruckb.com/ and meet the return contact deadline), we will support customers to exchange new products.</p>\n<p>&ndash; Product return location: http://thanhtruckb.com/ encourages customers to bring the product directly to the store at the address: Do Nha Quarter, Phuong Lieu Ward, Que Vo Town, Bac Ninh Province so that we can check the product and customers can view and choose to exchange the product according to their needs. For customers in the province, you can send the product by post and contact the Company about the exchanged product, postal code&hellip; so that we can process and send the product back as soon as possible upon receiving the product.</p>\n<ol start=\"3\">\n<li><strong>Refund Policy</strong></li>\n</ol>\n<p>We do not refund all technology products after a successful transaction. All purchases are final and we do not offer any money back guarantees. You read and agree that you will not be refunded for any purchase under any circumstances.</p>',22,NULL,'2025-04-24 07:09:16','2025-04-24 07:09:16'),(22,'<header class=\"entry-header\">\n<h1 class=\"entry-title mb uppercase\">Warranty policy</h1>\n</header>\n<ol>\n<li style=\"font-weight: bold;\"><strong>Covered by the warranty:</strong></li>\n</ol>\n<p>&ndash; The product that has just been delivered is not as the image, description provided or on the website</p>\n<ol start=\"2\">\n<li style=\"font-weight: bold;\"><strong>Cases not covered by the warranty:</strong></li>\n</ol>\n<p>&ndash; The product is defective due to improper installation</p>\n<p>&ndash; The product is modified, the code is changed</p>\n<ol start=\"3\">\n<li style=\"font-weight: bold;\"><strong>Procedures, warranty methods and contact points</strong></li>\n</ol>\n<p><strong>We encourage you to send directly to the company\'s headquarters at the address: Do Nha Quarter, Phuong Lieu Ward, Que Vo Town, Bac Ninh Province, Vietnam for warranty support in the fastest time.</strong></p>\n<p><strong>In case you send the goods to thanhtruckb.com, the warranty period is expected to be within 3-5 days from the date thanhtruckb.com receive the goods. The specific warranty period depends on the product defect in each case.</strong></p>\n<p><strong>For answers to questions or detailed instructions about https://thanhtruckb.com/ , product warranty process, please contact 0949942222 phone number or email: thanhtruckinhbac@gmail.com</strong></p>\n<p>&nbsp;</p>',22,NULL,'2025-04-24 07:09:40','2025-04-26 23:25:29'),(23,'<p>&lt;section class=\"mt-4\"&gt;&lt;h1 class=\"entry-title mb uppercase\"&gt;Buying Guide&lt;/h1&gt;&lt;p class=\"lead\"&gt;Last updated: 4/27/2025&lt;/p&gt;&lt;p&gt;To purchase on the website thanhtruckb.com, customers please follow the instructions below:&lt;/p&gt;&lt;p&gt;&lt;strong&gt;Step 1: &lt;/strong&gt;Select the Games category you want.&lt;/p&gt;&lt;img class=\"img-fluid rounded mx-auto d-block\" alt=\"BuyingGuideS1\" src=\"/BuyingGuideS1.png\"&gt;&lt;p&gt;&amp;nbsp;&lt;/p&gt;&lt;p&gt;&lt;strong&gt;Step 2: &lt;/strong&gt;The system moves to the game list page you have chosen.&amp;nbsp; Next, Click on the product to see product details.&lt;/p&gt;&lt;img class=\"img-fluid rounded mx-auto d-block\" alt=\"BuyingGuideS2\" src=\"/BuyingGuideS2.png\"&gt;&lt;p&gt;&amp;nbsp;&lt;/p&gt;&lt;p&gt;&lt;strong&gt;Step 3:&lt;/strong&gt; Product information will appear. &amp;nbsp;Next, Add products to your cart.&lt;/p&gt;&lt;img class=\"img-fluid rounded mx-auto d-block\" alt=\"BuyingGuideS3\" src=\"/BuyingGuideS3.png\"&gt;&lt;p&gt;There will be an additional product notice to the successful shopping cart.&lt;/p&gt;&lt;p&gt;&amp;nbsp;&lt;/p&gt;&lt;p&gt;&lt;strong&gt;Step 4:&lt;/strong&gt; You need to visit the shopping cart page via &lt;strong&gt;Icon Cart&lt;/strong&gt;.&lt;/p&gt;&lt;p&gt;Then select&lt;strong&gt;Proceed to checkout&lt;/strong&gt; &nbsp;to choose the payment method.&lt;/p&gt;&lt;img class=\"img-fluid rounded mx-auto d-block\" alt=\"BuyingGuideS3\" src=\"/BGS6.png\"&gt;&lt;p&gt;&amp;nbsp;&lt;/p&gt;&lt;p&gt;The system will transfer you to the payment page.&lt;/p&gt;&lt;p&gt;&lt;strong&gt;Step 5:&lt;/strong&gt; You can see the product information and choose the payment method here.&lt;/p&gt;&lt;p&gt; If you choose to pay by payment card, select&lt;strong&gt;The Debit or Credit&lt;/strong&gt;.&lt;/p&gt;&lt;p&gt;If you choose to pay via Paypal, select&lt;strong&gt;Paypal&lt;/strong&gt;.&lt;/p&gt;&lt;img class=\"img-fluid rounded mx-auto d-block\" alt=\"BuyingGuideS3\" src=\"/BGS2.png\"&gt;&lt;p&gt;&amp;nbsp;&lt;/p&gt;&lt;p&gt;&lt;strong&gt;The Debit or Credit &lt;/strong&gt; &nbsp;After completing the card information, choose to pay to complete the purchase. &lt;/p&gt;&lt;p&gt; Then enter the information&lt;/p&gt;&lt;img class=\"img-fluid rounded mx-auto d-block\" alt=\"BuyingGuideS3\" src=\"/BGS3.png\"&gt;&lt;p&gt;&amp;nbsp;&lt;/p&gt;&lt;p&gt;&lt;strong&gt;Step 6:&lt;/strong&gt; &nbsp;You will be able to enter a successful purchase notification.&lt;/p&gt;&lt;p&gt;Order successful display screen&lt;/p&gt;&lt;img class=\"img-fluid rounded mx-auto d-block\" alt=\"BuyingGuideS3\" src=\"/BGS4.png\"&gt;&lt;p&gt;&amp;nbsp;&lt;/p&gt;&lt;p&gt;&lt;strong&gt;Step 7:&lt;/strong&gt; Now you can check your email to receive the product link.&lt;/p&gt;&lt;img class=\"img-fluid rounded mx-auto d-block\" alt=\"BuyingGuideS3\" src=\"/BGS5.png\"&gt;&lt;p&gt;&amp;nbsp;&lt;/p&gt;&lt;/section&gt;</p>',22,'2025-04-26 23:42:22','2025-04-26 23:41:10','2025-04-26 23:42:22'),(24,'<h1 class=\"entry-title mb uppercase\">Buying Guide</h1>\n<p class=\"lead\">Last updated:&nbsp;4/27/2025</p>\n<p>To purchase on the website thanhtruckb.com, customers please follow the instructions below:</p>\n<p><strong>Step 1:&nbsp;</strong>Select the Games category you want.</p>\n<p><img class=\"img-fluid rounded mx-auto d-block\" src=\"../BuyingGuideS1.png\" alt=\"BuyingGuideS1\"></p>\n<p>&nbsp;</p>\n<p><strong>Step 2:&nbsp;</strong>The system moves to the game list page you have chosen.&nbsp; Next, Click on the product to see product details.</p>\n<p><img class=\"img-fluid rounded mx-auto d-block\" src=\"../BuyingGuideS2.png\" alt=\"BuyingGuideS2\"></p>\n<p>&nbsp;</p>\n<p><strong>Step 3:</strong>&nbsp;Product information will appear. &nbsp;Next, Add products to your cart.</p>\n<p><img class=\"img-fluid rounded mx-auto d-block\" src=\"../BuyingGuideS3.png\" alt=\"BuyingGuideS3\"></p>\n<p>There will be an additional product notice to the successful shopping cart.</p>\n<p>&nbsp;</p>\n<p><strong>Step 4:</strong>&nbsp;You need to visit the shopping cart page via&nbsp;<strong>Icon Cart</strong>.</p>\n<p>Then select<strong>Proceed to checkout</strong>&nbsp;to choose the payment method.</p>\n<p><img class=\"img-fluid rounded mx-auto d-block\" src=\"../BGS6.png\" alt=\"BuyingGuideS3\"></p>\n<p>&nbsp;</p>\n<p>The system will transfer you to the payment page.</p>\n<p><strong>Step 5:</strong>&nbsp;You can see the product information and choose the payment method here.</p>\n<p>If you choose to pay by payment card, select<strong>The Debit or Credit</strong>.</p>\n<p>If you choose to pay via Paypal, select<strong>Paypal</strong>.</p>\n<p><img class=\"img-fluid rounded mx-auto d-block\" src=\"../BGS2.png\" alt=\"BuyingGuideS3\"></p>\n<p>&nbsp;</p>\n<p><strong>The Debit or Credit&nbsp;</strong>After completing the card information, choose to pay to complete the purchase.</p>\n<p>Then enter the information</p>\n<p><img class=\"img-fluid rounded mx-auto d-block\" src=\"../BGS3.png\" alt=\"BuyingGuideS3\"></p>\n<p>&nbsp;</p>\n<p><strong>Step 6:</strong>&nbsp;You will be able to enter a successful purchase notification.</p>\n<p>Order successful display screen</p>\n<p><img class=\"img-fluid rounded mx-auto d-block\" src=\"../BGS4.png\" alt=\"BuyingGuideS3\"></p>\n<p>&nbsp;</p>\n<p><strong>Step 7:</strong>&nbsp;Now you can check your email to receive the product link.</p>\n<p><img class=\"img-fluid rounded mx-auto d-block\" src=\"../BGS5.png\" alt=\"BuyingGuideS3\"></p>',22,'2025-04-26 23:42:19','2025-04-26 23:41:38','2025-04-26 23:42:19');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `type` int DEFAULT NULL,
  `description` text,
  `link` text,
  `is_hot` tinyint(1) DEFAULT '0',
  `is_new` tinyint(1) DEFAULT '0',
  `priceSale` decimal(10,2) NOT NULL,
  `priceOrigin` decimal(10,2) NOT NULL,
  `category_id` int NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=160 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Bespoke Bronze Shoes','https://source.unsplash.com/random/800x600?product=0',1,'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016','https://pristine-deed.org/',0,1,87.36,96.00,12,'2025-04-20 13:12:39','2025-04-19 16:04:13','2025-04-20 13:12:39'),(2,'Rustic Rubber Computer','https://source.unsplash.com/random/800x600?product=1',1,'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive','https://inferior-enjoyment.org',0,0,183.87,227.00,12,'2025-04-20 13:12:37','2025-04-19 16:04:13','2025-04-20 13:12:37'),(3,'Oriental Rubber Soap','https://source.unsplash.com/random/800x600?product=2',2,'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive','https://wordy-fibre.biz',0,0,9.96,12.00,12,'2025-04-20 13:12:32','2025-04-19 16:04:13','2025-04-20 13:12:32'),(4,'Handcrafted Soft Cheese','https://source.unsplash.com/random/800x600?product=3',2,'Boston\'s most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles','https://coarse-coast.net/',1,0,292.50,390.00,12,'2025-04-20 13:12:38','2025-04-19 16:04:13','2025-04-20 13:12:38'),(5,'Unbranded Steel Cheese','https://source.unsplash.com/random/800x600?product=4',1,'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support','https://valuable-round.biz/',0,0,43.00,43.00,12,'2025-04-20 13:12:30','2025-04-19 16:04:13','2025-04-20 13:12:30'),(6,'Electronic Wooden Fish','https://source.unsplash.com/random/800x600?product=5',1,'The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality','https://drafty-map.biz/',0,0,233.31,303.00,12,'2025-04-20 13:12:29','2025-04-19 16:04:13','2025-04-20 13:12:29'),(7,'Awesome Wooden Chicken','https://source.unsplash.com/random/800x600?product=6',2,'Boston\'s most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles','https://delightful-rifle.com/',0,1,369.00,369.00,12,'2025-04-20 13:12:27','2025-04-19 16:04:13','2025-04-20 13:12:27'),(8,'Sleek Fresh Soap','https://source.unsplash.com/random/800x600?product=7',2,'The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design','https://upset-complaint.info',0,1,346.00,346.00,12,'2025-04-20 13:12:56','2025-04-19 16:04:13','2025-04-20 13:12:56'),(9,'Licensed Soft Keyboard','https://source.unsplash.com/random/800x600?product=8',2,'The Football Is Good For Training And Recreational Purposes','https://gaseous-teenager.net',0,0,13.00,13.00,12,'2025-04-20 13:12:55','2025-04-19 16:04:13','2025-04-20 13:12:55'),(10,'Awesome Cotton Bacon','https://source.unsplash.com/random/800x600?product=9',2,'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016','https://scared-senate.info',0,0,313.00,313.00,12,'2025-04-20 13:12:52','2025-04-19 16:04:13','2025-04-20 13:12:52'),(11,'Handmade Bronze Table','https://source.unsplash.com/random/800x600?product=0',2,'The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality','https://wasteful-clavicle.net/',1,0,106.00,106.00,9,'2025-04-20 13:12:51','2025-04-19 16:04:13','2025-04-20 13:12:51'),(12,'Generic Concrete Salad','https://source.unsplash.com/random/800x600?product=1',1,'The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients','https://clean-antling.info/',0,0,157.00,157.00,9,'2025-04-20 13:12:49','2025-04-19 16:04:13','2025-04-20 13:12:49'),(13,'Sleek Cotton Fish','https://source.unsplash.com/random/800x600?product=2',1,'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support','https://subdued-twins.info',0,1,437.71,481.00,9,'2025-04-20 13:12:47','2025-04-19 16:04:13','2025-04-20 13:12:47'),(14,'Oriental Fresh Chicken','https://source.unsplash.com/random/800x600?product=3',1,'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J','https://clear-cut-saloon.info',0,0,162.00,200.00,9,'2025-04-20 13:12:44','2025-04-19 16:04:13','2025-04-20 13:12:44'),(15,'Sleek Granite Shirt','https://source.unsplash.com/random/800x600?product=4',1,'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support','https://internal-gray.org/',0,1,293.55,309.00,9,'2025-04-20 13:13:02','2025-04-19 16:04:13','2025-04-20 13:13:02'),(16,'Fantastic Plastic Car','https://source.unsplash.com/random/800x600?product=5',2,'Boston\'s most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles','https://determined-snorer.info/',0,0,49.56,59.00,9,'2025-04-20 13:12:41','2025-04-19 16:04:13','2025-04-20 13:12:41'),(17,'Elegant Concrete Chair','https://source.unsplash.com/random/800x600?product=6',1,'Carbonite web goalkeeper gloves are ergonomically designed to give easy fit','https://faithful-adult.name',0,0,64.38,74.00,9,'2025-04-20 13:13:00','2025-04-19 16:04:13','2025-04-20 13:13:00'),(18,'Small Rubber Fish','https://source.unsplash.com/random/800x600?product=7',1,'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals','https://well-lit-opening.name',0,0,128.00,128.00,9,'2025-04-20 13:13:13','2025-04-19 16:04:13','2025-04-20 13:13:13'),(19,'Generic Fresh Chips','https://source.unsplash.com/random/800x600?product=8',1,'The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality','https://jumbo-primate.name',0,1,158.40,176.00,9,'2025-04-20 13:13:12','2025-04-19 16:04:13','2025-04-20 13:13:12'),(20,'Gorgeous Wooden Salad','https://source.unsplash.com/random/800x600?product=9',1,'The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality','https://proud-specialist.name',0,1,40.92,44.00,9,'2025-04-20 13:13:11','2025-04-19 16:04:13','2025-04-20 13:13:11'),(21,'Oriental Bronze Sausages','https://source.unsplash.com/random/800x600?product=0',3,'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart','https://voluminous-mortgage.com/',1,0,461.58,471.00,3,'2025-04-20 13:13:18','2025-04-19 16:04:13','2025-04-20 13:13:18'),(22,'Incredible Cotton Cheese','https://source.unsplash.com/random/800x600?product=1',3,'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J','https://nautical-sole.com/',0,0,95.46,111.00,3,'2025-04-20 13:13:09','2025-04-19 16:04:13','2025-04-20 13:13:09'),(23,'Fantastic Metal Towels','https://source.unsplash.com/random/800x600?product=2',2,'The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients','https://prime-greed.com/',0,0,99.12,118.00,3,'2025-04-20 13:13:07','2025-04-19 16:04:13','2025-04-20 13:13:07'),(24,'Awesome Cotton Sausages','https://source.unsplash.com/random/800x600?product=3',3,'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart','https://recent-citron.com',0,1,333.00,370.00,3,'2025-04-20 13:13:21','2025-04-19 16:04:13','2025-04-20 13:13:21'),(25,'Handcrafted Bronze Chicken','https://source.unsplash.com/random/800x600?product=4',2,'The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality','https://glaring-gasoline.net',0,0,323.10,359.00,3,'2025-04-20 13:13:05','2025-04-19 16:04:13','2025-04-20 13:13:05'),(26,'Elegant Bronze Cheese','https://source.unsplash.com/random/800x600?product=5',1,'The Football Is Good For Training And Recreational Purposes','https://pure-leader.com',0,0,331.65,335.00,3,'2025-04-20 13:13:17','2025-04-19 16:04:13','2025-04-20 13:13:17'),(27,'Elegant Granite Shirt','https://source.unsplash.com/random/800x600?product=6',2,'The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design','https://evergreen-barbecue.com',0,1,412.16,448.00,3,'2025-04-20 13:13:04','2025-04-19 16:04:13','2025-04-20 13:13:04'),(28,'Fantastic Steel Car','https://source.unsplash.com/random/800x600?product=7',1,'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals','https://joyful-competitor.com/',0,0,134.40,160.00,3,'2025-04-20 13:13:31','2025-04-19 16:04:13','2025-04-20 13:13:31'),(29,'Electronic Frozen Pants','https://source.unsplash.com/random/800x600?product=8',2,'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals','https://joyful-shackle.net',0,0,196.91,203.00,3,'2025-04-20 13:13:30','2025-04-19 16:04:13','2025-04-20 13:13:30'),(30,'Handmade Cotton Car','https://source.unsplash.com/random/800x600?product=9',2,'The Football Is Good For Training And Recreational Purposes','https://deafening-search.org/',0,1,28.00,28.00,3,'2025-04-20 13:13:29','2025-04-19 16:04:13','2025-04-20 13:13:29'),(31,'Intelligent Soft Car','https://source.unsplash.com/random/800x600?product=0',3,'The Football Is Good For Training And Recreational Purposes','https://stunning-trench.info/',0,1,319.00,319.00,7,'2025-04-20 13:13:28','2025-04-19 16:04:13','2025-04-20 13:13:28'),(32,'Awesome Metal Table','https://source.unsplash.com/random/800x600?product=1',2,'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support','https://kaleidoscopic-kite.name',0,1,481.00,481.00,7,'2025-04-20 13:13:37','2025-04-19 16:04:13','2025-04-20 13:13:37'),(33,'Tasty Metal Ball','https://source.unsplash.com/random/800x600?product=2',3,'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart','https://watery-freight.net',0,0,251.20,314.00,7,'2025-04-20 13:13:25','2025-04-19 16:04:13','2025-04-20 13:13:25'),(34,'Handcrafted Metal Soap','https://source.unsplash.com/random/800x600?product=3',1,'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive','https://enormous-tank-top.info/',0,0,92.25,123.00,7,'2025-04-20 13:13:24','2025-04-19 16:04:13','2025-04-20 13:13:24'),(35,'Modern Fresh Ball','https://source.unsplash.com/random/800x600?product=4',3,'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive','https://flat-yacht.biz',1,0,219.45,231.00,7,'2025-04-20 13:13:39','2025-04-19 16:04:13','2025-04-20 13:13:39'),(36,'Modern Fresh Shirt','https://source.unsplash.com/random/800x600?product=5',2,'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart','https://fabulous-avenue.com/',1,0,192.40,260.00,7,'2025-04-20 13:13:23','2025-04-19 16:04:13','2025-04-20 13:13:23'),(37,'Licensed Plastic Shoes','https://source.unsplash.com/random/800x600?product=6',1,'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart','https://untrue-sherry.net',1,0,39.20,49.00,7,'2025-04-20 13:13:36','2025-04-19 16:04:13','2025-04-20 13:13:36'),(38,'Intelligent Cotton Towels','https://source.unsplash.com/random/800x600?product=7',1,'The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design','https://tepid-postbox.biz/',0,1,292.00,292.00,7,'2025-04-20 13:13:48','2025-04-19 16:04:13','2025-04-20 13:13:48'),(39,'Elegant Soft Shirt','https://source.unsplash.com/random/800x600?product=8',2,'The Football Is Good For Training And Recreational Purposes','https://traumatic-kayak.name/',0,0,7.50,10.00,7,'2025-04-20 13:13:54','2025-04-19 16:04:13','2025-04-20 13:13:54'),(40,'Fantastic Soft Shirt','https://source.unsplash.com/random/800x600?product=9',3,'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support','https://boring-flood.net/',0,0,124.82,158.00,7,'2025-04-20 13:13:46','2025-04-19 16:04:13','2025-04-20 13:13:46'),(41,'Rustic Rubber Bacon','https://source.unsplash.com/random/800x600?product=0',1,'The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients','https://dry-tough-guy.net/',0,0,207.32,292.00,5,'2025-04-20 13:13:45','2025-04-19 16:04:13','2025-04-20 13:13:45'),(42,'Rustic Fresh Cheese','https://source.unsplash.com/random/800x600?product=1',2,'The Football Is Good For Training And Recreational Purposes','https://tangible-recall.com',0,0,268.00,335.00,5,'2025-04-20 13:13:44','2025-04-19 16:04:13','2025-04-20 13:13:44'),(43,'Incredible Metal Gloves','https://source.unsplash.com/random/800x600?product=2',1,'The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients','https://arid-greens.org/',0,1,288.80,304.00,5,'2025-04-20 13:13:42','2025-04-19 16:04:13','2025-04-20 13:13:42'),(44,'Incredible Bronze Gloves','https://source.unsplash.com/random/800x600?product=3',1,'The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design','https://imperfect-crust.com',0,1,236.43,333.00,5,'2025-04-20 13:13:53','2025-04-19 16:04:13','2025-04-20 13:13:53'),(45,'Unbranded Metal Soap','https://source.unsplash.com/random/800x600?product=4',2,'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive','https://flustered-kick.com/',0,1,345.00,345.00,5,'2025-04-20 13:13:58','2025-04-19 16:04:13','2025-04-20 13:13:58'),(46,'Awesome Granite Keyboard','https://source.unsplash.com/random/800x600?product=5',2,'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart','https://sneaky-harmonize.com',0,1,21.36,24.00,5,'2025-04-20 13:13:41','2025-04-19 16:04:13','2025-04-20 13:13:41'),(47,'Licensed Fresh Mouse','https://source.unsplash.com/random/800x600?product=6',3,'Carbonite web goalkeeper gloves are ergonomically designed to give easy fit','https://giving-anybody.info/',0,0,83.16,84.00,5,'2025-04-20 13:13:51','2025-04-19 16:04:13','2025-04-20 13:13:51'),(48,'Small Soft Tuna','https://source.unsplash.com/random/800x600?product=7',2,'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016','https://questionable-guidance.biz',0,1,268.45,295.00,5,'2025-04-20 13:14:10','2025-04-19 16:04:13','2025-04-20 13:14:10'),(49,'Tasty Rubber Sausages','https://source.unsplash.com/random/800x600?product=8',1,'The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients','https://orange-song.org',0,0,412.00,412.00,5,'2025-04-20 13:14:09','2025-04-19 16:04:13','2025-04-20 13:14:09'),(50,'Gorgeous Rubber Bacon','https://source.unsplash.com/random/800x600?product=9',1,'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals','https://subdued-bankruptcy.name/',0,1,397.10,418.00,5,'2025-04-20 13:14:18','2025-04-19 16:04:13','2025-04-20 13:14:18'),(51,'Electronic Cotton Computer','https://source.unsplash.com/random/800x600?product=0',1,'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive','https://ancient-rutabaga.com',0,0,333.00,333.00,4,'2025-04-20 13:14:07','2025-04-19 16:04:13','2025-04-20 13:14:07'),(52,'Luxurious Steel Tuna','https://source.unsplash.com/random/800x600?product=1',2,'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals','https://kindly-gondola.info/',0,0,211.00,211.00,4,'2025-04-20 13:14:17','2025-04-19 16:04:13','2025-04-20 13:14:17'),(53,'Oriental Steel Bacon','https://source.unsplash.com/random/800x600?product=2',2,'The Football Is Good For Training And Recreational Purposes','https://arctic-spyglass.info/',0,0,334.08,348.00,4,'2025-04-20 13:14:06','2025-04-19 16:04:13','2025-04-20 13:14:06'),(54,'Unbranded Fresh Keyboard','https://source.unsplash.com/random/800x600?product=3',3,'Carbonite web goalkeeper gloves are ergonomically designed to give easy fit','https://faint-kingfish.biz',0,0,72.00,75.00,4,'2025-04-20 13:14:05','2025-04-19 16:04:13','2025-04-20 13:14:05'),(55,'Recycled Wooden Bike','https://source.unsplash.com/random/800x600?product=4',2,'Carbonite web goalkeeper gloves are ergonomically designed to give easy fit','https://anchored-story-telling.net/',0,0,345.00,345.00,4,'2025-04-20 13:14:02','2025-04-19 16:04:13','2025-04-20 13:14:02'),(56,'Sleek Steel Shirt','https://source.unsplash.com/random/800x600?product=5',1,'Boston\'s most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles','https://tasty-sensibility.info',0,0,111.72,133.00,4,'2025-04-20 13:14:15','2025-04-19 16:04:13','2025-04-20 13:14:15'),(57,'Recycled Rubber Chicken','https://source.unsplash.com/random/800x600?product=6',1,'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals','https://present-orator.org',0,1,202.35,213.00,4,'2025-04-20 13:14:00','2025-04-19 16:04:13','2025-04-20 13:14:00'),(58,'Refined Soft Hat','https://source.unsplash.com/random/800x600?product=7',2,'The Football Is Good For Training And Recreational Purposes','https://stale-riding.info',0,0,204.00,204.00,4,'2025-04-20 13:14:29','2025-04-19 16:04:13','2025-04-20 13:14:29'),(59,'Refined Wooden Tuna','https://source.unsplash.com/random/800x600?product=8',3,'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive','https://hot-glove.name',0,0,353.00,353.00,4,'2025-04-20 13:14:27','2025-04-19 16:04:13','2025-04-20 13:14:27'),(60,'Incredible Concrete Mouse','https://source.unsplash.com/random/800x600?product=9',1,'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support','https://snarling-sanctity.name',0,1,108.00,108.00,4,'2025-04-20 13:14:26','2025-04-19 16:04:13','2025-04-20 13:14:26'),(61,'Rustic Soft Hat','https://source.unsplash.com/random/800x600?product=0',3,'The Football Is Good For Training And Recreational Purposes','https://antique-gastropod.biz',0,0,29.20,40.00,1,'2025-04-20 13:14:25','2025-04-19 16:04:13','2025-04-20 13:14:25'),(62,'Fantastic Bronze Chair','https://source.unsplash.com/random/800x600?product=1',1,'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support','https://physical-plier.biz',1,1,116.92,148.00,1,'2025-04-20 13:14:23','2025-04-19 16:04:13','2025-04-20 13:14:23'),(63,'Licensed Fresh Car','https://source.unsplash.com/random/800x600?product=2',2,'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart','https://negative-clasp.com',0,0,459.00,459.00,1,'2025-04-20 13:14:36','2025-04-19 16:04:13','2025-04-20 13:14:36'),(64,'Generic Steel Car','https://source.unsplash.com/random/800x600?product=3',2,'Carbonite web goalkeeper gloves are ergonomically designed to give easy fit','https://confused-lily.org',0,0,118.37,133.00,1,'2025-04-20 13:14:22','2025-04-19 16:04:13','2025-04-20 13:14:22'),(65,'Practical Rubber Table','https://source.unsplash.com/random/800x600?product=4',1,'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive','https://faint-flintlock.org/',0,0,368.14,466.00,1,'2025-04-20 13:14:35','2025-04-19 16:04:13','2025-04-20 13:14:35'),(66,'Refined Metal Tuna','https://source.unsplash.com/random/800x600?product=5',3,'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support','https://impure-door.name/',0,1,106.11,131.00,1,'2025-04-20 13:14:20','2025-04-19 16:04:13','2025-04-20 13:14:20'),(67,'Unbranded Frozen Shirt','https://source.unsplash.com/random/800x600?product=6',1,'The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients','https://past-interchange.org',0,1,202.71,233.00,1,'2025-04-20 13:14:34','2025-04-19 16:04:13','2025-04-20 13:14:34'),(68,'Incredible Frozen Soap','https://source.unsplash.com/random/800x600?product=7',1,'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016','https://solid-jumper.com',0,1,26.00,26.00,1,'2025-04-20 13:14:45','2025-04-19 16:04:13','2025-04-20 13:14:45'),(69,'Oriental Cotton Mouse','https://source.unsplash.com/random/800x600?product=8',2,'The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality','https://soggy-luck.info',1,1,102.00,102.00,1,'2025-04-20 13:14:52','2025-04-19 16:04:13','2025-04-20 13:14:52'),(70,'Generic Rubber Gloves','https://source.unsplash.com/random/800x600?product=9',1,'The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design','https://skeletal-handicap.name',0,1,468.00,468.00,1,'2025-04-20 13:14:43','2025-04-19 16:04:13','2025-04-20 13:14:43'),(71,'Ergonomic Rubber Salad','https://source.unsplash.com/random/800x600?product=0',2,'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support','https://incredible-infiltration.info/',0,0,345.00,345.00,2,'2025-04-20 13:14:42','2025-04-19 16:04:13','2025-04-20 13:14:42'),(72,'Incredible Metal Soap','https://source.unsplash.com/random/800x600?product=1',1,'The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients','https://satisfied-chairlift.net',0,0,327.56,431.00,2,'2025-04-20 13:14:41','2025-04-19 16:04:13','2025-04-20 13:14:41'),(73,'Rustic Plastic Computer','https://source.unsplash.com/random/800x600?product=2',2,'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive','https://alarming-magnitude.org/',0,0,405.00,405.00,2,'2025-04-20 13:14:40','2025-04-19 16:04:13','2025-04-20 13:14:40'),(74,'Practical Steel Soap','https://source.unsplash.com/random/800x600?product=3',3,'Boston\'s most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles','https://respectful-eggplant.org',0,1,346.50,385.00,2,'2025-04-20 13:14:51','2025-04-19 16:04:13','2025-04-20 13:14:51'),(75,'Unbranded Frozen Computer','https://source.unsplash.com/random/800x600?product=4',1,'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support','https://vivacious-sprout.name/',1,1,127.40,130.00,2,'2025-04-20 13:14:56','2025-04-19 16:04:13','2025-04-20 13:14:56'),(76,'Small Steel Salad','https://source.unsplash.com/random/800x600?product=5',2,'Carbonite web goalkeeper gloves are ergonomically designed to give easy fit','https://venerated-osprey.biz/',0,0,142.20,180.00,2,'2025-04-20 13:14:38','2025-04-19 16:04:13','2025-04-20 13:14:38'),(77,'Elegant Soft Computer','https://source.unsplash.com/random/800x600?product=6',1,'The Football Is Good For Training And Recreational Purposes','https://shabby-pattern.biz/',0,0,50.56,64.00,2,'2025-04-20 13:14:49','2025-04-19 16:04:13','2025-04-20 13:14:49'),(78,'Intelligent Plastic Pants','https://source.unsplash.com/random/800x600?product=7',3,'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016','https://amusing-slippers.org/',1,1,110.00,110.00,2,'2025-04-20 13:15:05','2025-04-19 16:04:13','2025-04-20 13:15:05'),(79,'Handmade Frozen Towels','https://source.unsplash.com/random/800x600?product=8',1,'The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality','https://supportive-creche.info',0,0,198.00,200.00,2,'2025-04-20 13:15:12','2025-04-19 16:04:13','2025-04-20 13:15:12'),(80,'Modern Steel Gloves','https://source.unsplash.com/random/800x600?product=9',1,'Boston\'s most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles','https://uncommon-jackfruit.info/',0,1,147.20,160.00,2,'2025-04-20 13:15:04','2025-04-19 16:04:13','2025-04-20 13:15:04'),(81,'Rustic Plastic Pants','https://source.unsplash.com/random/800x600?product=0',2,'The Football Is Good For Training And Recreational Purposes','https://harsh-storyboard.name/',1,1,382.72,416.00,11,'2025-04-20 13:15:03','2025-04-19 16:04:13','2025-04-20 13:15:03'),(82,'Rustic Plastic Pants','https://source.unsplash.com/random/800x600?product=1',1,'The Football Is Good For Training And Recreational Purposes','https://brown-bike.com',0,0,184.80,220.00,11,'2025-04-20 13:15:10','2025-04-19 16:04:13','2025-04-20 13:15:10'),(83,'Sleek Steel Bacon','https://source.unsplash.com/random/800x600?product=2',2,'The Football Is Good For Training And Recreational Purposes','https://scary-internet.name',0,0,191.00,191.00,11,'2025-04-20 13:15:15','2025-04-19 16:04:13','2025-04-20 13:15:15'),(84,'Sleek Concrete Computer','https://source.unsplash.com/random/800x600?product=3',3,'The Football Is Good For Training And Recreational Purposes','https://slushy-exaggeration.net',0,1,214.06,278.00,11,'2025-04-20 13:15:01','2025-04-19 16:04:13','2025-04-20 13:15:01'),(85,'Refined Wooden Gloves','https://source.unsplash.com/random/800x600?product=4',3,'The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality','https://safe-raft.org',0,0,393.00,393.00,11,'2025-04-20 13:14:59','2025-04-19 16:04:13','2025-04-20 13:14:59'),(86,'Modern Rubber Chair','https://source.unsplash.com/random/800x600?product=5',2,'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart','https://prize-prevention.info',1,1,409.00,409.00,11,'2025-04-20 13:15:08','2025-04-19 16:04:13','2025-04-20 13:15:08'),(87,'Small Wooden Fish','https://source.unsplash.com/random/800x600?product=6',1,'The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients','https://delicious-onset.biz',0,0,392.78,479.00,11,'2025-04-20 13:14:58','2025-04-19 16:04:13','2025-04-20 13:14:58'),(88,'Oriental Granite Computer','https://source.unsplash.com/random/800x600?product=7',3,'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals','https://unwilling-special.org/',0,0,242.00,242.00,11,'2025-04-19 17:14:48','2025-04-19 16:04:13','2025-04-19 17:14:48'),(89,'Awesome Steel Table','https://source.unsplash.com/random/800x600?product=8',2,'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart','https://organic-notebook.info',0,0,366.00,366.00,11,'2025-04-19 17:14:46','2025-04-19 16:04:13','2025-04-19 17:14:46'),(90,'Oriental Granite Chicken','https://source.unsplash.com/random/800x600?product=9',3,'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive','https://polished-savory.org',0,0,8.03,11.00,11,'2025-04-19 17:14:42','2025-04-19 16:04:13','2025-04-19 17:14:42'),(91,'Recycled Frozen Mouse','https://source.unsplash.com/random/800x600?product=0',3,'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J','https://faithful-trigonometry.com',0,0,312.48,336.00,6,'2025-04-20 13:15:26','2025-04-19 16:04:13','2025-04-20 13:15:26'),(92,'Awesome Wooden Bike','https://source.unsplash.com/random/800x600?product=1',2,'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive','https://nifty-abbreviation.net',0,0,33.18,42.00,6,'2025-04-20 13:15:25','2025-04-19 16:04:13','2025-04-20 13:15:25'),(93,'Electronic Wooden Cheese','https://source.unsplash.com/random/800x600?product=2',2,'Boston\'s most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles','https://dramatic-hydrocarbon.biz/',0,0,186.42,239.00,6,'2025-04-20 13:15:24','2025-04-19 16:04:13','2025-04-20 13:15:24'),(94,'Tasty Soft Chicken','https://source.unsplash.com/random/800x600?product=3',3,'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive','https://grandiose-seep.biz',0,0,168.00,168.00,6,'2025-04-20 13:15:22','2025-04-19 16:04:13','2025-04-20 13:15:22'),(95,'Incredible Granite Pizza','https://source.unsplash.com/random/800x600?product=4',3,'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart','https://embellished-prior.biz/',0,0,58.08,66.00,6,'2025-04-20 13:15:29','2025-04-19 16:04:13','2025-04-20 13:15:29'),(96,'Generic Wooden Towels','https://source.unsplash.com/random/800x600?product=5',1,'The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients','https://overcooked-substance.biz/',0,0,272.80,310.00,6,'2025-04-20 13:15:20','2025-04-19 16:04:13','2025-04-20 13:15:20'),(97,'Intelligent Plastic Chicken','https://source.unsplash.com/random/800x600?product=6',2,'The Football Is Good For Training And Recreational Purposes','https://generous-secretariat.org/',0,0,191.35,215.00,6,'2025-04-20 13:15:31','2025-04-19 16:04:13','2025-04-20 13:15:31'),(98,'Licensed Frozen Bike','https://source.unsplash.com/random/800x600?product=7',1,'The Football Is Good For Training And Recreational Purposes','https://bronze-somewhere.biz/',0,0,87.32,118.00,6,'2025-04-20 13:15:18','2025-04-19 16:04:13','2025-04-20 13:15:18'),(99,'Electronic Granite Soap','https://source.unsplash.com/random/800x600?product=8',3,'Boston\'s most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles','https://several-encyclopedia.org/',0,0,110.88,144.00,6,'2025-04-20 13:15:33','2025-04-19 16:04:13','2025-04-20 13:15:33'),(100,'Luxurious Cotton Tuna','https://source.unsplash.com/random/800x600?product=9',1,'Boston\'s most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles','https://glaring-trace.org',0,1,54.67,77.00,6,'2025-04-20 13:15:16','2025-04-19 16:04:13','2025-04-20 13:15:16'),(101,'Rustic Wooden Gloves','https://source.unsplash.com/random/800x600?product=0',2,'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart','https://victorious-rocket.org/',0,0,202.86,207.00,13,'2025-04-20 13:15:37','2025-04-19 16:04:13','2025-04-20 13:15:37'),(102,'Handcrafted Soft Salad','https://source.unsplash.com/random/800x600?product=1',1,'The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design','https://confused-regret.info',0,1,100.08,139.00,13,'2025-04-23 17:12:25','2025-04-19 16:04:13','2025-04-23 17:12:25'),(103,'Practical Concrete Mouse','https://source.unsplash.com/random/800x600?product=2',2,'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support','https://understated-discussion.net',0,1,227.00,227.00,13,'2025-04-23 17:12:24','2025-04-19 16:04:13','2025-04-23 17:12:24'),(104,'Elegant Granite Tuna','https://source.unsplash.com/random/800x600?product=3',3,'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals','https://clumsy-plantation.biz/',1,0,448.00,448.00,13,'2025-04-23 17:12:13','2025-04-19 16:04:13','2025-04-23 17:12:13'),(105,'Handcrafted Plastic Gloves','products/product-105-1745082368444.png',3,'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart','https://triangular-detective.info/',1,1,461.00,461.00,13,'2025-04-26 07:43:09','2025-04-19 16:04:13','2025-04-26 07:43:09'),(106,'Intelligent Steel Hat','products/product-106-1745082356872.png',3,'Carbonite web goalkeeper gloves are ergonomically designed to give easy fit','https://idealistic-apparatus.org',0,0,257.69,353.00,13,'2025-04-26 07:43:07','2025-04-19 16:04:13','2025-04-26 07:43:07'),(107,'Unbranded Wooden Bacon','products/product-107-1745082346347.png',1,'Boston\'s most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles','https://boring-monkey.biz',0,0,303.88,428.00,13,'2025-04-26 07:43:06','2025-04-19 16:04:13','2025-04-26 07:43:06'),(108,'Handmade Steel Towels','products/product-108-1745082336730.jpg',3,'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart','https://flaky-opportunist.net',1,0,280.00,280.00,13,'2025-04-26 07:43:05','2025-04-19 16:04:13','2025-04-26 07:43:05'),(109,'Handcrafted Bronze Bacon','products/product-109-1745082326343.jpg',2,'The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality','https://fuzzy-reminder.info',1,1,445.00,445.00,13,'2025-04-26 07:43:04','2025-04-19 16:04:13','2025-04-26 07:43:04'),(110,'Bespoke Bronze Ball','products/product-110-1745082316294.jpg',2,'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016','https://dimpled-maniac.org/',0,0,451.72,491.00,13,'2025-04-26 07:43:03','2025-04-19 16:04:13','2025-04-26 07:43:03'),(111,'Refined Plastic Tuna','products/product-111-1745082303630.jpg',1,'The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients','https://third-clarity.info/',0,0,88.00,88.00,8,'2025-04-26 07:43:02','2025-04-19 16:04:13','2025-04-26 07:43:02'),(112,'Modern Steel Hat','products/product-112-1745082292247.png',3,'The Football Is Good For Training And Recreational Purposes','https://unkempt-legislature.com/',1,0,122.40,153.00,8,'2025-04-26 07:43:00','2025-04-19 16:04:13','2025-04-26 07:43:00'),(113,'Practical Steel Table','products/product-113-1745082279573.png',2,'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive','https://miniature-luck.info/',0,0,170.88,178.00,8,'2025-04-26 07:42:58','2025-04-19 16:04:13','2025-04-26 07:42:58'),(114,'Tasty Concrete Salad','products/product-114-1745082264805.jpg',1,'Boston\'s most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles','https://smoggy-demand.com',0,1,174.47,239.00,8,'2025-04-26 07:42:57','2025-04-19 16:04:13','2025-04-26 07:42:57'),(115,'Rustic Metal Shoes','products/product-115-1745082250323.jpg',1,'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016','https://cruel-lute.biz/',0,0,203.70,210.00,8,'2025-04-26 07:42:56','2025-04-19 16:04:13','2025-04-26 07:42:56'),(116,'Bespoke Wooden Computer','products/product-116-1745082239866.png',3,'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals','https://famous-downtown.net',0,0,319.95,405.00,8,'2025-04-26 07:42:55','2025-04-19 16:04:13','2025-04-26 07:42:55'),(117,'Unbranded Metal Chicken','products/product-117-1745082226638.png',3,'The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality','https://downright-drudgery.net',0,0,384.58,469.00,8,'2025-04-26 07:42:53','2025-04-19 16:04:13','2025-04-26 07:42:53'),(118,'Handcrafted Rubber Shirt','products/product-118-1745082214463.png',3,'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals','https://massive-inclusion.name/',0,0,387.99,479.00,8,'2025-04-26 07:42:52','2025-04-19 16:04:13','2025-04-26 07:42:52'),(119,'Awesome Soft Bacon','products/product-119-1745082201788.png',1,'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J','https://quick-witted-twine.net/',0,0,354.71,449.00,8,'2025-04-26 07:42:51','2025-04-19 16:04:13','2025-04-26 07:42:51'),(120,'Small Metal Towels','products/product-120-1745082190183.png',2,'The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients','https://hoarse-bath.biz',0,0,368.14,466.00,8,'2025-04-26 07:42:49','2025-04-19 16:04:13','2025-04-26 07:42:49'),(121,'Refined Wooden Bike','products/product-121-1745082174789.png',1,'The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality','https://svelte-federation.org/',0,0,230.00,230.00,10,'2025-04-26 07:42:48','2025-04-19 16:04:13','2025-04-26 07:42:48'),(122,'Incredible Concrete Car','products/product-122-1745082159874.png',2,'The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients','https://musty-lambkin.org',0,0,344.98,367.00,10,'2025-04-26 07:42:47','2025-04-19 16:04:13','2025-04-26 07:42:47'),(123,'Intelligent Fresh Sausages','products/product-123-1745082149219.png',1,'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive','https://impressionable-starter.name/',0,0,406.00,406.00,10,'2025-04-26 07:42:46','2025-04-19 16:04:13','2025-04-26 07:42:46'),(124,'Recycled Concrete Bike','products/product-124-1745082139008.png',2,'Carbonite web goalkeeper gloves are ergonomically designed to give easy fit','https://used-hostel.net',1,0,248.00,248.00,10,'2025-04-26 07:42:44','2025-04-19 16:04:13','2025-04-26 07:42:44'),(125,'Bespoke Cotton Chair','products/product-125-1745082128130.png',1,'The Football Is Good For Training And Recreational Purposes','https://thirsty-substitution.com/',0,0,68.00,68.00,10,'2025-04-26 07:43:11','2025-04-19 16:04:13','2025-04-26 07:43:11'),(126,'Handmade Plastic Tuna','products/product-126-1745653418124.jpg',2,'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016','https://miniature-excitement.net',0,0,349.28,472.00,3,NULL,'2025-04-19 16:04:13','2025-04-26 08:25:37'),(127,'Small Soft Bike','products/product-127-1745082106132.jpg',1,'The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality','https://easy-professor.com/',1,0,304.78,311.00,10,'2025-04-26 07:42:41','2025-04-19 16:04:13','2025-04-26 07:42:41'),(128,'Bespoke Soft Gloves','products/product-128-1745653354662.jpg',1,'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals','https://extroverted-puddle.info',0,1,262.80,292.00,2,NULL,'2025-04-19 16:04:13','2025-04-26 08:26:28'),(129,'Practical Concrete Car','products/product-129-1745653329442.jpg',3,'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart','https://flashy-bowler.info',1,0,388.00,388.00,1,NULL,'2025-04-19 16:04:13','2025-04-26 07:46:28'),(130,'Elegant Fresh Ball','products/product-130-1745653318327.jpg',2,'The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design','https://wretched-luxury.com/',1,1,0.00,409.00,1,NULL,'2025-04-19 16:04:13','2025-04-26 07:46:03'),(131,'Sinh tồn nơi hoang đảo','products/product-1745653522380.jpg',1,'','',1,1,0.01,900.00,2,NULL,'2025-04-26 07:45:22','2025-04-26 07:45:22'),(132,'Game điều kiển','products/product-1745653676476.jpg',2,'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart','',1,1,0.00,300.00,3,NULL,'2025-04-26 07:47:56','2025-04-26 07:47:56'),(133,'Game âm nhạc','products/product-1745653713380.jpg',3,'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart','',1,1,0.00,300.00,3,NULL,'2025-04-26 07:48:33','2025-04-26 07:48:33'),(134,'Game thực tế ảo','products/product-1745653754760.jpg',4,'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart','',1,1,0.00,6000.00,3,NULL,'2025-04-26 07:49:14','2025-04-26 07:49:14'),(135,'game nhiệm vụ','products/product-1745653791768.jpg',1,'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart','',1,1,0.00,6000.00,3,NULL,'2025-04-26 07:49:51','2025-04-26 07:49:51'),(136,'Game nhập vai','products/product-1745653830002.jpg',5,'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart','',1,1,0.00,3000.00,1,NULL,'2025-04-26 07:50:30','2025-04-26 07:50:30'),(137,'For all ages','products/product-1745653911377.jpg',3,'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart','',1,1,0.00,9000.00,1,NULL,'2025-04-26 07:51:51','2025-04-26 07:51:51'),(138,'Pi - A','products/product-1745653967628.png',1,'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart','',1,1,0.00,900.00,2,NULL,'2025-04-26 07:52:47','2025-04-26 07:52:47'),(139,'Liquid Simulation','products/product-1745654010141.png',1,'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart','',1,1,0.00,900.00,1,NULL,'2025-04-26 07:53:30','2025-04-26 07:53:30'),(140,'Pi66y Zombie Shggting Game','products/product-1745654068804.png',1,'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart','',1,0,0.00,9000.00,2,NULL,'2025-04-26 07:54:28','2025-04-26 07:54:28'),(141,'Mari Dragon','products/product-1745654114851.png',1,'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart','',1,1,0.00,900.00,1,NULL,'2025-04-26 07:55:14','2025-04-26 07:55:14'),(142,'Downhill snow Sking Game','products/product-1745654152689.png',2,'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart','',1,1,0.00,9000.00,2,NULL,'2025-04-26 07:55:52','2025-04-26 07:55:52'),(143,'Everwing Game','products/product-1745654189786.png',3,'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart','',1,0,0.00,9000.00,1,NULL,'2025-04-26 07:56:29','2025-04-26 07:56:29'),(144,'Galaxy Warfare Game','products/product-1745654266434.png',3,'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart','',1,0,0.00,9000.00,1,NULL,'2025-04-26 07:57:46','2025-04-26 07:57:46'),(145,'mario Game','products/product-1745654294925.png',0,'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart','',1,0,0.00,600.00,1,NULL,'2025-04-26 07:58:14','2025-04-26 07:58:14'),(146,'Tower Dense','products/product-1745654334214.png',0,'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart','',1,0,0.00,9000.00,1,NULL,'2025-04-26 07:58:54','2025-04-26 07:58:54'),(147,'SV Vampire vs zombies apocalypse game','products/product-1745654390601.png',5,'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart','',0,1,0.00,9000.00,2,NULL,'2025-04-26 07:59:50','2025-04-26 07:59:50'),(148,'Ball Game','products/product-1745654583170.png',0,'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart','',0,1,0.00,9000.00,1,NULL,'2025-04-26 08:03:03','2025-04-26 08:03:03'),(149,'Angry Squirrel cocos','products/product-1745654671335.jpg',0,'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart','',0,1,0.00,9000.00,1,NULL,'2025-04-26 08:04:31','2025-04-26 08:04:31'),(150,'Castle hassle game','products/product-1745654763255.jpg',0,'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart','',0,1,0.00,9000.00,1,NULL,'2025-04-26 08:06:03','2025-04-26 08:06:03'),(151,'doom-classic-depot-ios','products/product-1745654814818.png',1,'doom-classic-depot-ios','',0,1,0.00,9000.00,1,NULL,'2025-04-26 08:06:54','2025-04-26 08:06:54'),(152,'game-matches-puzzle-android','products/product-1745654864562.png',0,'game-matches-puzzle-android','',0,1,0.00,90000.00,1,NULL,'2025-04-26 08:07:44','2025-04-26 08:07:44'),(153,'game-metal-slug-demo','products/product-1745654925543.jpg',0,'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart','',0,1,0.00,90000.00,2,NULL,'2025-04-26 08:08:45','2025-04-26 08:08:45'),(154,'game-my-tower-defense','products/product-1745654970897.jpg',0,'game-my-tower-defense-2d-','',0,1,0.00,9000.00,1,NULL,'2025-04-26 08:09:30','2025-04-26 08:09:30'),(155,'restart previois next','products/product-1745655021566.jpg',0,'game-my-tower-defense-2d-','',0,0,0.00,9000.00,1,NULL,'2025-04-26 08:10:21','2025-04-26 08:10:21'),(156,'tiny-wings-remake','products/product-1745655058915.jpg',0,'0','',0,0,0.00,0.00,1,NULL,'2025-04-26 08:10:58','2025-04-26 08:10:58'),(157,'wolfenstein-3d-classic-platinum','products/product-1745655093102.png',5,'wolfenstein-3d-classic-platinum','',0,0,0.00,6700.00,1,NULL,'2025-04-26 08:11:33','2025-04-26 08:11:33'),(158,'Super bee','products/product-1745655132405.png',0,'wolfenstein-3d-classic-platinum','',0,0,0.00,64545.00,1,NULL,'2025-04-26 08:12:12','2025-04-26 08:12:12'),(159,'battle city','products/product-1745655160061.png',4,'wolfenstein-3d-classic-platinum','',0,0,0.00,645.00,1,NULL,'2025-04-26 08:12:40','2025-04-26 08:12:40');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promotions`
--

DROP TABLE IF EXISTS `promotions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promotions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `saleOff` decimal(5,2) NOT NULL,
  `image` text,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotions`
--

LOCK TABLES `promotions` WRITE;
/*!40000 ALTER TABLE `promotions` DISABLE KEYS */;
/*!40000 ALTER TABLE `promotions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `role_name` (`role_name`),
  UNIQUE KEY `role_name_2` (`role_name`),
  UNIQUE KEY `role_name_3` (`role_name`),
  UNIQUE KEY `role_name_4` (`role_name`),
  UNIQUE KEY `role_name_5` (`role_name`),
  UNIQUE KEY `role_name_6` (`role_name`),
  UNIQUE KEY `role_name_7` (`role_name`),
  UNIQUE KEY `role_name_8` (`role_name`),
  UNIQUE KEY `role_name_9` (`role_name`),
  UNIQUE KEY `role_name_10` (`role_name`),
  UNIQUE KEY `role_name_11` (`role_name`),
  UNIQUE KEY `role_name_12` (`role_name`),
  UNIQUE KEY `role_name_13` (`role_name`),
  UNIQUE KEY `role_name_14` (`role_name`),
  UNIQUE KEY `role_name_15` (`role_name`),
  UNIQUE KEY `role_name_16` (`role_name`),
  UNIQUE KEY `role_name_17` (`role_name`),
  UNIQUE KEY `role_name_18` (`role_name`),
  UNIQUE KEY `role_name_19` (`role_name`),
  UNIQUE KEY `role_name_20` (`role_name`),
  UNIQUE KEY `role_name_21` (`role_name`),
  UNIQUE KEY `role_name_22` (`role_name`),
  UNIQUE KEY `role_name_23` (`role_name`),
  UNIQUE KEY `role_name_24` (`role_name`),
  UNIQUE KEY `role_name_25` (`role_name`),
  UNIQUE KEY `role_name_26` (`role_name`),
  UNIQUE KEY `role_name_27` (`role_name`),
  UNIQUE KEY `role_name_28` (`role_name`),
  UNIQUE KEY `role_name_29` (`role_name`),
  UNIQUE KEY `role_name_30` (`role_name`),
  UNIQUE KEY `role_name_31` (`role_name`),
  UNIQUE KEY `role_name_32` (`role_name`),
  UNIQUE KEY `role_name_33` (`role_name`),
  UNIQUE KEY `role_name_34` (`role_name`),
  UNIQUE KEY `role_name_35` (`role_name`),
  UNIQUE KEY `role_name_36` (`role_name`),
  UNIQUE KEY `role_name_37` (`role_name`),
  UNIQUE KEY `role_name_38` (`role_name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin',NULL,'2025-04-19 16:02:47','2025-04-19 16:02:47'),(2,'customer',NULL,'2025-04-19 16:02:47','2025-04-19 16:02:47');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20240310000000-create-all-tables.js'),('20240310000000-create-example.js'),('20240414000000-add-transaction-id-to-orders.js'),('20240415000000-add-licence-to-order-products.js'),('20241001000000-create-conversation.js'),('20241001000001-create-message.js'),('20250412161053-create-banners-table.js'),('20250413153248-create-cart-items-table.js'),('20250413155353-add-deleted-at-to-cart-items.js'),('20250413161917-add-status-to-orders.js'),('20250413162910-add-quantity-price-to-order-products.js'),('20250425082526-add-passportImage-to-users.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `user_id` int NOT NULL,
  `role_id` int NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  UNIQUE KEY `user_roles_role_id_user_id_unique` (`user_id`,`role_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES (1,1,'2025-04-19 16:04:13','2025-04-19 16:04:13'),(20,2,'2025-04-21 15:01:55','2025-04-21 15:01:55'),(21,2,'2025-04-19 16:09:34','2025-04-19 16:09:34'),(22,1,'2025-04-21 15:02:04','2025-04-21 15:02:04'),(22,2,'2025-04-21 15:02:04','2025-04-21 15:02:04'),(23,2,'2025-04-23 16:10:16','2025-04-23 16:10:16'),(24,2,'2025-04-24 15:21:25','2025-04-24 15:21:25'),(25,1,'2025-04-23 17:17:26','2025-04-23 17:17:26'),(26,1,'2025-04-26 23:18:49','2025-04-26 23:18:49'),(26,2,'2025-04-26 23:18:49','2025-04-26 23:18:49');
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `passportImage` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `email_3` (`email`),
  UNIQUE KEY `email_4` (`email`),
  UNIQUE KEY `email_5` (`email`),
  UNIQUE KEY `email_6` (`email`),
  UNIQUE KEY `email_7` (`email`),
  UNIQUE KEY `email_8` (`email`),
  UNIQUE KEY `email_9` (`email`),
  UNIQUE KEY `email_10` (`email`),
  UNIQUE KEY `email_11` (`email`),
  UNIQUE KEY `email_12` (`email`),
  UNIQUE KEY `email_13` (`email`),
  UNIQUE KEY `email_14` (`email`),
  UNIQUE KEY `email_15` (`email`),
  UNIQUE KEY `email_16` (`email`),
  UNIQUE KEY `email_17` (`email`),
  UNIQUE KEY `email_18` (`email`),
  UNIQUE KEY `email_19` (`email`),
  UNIQUE KEY `email_20` (`email`),
  UNIQUE KEY `email_21` (`email`),
  UNIQUE KEY `email_22` (`email`),
  UNIQUE KEY `email_23` (`email`),
  UNIQUE KEY `email_24` (`email`),
  UNIQUE KEY `email_25` (`email`),
  UNIQUE KEY `email_26` (`email`),
  UNIQUE KEY `email_27` (`email`),
  UNIQUE KEY `email_28` (`email`),
  UNIQUE KEY `email_29` (`email`),
  UNIQUE KEY `email_30` (`email`),
  UNIQUE KEY `email_31` (`email`),
  UNIQUE KEY `email_32` (`email`),
  UNIQUE KEY `email_33` (`email`),
  UNIQUE KEY `email_34` (`email`),
  UNIQUE KEY `email_35` (`email`),
  UNIQUE KEY `email_36` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin User 123','admin@example.com','$2b$10$PT3euQc.9OlFKLf/NFrIj..0N1seP79jNUVPExw6pcn7wKpta3Ni6','123 Admin St','Vietnam','1','0987654321','avatar\\1-1745507859901.jfif','2025-04-19 16:04:13','2025-04-24 15:18:24',NULL,NULL),(2,'Guadalupe Murazik','Jeremie.Schultz@gmail.com','$2b$10$PT3euQc.9OlFKLf/NFrIj..0N1seP79jNUVPExw6pcn7wKpta3Ni6','399 Grange Road','Togo','Torphyshire','958.765.5089 x413','https://avatars.githubusercontent.com/u/90974765','2025-04-19 16:04:13','2025-04-23 17:11:46','2025-04-23 17:11:46',NULL),(3,'Susan Sawayn-Borer','Lester49@hotmail.com','$2b$10$PT3euQc.9OlFKLf/NFrIj..0N1seP79jNUVPExw6pcn7wKpta3Ni6','4367 Skyline Drive','New Caledonia','Gabechester','(405) 207-9656 x4749','https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1191.jpg','2025-04-19 16:04:13','2025-04-19 16:59:21','2025-04-19 16:59:21',NULL),(4,'Joanna Hessel','Belle.Weissnat@gmail.com','$2b$10$PT3euQc.9OlFKLf/NFrIj..0N1seP79jNUVPExw6pcn7wKpta3Ni6','27223 Crescent Road','Malaysia','East Edmondchester','1-799-811-3959 x874','https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/628.jpg','2025-04-19 16:04:13','2025-04-23 17:11:47','2025-04-23 17:11:47',NULL),(5,'Conrad Baumbach','Hester.Jacobson@gmail.com','$2b$10$PT3euQc.9OlFKLf/NFrIj..0N1seP79jNUVPExw6pcn7wKpta3Ni6','1093 S Main Street','Uganda','Lake Evanhaven','1-667-512-0064 x39180','https://avatars.githubusercontent.com/u/38159011','2025-04-19 16:04:13','2025-04-23 17:11:48','2025-04-23 17:11:48',NULL),(6,'Lisa Davis','Shakira_Mueller2@yahoo.com','$2b$10$PT3euQc.9OlFKLf/NFrIj..0N1seP79jNUVPExw6pcn7wKpta3Ni6','2853 Broadway','Nicaragua','Lake Elmer','499.966.8533 x37842','https://avatars.githubusercontent.com/u/74072445','2025-04-19 16:04:13','2025-04-23 17:11:56','2025-04-23 17:11:56',NULL),(7,'Van Erdman','Marion22@gmail.com','$2b$10$PT3euQc.9OlFKLf/NFrIj..0N1seP79jNUVPExw6pcn7wKpta3Ni6','79920 Pouros Passage','Italy','Mannfurt','1-431-712-7616','https://avatars.githubusercontent.com/u/91075311','2025-04-19 16:04:13','2025-04-23 17:11:55','2025-04-23 17:11:55',NULL),(8,'Ada Maggio','Devante.Daugherty93@hotmail.com','$2b$10$PT3euQc.9OlFKLf/NFrIj..0N1seP79jNUVPExw6pcn7wKpta3Ni6','2665 Brook Road','Norway','North Courtney','(588) 383-3208 x185','https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/919.jpg','2025-04-19 16:04:13','2025-04-23 17:11:43','2025-04-23 17:11:43',NULL),(9,'Mercedes Huel','Halle81@yahoo.com','$2b$10$PT3euQc.9OlFKLf/NFrIj..0N1seP79jNUVPExw6pcn7wKpta3Ni6','162 Reinger Wall','Senegal','Lubbock','784-238-9991','https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/363.jpg','2025-04-19 16:04:13','2025-04-23 17:11:54','2025-04-23 17:11:54',NULL),(10,'Nathan Ritchie','Esta.Hartmann@gmail.com','$2b$10$PT3euQc.9OlFKLf/NFrIj..0N1seP79jNUVPExw6pcn7wKpta3Ni6','367 7th Street','Lebanon','Alenaton','1-844-316-9606 x04644','https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/836.jpg','2025-04-19 16:04:13','2025-04-23 17:11:52','2025-04-23 17:11:52',NULL),(11,'Megan Botsford','Lenny_Halvorson32@hotmail.com','$2b$10$PT3euQc.9OlFKLf/NFrIj..0N1seP79jNUVPExw6pcn7wKpta3Ni6','219 Nico Route','Burkina Faso','Sydneechester','(442) 709-9028 x0897','https://avatars.githubusercontent.com/u/93437424','2025-04-19 16:04:13','2025-04-23 17:12:04','2025-04-23 17:12:04',NULL),(12,'Johnathan O\'Connell Jr.','Dangelo.Volkman95@gmail.com','$2b$10$PT3euQc.9OlFKLf/NFrIj..0N1seP79jNUVPExw6pcn7wKpta3Ni6','842 The Sidings','Iceland','Somerville','881-895-0011 x97059','https://avatars.githubusercontent.com/u/84988614','2025-04-19 16:04:13','2025-04-23 17:12:00','2025-04-23 17:12:00',NULL),(13,'Juan Feest','Laurie28@gmail.com','$2b$10$PT3euQc.9OlFKLf/NFrIj..0N1seP79jNUVPExw6pcn7wKpta3Ni6','329 Ernser Crest','Montenegro','Framiport','1-840-439-2566 x7674','https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/737.jpg','2025-04-19 16:04:13','2025-04-23 17:11:58','2025-04-23 17:11:58',NULL),(14,'Fernando Rippin','Jennie88@hotmail.com','$2b$10$PT3euQc.9OlFKLf/NFrIj..0N1seP79jNUVPExw6pcn7wKpta3Ni6','68998 University Avenue','Guernsey','Port Shakiratown','(656) 351-4981 x6934','https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/156.jpg','2025-04-19 16:04:13','2025-04-23 17:12:02','2025-04-23 17:12:02',NULL),(15,'Anthony Gorczany','Virgie.Bashirian@yahoo.com','$2b$10$PT3euQc.9OlFKLf/NFrIj..0N1seP79jNUVPExw6pcn7wKpta3Ni6','49607 Mosciski Cliff','Saint Kitts and Nevis','Pfefferport','(749) 396-3193','https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/366.jpg','2025-04-19 16:04:13','2025-04-23 17:11:40','2025-04-23 17:11:40',NULL),(16,'Charlotte Pacocha','Brant.Schulist5@gmail.com','$2b$10$PT3euQc.9OlFKLf/NFrIj..0N1seP79jNUVPExw6pcn7wKpta3Ni6','801 Anthony Dale','Botswana','Santa Monica','(964) 313-7342 x732','https://avatars.githubusercontent.com/u/91480543','2025-04-19 16:04:13','2025-04-23 17:11:38','2025-04-23 17:11:38',NULL),(17,'Josefina Gutmann','Danial98@yahoo.com','$2b$10$PT3euQc.9OlFKLf/NFrIj..0N1seP79jNUVPExw6pcn7wKpta3Ni6','3279 Quarry Road','Austria','Rogahnworth','1-742-421-3013 x13139','https://avatars.githubusercontent.com/u/7264548','2025-04-19 16:04:13','2025-04-23 17:11:37','2025-04-23 17:11:37',NULL),(18,'Gerald Watsica','Shane_Parker@yahoo.com','$2b$10$PT3euQc.9OlFKLf/NFrIj..0N1seP79jNUVPExw6pcn7wKpta3Ni6','7771 Aryanna Roads','Armenia','Mesa','(554) 517-9624 x420','https://avatars.githubusercontent.com/u/4338572','2025-04-19 16:04:13','2025-04-23 17:11:35','2025-04-23 17:11:35',NULL),(19,'Heather Lubowitz','Davion2@hotmail.com','$2b$10$PT3euQc.9OlFKLf/NFrIj..0N1seP79jNUVPExw6pcn7wKpta3Ni6','72414 Nicole Valley','Macao','Predovicfort','454.856.8267','https://avatars.githubusercontent.com/u/68366902','2025-04-19 16:04:13','2025-04-23 17:11:34','2025-04-23 17:11:34',NULL),(20,'Dr. Bessie Walter','Erin.Bradtke3@hotmail.com','$2b$10$PT3euQc.9OlFKLf/NFrIj..0N1seP79jNUVPExw6pcn7wKpta3Ni6','44779 Joannie Summit','Cambodia','Lamontburgh','753.713.8893 x6204','https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/893.jpg','2025-04-19 16:04:13','2025-04-23 17:11:33','2025-04-23 17:11:33',NULL),(21,'Ryan Hyatt','Eldred16@gmail.com','$2b$10$K9yvwhEt56aeGoqzLuY6Nuvn3/ZX04gjqvT9z2mjA9kmeUkoaCU.y','6579 Hailie Valleys','Liechtenstein','Johnathanworth','(262) 369-6775','https://avatars.githubusercontent.com/u/9852024','2025-04-19 16:04:13','2025-04-23 17:11:30','2025-04-23 17:11:30',NULL),(22,'thuc cong nguyen','seachebook988@gmail.com','$2b$10$UAoTYuwspd3sAPeYR9aRpO93frjT..HxP9WoNyKyZKFcVz3WIfubm','hai muong thanh','Vietnam','1','1236548545','avatar\\22-1745215308612.jpg','2025-04-19 16:38:36','2025-04-26 23:19:28',NULL,NULL),(23,'vu phong','vuhoamay5473828@gmail.com','$2b$10$kbp2PxLd5eSckGVURkxNr.IQik.LU/UtfHlw0AzKymF9iAJ.JWmdW','hai muong thanh','Vietnam','1','12365485',NULL,'2025-04-23 16:10:16','2025-04-24 16:29:39',NULL,NULL),(24,'wux nam','congiotruockhibao@gmail.com','$2b$10$n53GriLCwCRMRfk3OgKvsueYiEYCTKlaS5Iwh5bj149dPTgANvuQq','hai muong thanh','Vietnam','1','12345670',NULL,'2025-04-23 16:19:19','2025-04-23 16:27:49',NULL,NULL),(25,'admin','admin@examplce.com','$2b$10$QIvcm3uNMdIq.khw.VXiReseqZB5HpWsWiJb8edQA9Si/fEkwUUZS','hai muong thanh',NULL,NULL,'12365485',NULL,'2025-04-23 17:17:26','2025-04-23 17:17:31','2025-04-23 17:17:31',NULL),(26,'hoaj','seachebook@gmail.com','$2b$10$cw.ATdGxxQ1MWyVrhwu26e.cv6MxGGLsb4SzxE1JTTZBEMQc5eRhC','19 TỰ DO','AMERICAR','NaN','C12345673464','avatar\\26-1745591315013.jfif','2025-04-24 15:46:50','2025-04-26 21:56:57',NULL,'passport\\26-1745591315016.jpg');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-27 19:41:39
