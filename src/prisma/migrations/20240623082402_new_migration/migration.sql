/*
  Warnings:

  - You are about to drop the column `paymentMethod` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `payment` DROP COLUMN `paymentMethod`;

-- AlterTable
ALTER TABLE `property` MODIFY `description` VARCHAR(600) NOT NULL,
    MODIFY `address` VARCHAR(300) NOT NULL,
    MODIFY `extraInfo` VARCHAR(400) NULL;

-- AlterTable
ALTER TABLE `review` MODIFY `review` VARCHAR(300) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `password`;
