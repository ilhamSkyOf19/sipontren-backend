/*
  Warnings:

  - Added the required column `tempat_lahir` to the `Ustad` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ustad` ADD COLUMN `tempat_lahir` VARCHAR(191) NOT NULL;
