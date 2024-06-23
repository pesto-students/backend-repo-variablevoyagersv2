/*
  Warnings:

  - You are about to drop the column `userId` on the `review` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[bookingId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bookingId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_userId_fkey`;

-- AlterTable
ALTER TABLE `review` DROP COLUMN `userId`,
    ADD COLUMN `bookingId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Review_bookingId_key` ON `Review`(`bookingId`);

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `Booking`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
