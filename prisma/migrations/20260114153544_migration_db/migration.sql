-- CreateTable
CREATE TABLE `admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `role` ENUM('admin') NOT NULL DEFAULT 'admin',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `alumni` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `angkatan` VARCHAR(191) NOT NULL,
    `img_alumni` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `news` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category` ENUM('berita', 'artikel') NOT NULL DEFAULT 'berita',
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `thumbnail` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pamflet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `pamflet` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `student` (
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
    `no_telepon` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ustad` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `jenis_kelamin` ENUM('laki_laki', 'perempuan') NOT NULL,
    `tanggal_lahir` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `no_telepon` VARCHAR(191) NOT NULL,
    `jabatan` VARCHAR(191) NOT NULL,
    `ustad_img` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `tempat_lahir` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
