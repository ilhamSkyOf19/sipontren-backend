/*
  Warnings:

  - You are about to alter the column `tanggal_lahir` on the `student` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `student` MODIFY `tanggal_lahir` DATETIME(3) NOT NULL;
