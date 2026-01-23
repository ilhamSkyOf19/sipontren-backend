-- DropIndex
DROP INDEX `student_createdAt_jenis_kelamin_nama_lengkap_idx` ON `student`;

-- CreateTable
CREATE TABLE `prestasi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_prestasi` ENUM('internasional', 'nasional', 'provinsi', 'kabupaten', 'kecamatan') NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `tahun_prestasi` INTEGER NOT NULL,
    `prestasi` VARCHAR(191) NOT NULL,
    `photo` VARCHAR(191) NOT NULL,
    `jenis_kelamin` ENUM('laki_laki', 'perempuan') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `prestasi_category_prestasi_idx`(`category_prestasi`),
    INDEX `prestasi_category_prestasi_tahun_prestasi_idx`(`category_prestasi`, `tahun_prestasi`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `student_createdAt_idx` ON `student`(`createdAt`);

-- CreateIndex
CREATE INDEX `student_jenis_kelamin_idx` ON `student`(`jenis_kelamin`);

-- CreateIndex
CREATE INDEX `student_jenis_sekolah_idx` ON `student`(`jenis_sekolah`);
