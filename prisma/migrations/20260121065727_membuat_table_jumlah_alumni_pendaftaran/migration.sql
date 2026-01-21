-- CreateTable
CREATE TABLE `jumlah_alumni` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `laki_laki` INTEGER NOT NULL,
    `perempuan` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pendaftaran` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dari` DATETIME(3) NOT NULL,
    `sampai` DATETIME(3) NOT NULL,
    `aktif` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
