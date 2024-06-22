/*
  Warnings:

  - You are about to drop the column `propertyId` on the `review` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_propertyId_fkey`;

-- AlterTable
ALTER TABLE `review` DROP COLUMN `propertyId`;
