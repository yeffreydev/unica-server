/*
  Warnings:

  - You are about to drop the column `bankIdentityId` on the `SocialFunds` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `SocialFunds` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "SocialFunds" DROP CONSTRAINT "SocialFunds_bankIdentityId_fkey";

-- AlterTable
ALTER TABLE "SocialFunds" DROP COLUMN "bankIdentityId",
DROP COLUMN "description";
