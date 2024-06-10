-- AlterTable
ALTER TABLE `user` ADD COLUMN `isNewUser` BOOLEAN NOT NULL DEFAULT true,
    MODIFY `password` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `OTP` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,
    `otp` VARCHAR(191) NULL,

    UNIQUE INDEX `OTP_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
