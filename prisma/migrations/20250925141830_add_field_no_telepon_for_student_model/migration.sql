/*
  Warnings:

  - Added the required column `no_telepon` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `student` ADD COLUMN `no_telepon` VARCHAR(191) NOT NULL;
