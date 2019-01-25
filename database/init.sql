-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema provamaker
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `provamaker` ;

-- -----------------------------------------------------
-- Schema provamaker
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `provamaker` DEFAULT CHARACTER SET utf8 ;
USE `provamaker` ;

-- -----------------------------------------------------
-- Table `provamaker`.`universidades`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `provamaker`.`universidades` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(80) NOT NULL,
  `estado` VARCHAR(3) NOT NULL,
  `abreviatura` VARCHAR(10) NOT NULL UNIQUE,
  `logo` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `provamaker`.`disciplina`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `provamaker`.`disciplina` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `provamaker`.`professores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `provamaker`.`professores` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(60) NOT NULL,
  `email` VARCHAR(45) NOT NULL UNIQUE,
  `senha` VARCHAR(32) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `provamaker`.`professor_has_disciplina_on_universidade`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `provamaker`.`professor_has_disciplina_on_universidade` (
  `universidades_id` INT NOT NULL,
  `disciplina_id` INT NOT NULL,
  `professores_id` INT NOT NULL,
  PRIMARY KEY (`universidades_id`, `disciplina_id`, `professores_id`),
  INDEX `fk_universidades_has_disciplina_disciplina1_idx` (`disciplina_id` ASC) ,
  INDEX `fk_universidades_has_disciplina_universidades_idx` (`universidades_id` ASC) ,
  INDEX `fk_universidade_disciplina_professores1_idx` (`professores_id` ASC) ,
  CONSTRAINT `fk_universidades_has_disciplina_universidades`
    FOREIGN KEY (`universidades_id`)
    REFERENCES `provamaker`.`universidades` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_universidades_has_disciplina_disciplina1`
    FOREIGN KEY (`disciplina_id`)
    REFERENCES `provamaker`.`disciplina` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_universidade_disciplina_professores1`
    FOREIGN KEY (`professores_id`)
    REFERENCES `provamaker`.`professores` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `provamaker`.`materias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `provamaker`.`materias` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `volume` INT NULL,
  `universidade_id` INT NOT NULL,
  `disciplina_id` INT NOT NULL,
  `professor_id` INT NOT NULL,
  PRIMARY KEY (`id`, `universidade_id`, `disciplina_id`, `professor_id`),
  INDEX `fk_materias_professor_has_disciplina_on_universidade1_idx` (`universidade_id` ASC, `disciplina_id` ASC, `professor_id` ASC) ,
  CONSTRAINT `fk_materias_professor_has_disciplina_on_universidade1`
    FOREIGN KEY (`universidade_id` , `disciplina_id` , `professor_id`)
    REFERENCES `provamaker`.`professor_has_disciplina_on_universidade` (`universidades_id` , `disciplina_id` , `professores_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `provamaker`.`questoes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `provamaker`.`questoes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tipo` INT NOT NULL,
  `titulo` MEDIUMTEXT NOT NULL,
  `opcao1` TEXT(1000) NULL,
  `opcao2` TEXT(1000) NULL,
  `opcao3` TEXT(1000) NULL,
  `opcao4` TEXT(1000) NULL,
  `opcao5` TEXT(1000) NULL,
  `resposta_text` MEDIUMTEXT NULL,
  `resposta_opcao` VARCHAR(2) NULL,
  `nivel` INT NOT NULL,
  `materias_id` INT NOT NULL,
  PRIMARY KEY (`id`, `materias_id`),
  INDEX `fk_questoes_materias1_idx` (`materias_id` ASC) ,
  CONSTRAINT `fk_questoes_materias1`
    FOREIGN KEY (`materias_id`)
    REFERENCES `provamaker`.`materias` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `provamaker`.`provas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `provamaker`.`provas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `aplicacao` DATETIME NOT NULL,
  `questoes` MEDIUMTEXT NULL,
  `universidade_id` INT NOT NULL,
  `disciplina_id` INT NOT NULL,
  `professor_id` INT NOT NULL,
  PRIMARY KEY (`id`, `universidade_id`, `disciplina_id`, `professor_id`),
  INDEX `fk_provas_professor_has_disciplina_on_universidade1_idx` (`universidade_id` ASC, `disciplina_id` ASC, `professor_id` ASC) ,
  CONSTRAINT `fk_provas_professor_has_disciplina_on_universidade1`
    FOREIGN KEY (`universidade_id` , `disciplina_id` , `professor_id`)
    REFERENCES `provamaker`.`professor_has_disciplina_on_universidade` (`universidades_id` , `disciplina_id` , `professores_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
