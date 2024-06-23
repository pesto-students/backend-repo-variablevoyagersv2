/*
  Warnings:

  - You are about to drop the column `bookingId` on the `review` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_bookingId_fkey`;

-- AlterTable
ALTER TABLE `review` DROP COLUMN `bookingId`;
