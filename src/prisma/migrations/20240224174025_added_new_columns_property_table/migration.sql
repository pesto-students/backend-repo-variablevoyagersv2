/*
  Warnings:

  - Added the required column `address` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lat` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lng` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pincode` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Property` ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD COLUMN `country` VARCHAR(191) NOT NULL,
    ADD COLUMN `lat` VARCHAR(191) NOT NULL,
    ADD COLUMN `lng` VARCHAR(191) NOT NULL,
    ADD COLUMN `pincode` VARCHAR(191) NOT NULL;
