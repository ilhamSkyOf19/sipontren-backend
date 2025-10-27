/*
  Warnings:

  - You are about to drop the column `img` on the `pamflet` table. All the data in the column will be lost.
  - Added the required column `pamflet` to the `Pamflet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pamflet` DROP COLUMN `img`,
    ADD COLUMN `pamflet` VARCHAR(191) NOT NULL;
