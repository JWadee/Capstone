CREATE DATABASE  IF NOT EXISTS `capstone` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `capstone`;
-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: localhost    Database: capstone
-- ------------------------------------------------------
-- Server version	8.0.18

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
-- Table structure for table `accountpasswords`
--

DROP TABLE IF EXISTS `accountpasswords`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accountpasswords` (
  `intAccountPasswordID` int(11) NOT NULL AUTO_INCREMENT,
  `intAccountID` int(11) NOT NULL,
  `strPassword` varchar(250) NOT NULL,
  PRIMARY KEY (`intAccountPasswordID`),
  UNIQUE KEY `intAccountPasswordID_UNIQUE` (`intAccountPasswordID`),
  UNIQUE KEY `intAccountID_UNIQUE` (`intAccountID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accountpasswords`
--

LOCK TABLES `accountpasswords` WRITE;
/*!40000 ALTER TABLE `accountpasswords` DISABLE KEYS */;
/*!40000 ALTER TABLE `accountpasswords` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `intAccountID` int(11) NOT NULL AUTO_INCREMENT,
  `strFirstName` varchar(45) NOT NULL,
  `strLastName` varchar(45) NOT NULL,
  `strUsername` varchar(45) NOT NULL,
  `strEmail` varchar(45) NOT NULL,
  `dtmDOB` datetime DEFAULT NULL,
  `intWeight` int(11) DEFAULT NULL,
  `strPhoneNumber` varchar(45) DEFAULT NULL,
  `intAddressID` int(11) DEFAULT NULL,
  `intAccountPasswordID` int(11) NOT NULL,
  `intBodyTypeID` int(11) DEFAULT NULL,
  `intGenderID` int(11) NOT NULL,
  `intAccountStatusID` int(11) DEFAULT NULL,
  PRIMARY KEY (`intAccountID`),
  UNIQUE KEY `intAccountID_UNIQUE` (`intAccountID`),
  UNIQUE KEY `intAccountPasswordID_UNIQUE` (`intAccountPasswordID`),
  UNIQUE KEY `strUsername_UNIQUE` (`strUsername`),
  UNIQUE KEY `strEmail_UNIQUE` (`strEmail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accountstatuses`
--

DROP TABLE IF EXISTS `accountstatuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accountstatuses` (
  `intAccountStatusID` int(11) NOT NULL AUTO_INCREMENT,
  `strAccountStatus` varchar(45) NOT NULL,
  PRIMARY KEY (`intAccountStatusID`),
  UNIQUE KEY `intAccountStatusID_UNIQUE` (`intAccountStatusID`),
  UNIQUE KEY `strAccountStatus_UNIQUE` (`strAccountStatus`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accountstatuses`
--

LOCK TABLES `accountstatuses` WRITE;
/*!40000 ALTER TABLE `accountstatuses` DISABLE KEYS */;
INSERT INTO `accountstatuses` VALUES (1,'pending'),(2,'verified');
/*!40000 ALTER TABLE `accountstatuses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accounttypes`
--

DROP TABLE IF EXISTS `accounttypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounttypes` (
  `intAccountTypeID` int(11) NOT NULL AUTO_INCREMENT,
  `strAccountType` varchar(45) NOT NULL,
  PRIMARY KEY (`intAccountTypeID`),
  UNIQUE KEY `intAccountTypeID_UNIQUE` (`intAccountTypeID`),
  UNIQUE KEY `strAccountType_UNIQUE` (`strAccountType`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounttypes`
--

LOCK TABLES `accounttypes` WRITE;
/*!40000 ALTER TABLE `accounttypes` DISABLE KEYS */;
INSERT INTO `accounttypes` VALUES (1,'client'),(3,'personal'),(2,'trainer');
/*!40000 ALTER TABLE `accounttypes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-28 18:12:14
