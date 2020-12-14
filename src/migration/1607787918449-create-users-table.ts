import {MigrationInterface, QueryRunner} from "typeorm";

export class createUsersTable1607787918449 implements MigrationInterface {
    name = 'createUsersTable1607787918449'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `dict_history_events` (`id` int NOT NULL AUTO_INCREMENT, `model` enum ('submit', 'user') NOT NULL COMMENT 'Modele: \"submit\"-wniosek i \"user\"-użytkownik', `description` varchar(255) NOT NULL COMMENT 'Opis zdarzenia - od 3 do 254 znaków', `status` int NULL COMMENT 'Status: tylko dla wniosków - od 1 do 9', PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `password_reset` (`id` int NOT NULL AUTO_INCREMENT, `userId` int NOT NULL COMMENT 'ID powiązanego użytkownika', `token` varchar(255) NOT NULL COMMENT 'Token dla żądania resetu hasła', `expiredAt` datetime NULL COMMENT 'Data ważności tokena', `createdAt` datetime(6) NOT NULL COMMENT 'Data utworzenia tokena' DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `dict_submit_statuses` (`id` int NOT NULL AUTO_INCREMENT, `title` enum ('rozp', 'zlozony', 'w_ocenie', 'w_poprawie', 'odrzucony', 'negatywny', 'pozytywny', 'porzucony', 'bez_rozp') NOT NULL COMMENT 'Nazwa statusu: rozp,zlozony,w_ocenie,w_poprawie,odrzucony,negatywny,pozytywny,porzucony,bez_rozp', PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user_history` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL COMMENT 'Data utworzenia' DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL COMMENT 'Data ostatniej aktualizacji' DEFAULT CURRENT_TIMESTAMP(6), `uuid` varchar(255) NOT NULL COMMENT 'Unikalny identyfikator uuidV4', `userId` int NOT NULL COMMENT 'ID użytkownika', `userUuuid` varchar(255) NOT NULL COMMENT 'UuidV4 użytkownika', `email` varchar(255) NOT NULL COMMENT 'Email użytkownika', `role` enum ('wnioskodawca', 'admin', 'ocen', 'god') NOT NULL DEFAULT 'wnioskodawca', `isBanned` enum ('0', '1') NOT NULL DEFAULT '0', `isBlocked` enum ('0', '1') NOT NULL DEFAULT '0', `isConfirmed` enum ('0', '1') NOT NULL DEFAULT '0', `isRemoved` enum ('0', '1') NOT NULL DEFAULT '0', `failedLogins` int NOT NULL, `blockTime` datetime NOT NULL, `ckeckedRodoTime` datetime NOT NULL, `ckeckedRegulationsTime` datetime NOT NULL, `description` varchar(255) NOT NULL, INDEX `IDX_844d21e341da4c8be4cd3f77c7` (`uuid`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL COMMENT 'Data utworzenia' DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL COMMENT 'Data ostatniej aktualizacji' DEFAULT CURRENT_TIMESTAMP(6), `uuid` varchar(255) NOT NULL COMMENT 'Unikalny identyfikator uuidV4', `login` varchar(255) NOT NULL, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `role` enum ('wnioskodawca', 'admin', 'ocen', 'god') NOT NULL DEFAULT 'wnioskodawca', `verifiedAt` datetime NULL, `isBanned` enum ('0', '1') NULL DEFAULT '0', `isBlocked` enum ('0', '1') NULL DEFAULT '0', `isRemoved` enum ('0', '1') NULL DEFAULT '0', `failedLogins` int NULL, `blockedAt` datetime NULL, `ckeckedRodoAt` datetime NULL, `ckeckedRegulAt` datetime NULL, INDEX `IDX_951b8f1dfc94ac1d0301a14b7e` (`uuid`), UNIQUE INDEX `IDX_2d443082eccd5198f95f2a36e2` (`login`), UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `submit_history` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL COMMENT 'Data utworzenia' DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL COMMENT 'Data ostatniej aktualizacji' DEFAULT CURRENT_TIMESTAMP(6), `uuid` varchar(255) NOT NULL COMMENT 'Unikalny identyfikator uuidV4', `submitId` int NOT NULL COMMENT 'ID wniosku', `date_official` date NULL COMMENT 'Data faktyczna', `userId` int NOT NULL COMMENT 'Data użytkownika', INDEX `IDX_d2b372b3971fbda2e0970d8b1e` (`uuid`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `submits` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL COMMENT 'Data utworzenia' DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL COMMENT 'Data ostatniej aktualizacji' DEFAULT CURRENT_TIMESTAMP(6), `uuid` varchar(255) NOT NULL COMMENT 'Unikalny identyfikator uuidV4', `ver` int NOT NULL COMMENT 'Wersja wniosku', `fresh` enum ('0', '1') NOT NULL COMMENT '1:obowiązujący, 0:archiwalny' DEFAULT '1', `status` int NOT NULL COMMENT 'Status wniosku' DEFAULT '1', `isParent` tinyint NOT NULL COMMENT 'Status prawny Wnioskodawcy - Rodzic ucznia', `isSelf` tinyint NOT NULL COMMENT 'Status prawny Wnioskodawcy - Pełnoletni uczeń', `phone` varchar(255) NULL COMMENT 'Telefon wniskodawcy', `email` varchar(255) NULL COMMENT 'Email wnioskodawcy', `epuapAdr` varchar(255) NULL COMMENT 'Adres skrzynki ePuap wnioskodawcy', `pupilFirstName` varchar(255) NOT NULL COMMENT 'Imię ucznia', `pupilLastName` varchar(255) NOT NULL COMMENT 'Nazwisko ucznia', `pupilPesel` varchar(255) NOT NULL COMMENT 'PESEL ucznia', `pupilPhone` varchar(255) NOT NULL COMMENT 'Telefon ucznia', `pupilEmail` varchar(255) NULL COMMENT 'Email ucznia', `schoolName` varchar(255) NOT NULL COMMENT 'Nazwa szkoły ucznia', `schoolStreetName` varchar(255) NOT NULL COMMENT 'Ulica szkoły ucznia', `schoolStreetNr` varchar(255) NOT NULL COMMENT 'Numer ulicy szkoły ucznia', `schoolTown` varchar(255) NOT NULL COMMENT 'Miejscowość szkoły ucznia', `schoolZip` varchar(255) NOT NULL COMMENT 'Kod pocztowy szkoły ucznia', `schoolVoyev` varchar(255) NOT NULL COMMENT 'Województwo szkoły ucznia', `schoolType` enum ('liceum', 'technikum') NOT NULL COMMENT 'Typ szkoły ucznia', `counselorFirstName` varchar(255) NOT NULL COMMENT 'Imię opiekuna dydaktycznego ucznia', `counselorLastName` varchar(255) NOT NULL COMMENT 'Nazwisko opiekuna dydaktycznego ucznia', `counselorProfile` enum ('nauczyciel', 'pedagog', 'doradca') NOT NULL COMMENT 'Profil opiekuna dydaktycznego', `priMathGrade` decimal(5,2) NOT NULL COMMENT 'Podstawowe kryteria oceny - ocena z matematyki', `priLang` varchar(255) NOT NULL COMMENT 'Podstawowe kryteria oceny - nazwa języka obcego', `priLangGrade` decimal(5,2) NOT NULL COMMENT 'Podstawowe kryteria oceny - ocena z języka obcego', `priOtherSubj` varchar(255) NOT NULL COMMENT 'Podstawowe kryteria oceny - nazwa wybranego przedmiotu kluczowego', `priOtherSubjGrade` decimal(5,2) NOT NULL COMMENT 'Podstawowe kryteria oceny - ocena z wybranego przedmiotu kluczowego', `priTotalAver` enum ('5.33', '5.67', '6') NOT NULL COMMENT 'Podstawowe kryteria oceny - średnia z przedmiotów kierunkowych', `allTotalAver` enum ('5,00-5,17', '5,18-5,33', '5,34-5,50', '5,51-5,67', '5,68-5,84', '5,85-6,00') NOT NULL COMMENT 'Podstawowe kryteria oceny - średnia z wszystkich przedmiotów', `isFinalist` enum ('0', '1') NOT NULL COMMENT 'Dodatkowe krytria oceny - czy uzyskał/a tytuł finalisty' DEFAULT '0', `isAllowed` enum ('0', '1') NOT NULL COMMENT 'Dodatkowe krytria oceny - czy posiada zezwolenie na indyw. program nauczania' DEFAULT '0', `isHandicap` enum ('0', '1') NOT NULL COMMENT 'Dodatkowe krytria oceny - czy uczeń/uczennica nbiepełnosprawny/a' DEFAULT '0', `userUuid` varchar(255) NOT NULL COMMENT 'UuuidV4 użytkownika', `userId` int NOT NULL COMMENT 'ID użytkownika', INDEX `IDX_561ba75dc83edf9a9b111a71c0` (`uuid`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `user_history` ADD CONSTRAINT `FK_1457ea6e3cbd29bf788292d0d15` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `submit_history` ADD CONSTRAINT `FK_9e807a29601045d5292573d6853` FOREIGN KEY (`submitId`) REFERENCES `submits`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `submits` ADD CONSTRAINT `FK_ca444979b6872c655abe2585ac8` FOREIGN KEY (`userUuid`, `userId`) REFERENCES `users`(`uuid`,`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `submits` DROP FOREIGN KEY `FK_ca444979b6872c655abe2585ac8`");
        await queryRunner.query("ALTER TABLE `submit_history` DROP FOREIGN KEY `FK_9e807a29601045d5292573d6853`");
        await queryRunner.query("ALTER TABLE `user_history` DROP FOREIGN KEY `FK_1457ea6e3cbd29bf788292d0d15`");
        await queryRunner.query("DROP INDEX `IDX_561ba75dc83edf9a9b111a71c0` ON `submits`");
        await queryRunner.query("DROP TABLE `submits`");
        await queryRunner.query("DROP INDEX `IDX_d2b372b3971fbda2e0970d8b1e` ON `submit_history`");
        await queryRunner.query("DROP TABLE `submit_history`");
        await queryRunner.query("DROP INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users`");
        await queryRunner.query("DROP INDEX `IDX_2d443082eccd5198f95f2a36e2` ON `users`");
        await queryRunner.query("DROP INDEX `IDX_951b8f1dfc94ac1d0301a14b7e` ON `users`");
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP INDEX `IDX_844d21e341da4c8be4cd3f77c7` ON `user_history`");
        await queryRunner.query("DROP TABLE `user_history`");
        await queryRunner.query("DROP TABLE `dict_submit_statuses`");
        await queryRunner.query("DROP TABLE `password_reset`");
        await queryRunner.query("DROP TABLE `dict_history_events`");
    }

}
