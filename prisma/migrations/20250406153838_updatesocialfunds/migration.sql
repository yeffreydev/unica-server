/*
  Warnings:

  - You are about to drop the column `socialFundsTransactionsId` on the `UserStock` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "SocialFundsTransactions" DROP CONSTRAINT "SocialFundsTransactions_bankIdentityId_fkey";

-- DropForeignKey
ALTER TABLE "SocialFundsTransactions" DROP CONSTRAINT "SocialFundsTransactions_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserStock" DROP CONSTRAINT "UserStock_socialFundsTransactionsId_fkey";

-- AlterTable
ALTER TABLE "SocialFundsTransactions" ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "bankIdentityId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserStock" DROP COLUMN "socialFundsTransactionsId";

-- AddForeignKey
ALTER TABLE "SocialFundsTransactions" ADD CONSTRAINT "SocialFundsTransactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialFundsTransactions" ADD CONSTRAINT "SocialFundsTransactions_bankIdentityId_fkey" FOREIGN KEY ("bankIdentityId") REFERENCES "BankIdentity"("id") ON DELETE SET NULL ON UPDATE CASCADE;
