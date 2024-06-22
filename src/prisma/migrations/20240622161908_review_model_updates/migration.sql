/*
  Warnings:

  - You are about to drop the column `paymentMethod` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `user` table. All the data in the column will be lost.
  - Added the required column `bookingId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `payment` DROP COLUMN `paymentMethod`;

-- AlterTable
ALTER TABLE `property` MODIFY `description` VARCHAR(600) NOT NULL,
    MODIFY `address` VARCHAR(300) NOT NULL,
    MODIFY `extraInfo` VARCHAR(400) NULL;

-- AlterTable
ALTER TABLE `review` ADD COLUMN `bookingId` VARCHAR(191) NOT NULL,
    MODIFY `review` VARCHAR(300) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `password`;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `Booking`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
