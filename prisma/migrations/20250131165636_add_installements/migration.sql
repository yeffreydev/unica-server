-- AlterTable
ALTER TABLE "Loan" ADD COLUMN     "paid" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "LoanInterestPayment" ADD COLUMN     "installmentId" INTEGER;

-- AlterTable
ALTER TABLE "LoanPayment" ADD COLUMN     "installmentId" INTEGER;

-- AlterTable
ALTER TABLE "LoanType" ADD COLUMN     "interestRate" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "LoanInstallment" (
    "id" SERIAL NOT NULL,
    "payment" DOUBLE PRECISION NOT NULL,
    "interest" DOUBLE PRECISION NOT NULL,
    "paid" BOOLEAN NOT NULL,
    "loanId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LoanInstallment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LoanInstallment" ADD CONSTRAINT "LoanInstallment_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "Loan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanPayment" ADD CONSTRAINT "LoanPayment_installmentId_fkey" FOREIGN KEY ("installmentId") REFERENCES "LoanInstallment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanInterestPayment" ADD CONSTRAINT "LoanInterestPayment_installmentId_fkey" FOREIGN KEY ("installmentId") REFERENCES "LoanInstallment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
