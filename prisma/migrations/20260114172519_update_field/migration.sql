/*
  Warnings:

  - You are about to drop the column `updateAt` on the `pamflet` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `ustad` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `pamflet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ustad` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pamflet` DROP COLUMN `updateAt`,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `student` DROP COLUMN `updateAt`,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `ustad` DROP COLUMN `updateAt`,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
