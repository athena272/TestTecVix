-- AlterTable
ALTER TABLE `brandMaster` ADD COLUMN `allowEditContactInfo` BOOLEAN NULL DEFAULT true,
    ADD COLUMN `allowEditPassword` BOOLEAN NULL DEFAULT true,
    ADD COLUMN `allowEditProfileImage` BOOLEAN NULL DEFAULT true;
