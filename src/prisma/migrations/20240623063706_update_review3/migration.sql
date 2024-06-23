/*
  Warnings:

  - Added the required column `fullName` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `review` ADD COLUMN `avatar` VARCHAR(191) NULL,
    ADD COLUMN `fullName` VARCHAR(300) NOT NULL;
