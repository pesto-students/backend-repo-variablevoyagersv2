/*
  Warnings:

  - The values [CONFIRMED] on the enum `Payment_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `booking` MODIFY `bookingStatus` ENUM('PENDING', 'AWAITING_OWNER_APPROVAL', 'FAILED', 'CONFIRMED', 'CANCELLED', 'COMPLETED') NOT NULL;

-- AlterTable
ALTER TABLE `payment` MODIFY `status` ENUM('PENDING', 'SUCCESS', 'FAILED', 'REFUNDED') NOT NULL;
