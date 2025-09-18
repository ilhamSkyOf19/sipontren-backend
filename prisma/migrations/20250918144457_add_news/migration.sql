-- CreateTable
CREATE TABLE `News` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category` ENUM('berita', 'artikel') NOT NULL DEFAULT 'berita',
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
