/*
  Warnings:

  - Added the required column `isEmailSend` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `booking` ADD COLUMN `isEmailSend` BOOLEAN NOT NULL;
