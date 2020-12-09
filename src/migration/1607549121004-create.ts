import {MigrationInterface, QueryRunner} from "typeorm";

export class create1607549121004 implements MigrationInterface {
    name = 'create1607549121004'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `dict_history_events` (`id` int NOT NULL AUTO_INCREMENT, `model` enum ('submit', 'user') NOT NULL, `description` varchar(255) NOT NULL, `status` int NULL COMMENT 'status tylko dla wnisków', PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `submit_history` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `uuid` varchar(255) NOT NULL, `submitId` int NOT NULL, `status` int NOT NULL, `date_official` date NULL, `userId` int NOT NULL, INDEX `IDX_d2b372b3971fbda2e0970d8b1e` (`uuid`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `submits` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `uuid` varchar(255) NOT NULL, `ver` int NOT NULL COMMENT 'Wersja wniosku', `fresh` enum ('0', '1') NOT NULL COMMENT '1:obowiązujący, 0:archiwalny' DEFAULT '1', `status` int NOT NULL DEFAULT '1', `isParent` tinyint NOT NULL COMMENT 'Status prawny Wnioskodawcy - Rodzic ucznia', `isSelf` tinyint NOT NULL COMMENT 'Status prawny Wnioskodawcy - Pełnoletni uczeń', `phone` varchar(255) NULL, `email` varchar(255) NULL, `epuapAdr` varchar(255) NULL, `pupilFirstName` varchar(255) NOT NULL, `pupilLastName` varchar(255) NOT NULL, `pupilPesel` varchar(255) NOT NULL, `pupilPhone` varchar(255) NOT NULL, `pupilEmail` varchar(255) NOT NULL, `schoolName` varchar(255) NOT NULL, `schoolStreetName` varchar(255) NOT NULL, `schoolStreetNr` varchar(255) NOT NULL, `schoolTown` varchar(255) NOT NULL, `schoolZip` varchar(255) NOT NULL, `schoolVoyev` varchar(255) NOT NULL, `schoolType` enum ('liceum', 'technikum') NOT NULL, `counselorFirstName` varchar(255) NOT NULL, `counselorLastName` varchar(255) NOT NULL, `counselorProfile` enum ('nauczyciel', 'pedagog', 'doradca') NOT NULL, `priMathAver` decimal(5,2) NOT NULL, `priLang` varchar(255) NOT NULL, `priLangAver` decimal(5,2) NOT NULL, `priOtherSubj` varchar(255) NOT NULL, `priOtherSubjAver` decimal(5,2) NOT NULL, `priTotalAver` decimal(5,2) NOT NULL, `allTotalAver` decimal(5,2) NOT NULL, `isFinalist` tinyint NOT NULL, `isAllowed` tinyint NOT NULL, `isHandicap` tinyint NOT NULL, `userUuid` varchar(255) NOT NULL, `userId` int NOT NULL, INDEX `IDX_561ba75dc83edf9a9b111a71c0` (`uuid`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user_history` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `uuid` varchar(255) NOT NULL, `userId` int NOT NULL, `userUuuid` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `role` enum ('wnioskodawca', 'admin', 'ocen', 'god') NOT NULL DEFAULT 'wnioskodawca', `isBanned` enum ('0', '1') NOT NULL DEFAULT '0', `isBlocked` enum ('0', '1') NOT NULL DEFAULT '0', `isConfirmed` enum ('0', '1') NOT NULL DEFAULT '0', `isRemoved` enum ('0', '1') NOT NULL DEFAULT '0', `failedLogins` int NOT NULL, `blockTime` datetime NOT NULL, `ckeckedRodoTime` datetime NOT NULL, `ckeckedRegulationsTime` datetime NOT NULL, `description` varchar(255) NOT NULL, INDEX `IDX_844d21e341da4c8be4cd3f77c7` (`uuid`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `uuid` varchar(255) NOT NULL, `login` varchar(255) NOT NULL, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `role` enum ('wnioskodawca', 'admin', 'ocen', 'god') NOT NULL DEFAULT 'wnioskodawca', `isBanned` enum ('0', '1') NULL DEFAULT '0', `isBlocked` enum ('0', '1') NULL DEFAULT '0', `verifiedAt` datetime NULL, `isRemoved` enum ('0', '1') NULL DEFAULT '0', `failedLogins` int NULL, `blockedAt` datetime NULL, `ckeckedRodoAt` datetime NULL, `ckeckedRegulAt` datetime NULL, INDEX `IDX_951b8f1dfc94ac1d0301a14b7e` (`uuid`), UNIQUE INDEX `IDX_2d443082eccd5198f95f2a36e2` (`login`), UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `password_reset` (`id` int NOT NULL AUTO_INCREMENT, `userId` int NOT NULL, `token` varchar(255) NOT NULL, `expiredAt` datetime NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `dict_submit_statuses` (`id` int NOT NULL AUTO_INCREMENT, `title` enum ('rozp', 'zlozony', 'w_ocenie', 'w_poprawie', 'odrzucony', 'negatywny', 'pozytywny', 'porzucony', 'bez_rozp') NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `submit_history` ADD CONSTRAINT `FK_9e807a29601045d5292573d6853` FOREIGN KEY (`submitId`) REFERENCES `submits`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `submits` ADD CONSTRAINT `FK_ca444979b6872c655abe2585ac8` FOREIGN KEY (`userUuid`, `userId`) REFERENCES `users`(`uuid`,`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user_history` ADD CONSTRAINT `FK_1457ea6e3cbd29bf788292d0d15` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user_history` DROP FOREIGN KEY `FK_1457ea6e3cbd29bf788292d0d15`");
        await queryRunner.query("ALTER TABLE `submits` DROP FOREIGN KEY `FK_ca444979b6872c655abe2585ac8`");
        await queryRunner.query("ALTER TABLE `submit_history` DROP FOREIGN KEY `FK_9e807a29601045d5292573d6853`");
        await queryRunner.query("DROP TABLE `dict_submit_statuses`");
        await queryRunner.query("DROP TABLE `password_reset`");
        await queryRunner.query("DROP INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users`");
        await queryRunner.query("DROP INDEX `IDX_2d443082eccd5198f95f2a36e2` ON `users`");
        await queryRunner.query("DROP INDEX `IDX_951b8f1dfc94ac1d0301a14b7e` ON `users`");
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP INDEX `IDX_844d21e341da4c8be4cd3f77c7` ON `user_history`");
        await queryRunner.query("DROP TABLE `user_history`");
        await queryRunner.query("DROP INDEX `IDX_561ba75dc83edf9a9b111a71c0` ON `submits`");
        await queryRunner.query("DROP TABLE `submits`");
        await queryRunner.query("DROP INDEX `IDX_d2b372b3971fbda2e0970d8b1e` ON `submit_history`");
        await queryRunner.query("DROP TABLE `submit_history`");
        await queryRunner.query("DROP TABLE `dict_history_events`");
    }

}
