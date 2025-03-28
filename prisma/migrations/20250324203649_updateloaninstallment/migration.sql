/*
  Warnings:

  - Made the column `loanId` on table `LoanInstallment` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "LoanInstallment" DROP CONSTRAINT "LoanInstallment_loanId_fkey";

-- AlterTable
ALTER TABLE "LoanInstallment" ALTER COLUMN "paid" SET DEFAULT false,
ALTER COLUMN "loanId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "LoanInstallment" ADD CONSTRAINT "LoanInstallment_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "Loan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
