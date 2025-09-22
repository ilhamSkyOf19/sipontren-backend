-- CreateTable
CREATE TABLE `Student` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `jenis_sekolah` ENUM('SD', 'SMP', 'SMA') NOT NULL,
    `nisn` VARCHAR(191) NOT NULL,
    `nik` VARCHAR(191) NOT NULL,
    `nama_lengkap` VARCHAR(191) NOT NULL,
    `jenis_kelamin` ENUM('laki_laki', 'perempuan') NOT NULL,
    `usia` INTEGER NOT NULL,
    `tempat_lahir` VARCHAR(191) NOT NULL,
    `tanggal_lahir` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `anak_ke` INTEGER NOT NULL,
    `jumlah_saudara` INTEGER NOT NULL,
    `asal_sekolah` VARCHAR(191) NOT NULL,
    `alamat_sekolah_asal` VARCHAR(191) NOT NULL,
    `nama_lengkap_ayah` VARCHAR(191) NOT NULL,
    `nama_lengkap_ibu` VARCHAR(191) NOT NULL,
    `nama_lengkap_wali` VARCHAR(191) NOT NULL,
    `foto_formal` VARCHAR(191) NOT NULL,
    `fc_akta_kelahiran` VARCHAR(191) NOT NULL,
    `foto_kk` VARCHAR(191) NOT NULL,
    `fc_ktp` VARCHAR(191) NOT NULL,
    `fc_kis_kip` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
