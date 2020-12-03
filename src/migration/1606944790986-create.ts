import {MigrationInterface, QueryRunner} from "typeorm";

export class create1606944790986 implements MigrationInterface {
    name = 'create1606944790986'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `wnioski` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `uuid` varchar(255) NOT NULL, `isParent` tinyint NOT NULL COMMENT 'Status prawny Wnioskodawcy - Rodzic ucznia', `isSelf` tinyint NOT NULL COMMENT 'Status prawny Wnioskodawcy - Pełnoletni uczeń', `phone` varchar(255) NULL, `email` varchar(255) NULL, `epuapAdr` varchar(255) NULL, `pupilFirstName` varchar(255) NOT NULL, `pupilLastName` varchar(255) NOT NULL, `pupilPesel` varchar(255) NOT NULL, `pupilPhone` varchar(255) NOT NULL, `pupilEmail` varchar(255) NOT NULL, `schoolName` varchar(255) NOT NULL, `schoolStreetName` varchar(255) NOT NULL, `schoolStreetNr` varchar(255) NOT NULL, `schoolTown` varchar(255) NOT NULL, `schoolZip` varchar(255) NOT NULL, `schoolVoyev` varchar(255) NOT NULL, `schoolType` enum ('liceum', 'technikum') NOT NULL, `counselorFirstName` varchar(255) NOT NULL, `counselorLastName` varchar(255) NOT NULL, `counselorProfile` enum ('nauczyciel', 'pedagog', 'doradca') NOT NULL, `priMathAver` int NOT NULL, `priLang` varchar(255) NOT NULL, `priLangAver` int NOT NULL, `priOtherSubj` varchar(255) NOT NULL, `priOtherSubjAver` int NOT NULL, `priTotalAver` int NOT NULL, `allTotalAver` int NOT NULL, `isFinalist` tinyint NOT NULL, `isAllowed` tinyint NOT NULL, `isHandicap` tinyint NOT NULL, `userUuid` varchar(255) NOT NULL, `userId` int NULL, INDEX `IDX_d180a546c6d1d3d5fce809c9fd` (`id`), INDEX `IDX_23eed20ee47e22daf0074e6147` (`uuid`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `uuid` varchar(255) NOT NULL, `login` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `banned` enum ('0', '1') NOT NULL DEFAULT '0', `blocked` enum ('0', '1') NOT NULL DEFAULT '0', `role` enum ('wnioskodawca', 'admin', 'ocen', 'god') NOT NULL DEFAULT 'wnioskodawca', INDEX `IDX_a3ffb1c0c8416b9fc6f907b743` (`id`), INDEX `IDX_951b8f1dfc94ac1d0301a14b7e` (`uuid`), UNIQUE INDEX `IDX_2d443082eccd5198f95f2a36e2` (`login`), UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `wnioski` ADD CONSTRAINT `FK_321b448623a4bac017cb511fe6d` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `wnioski` ADD CONSTRAINT `FK_1c5da5cd1b1f330ba4956f8ff27` FOREIGN KEY (`userUuid`) REFERENCES `users`(`uuid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `wnioski` DROP FOREIGN KEY `FK_1c5da5cd1b1f330ba4956f8ff27`");
        await queryRunner.query("ALTER TABLE `wnioski` DROP FOREIGN KEY `FK_321b448623a4bac017cb511fe6d`");
        await queryRunner.query("DROP INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users`");
        await queryRunner.query("DROP INDEX `IDX_2d443082eccd5198f95f2a36e2` ON `users`");
        await queryRunner.query("DROP INDEX `IDX_951b8f1dfc94ac1d0301a14b7e` ON `users`");
        await queryRunner.query("DROP INDEX `IDX_a3ffb1c0c8416b9fc6f907b743` ON `users`");
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP INDEX `IDX_23eed20ee47e22daf0074e6147` ON `wnioski`");
        await queryRunner.query("DROP INDEX `IDX_d180a546c6d1d3d5fce809c9fd` ON `wnioski`");
        await queryRunner.query("DROP TABLE `wnioski`");
    }

}
