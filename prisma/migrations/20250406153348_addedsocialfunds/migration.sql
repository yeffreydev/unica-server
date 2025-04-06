-- AlterTable
ALTER TABLE "UserStock" ADD COLUMN     "socialFundsTransactionsId" INTEGER;

-- CreateTable
CREATE TABLE "SocialFunds" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "bankIdentityId" INTEGER NOT NULL,

    CONSTRAINT "SocialFunds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialFundsTransactions" (
    "id" SERIAL NOT NULL,
    "socialFundsId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "bankIdentityId" INTEGER NOT NULL,

    CONSTRAINT "SocialFundsTransactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserStock" ADD CONSTRAINT "UserStock_socialFundsTransactionsId_fkey" FOREIGN KEY ("socialFundsTransactionsId") REFERENCES "SocialFundsTransactions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialFunds" ADD CONSTRAINT "SocialFunds_bankIdentityId_fkey" FOREIGN KEY ("bankIdentityId") REFERENCES "BankIdentity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialFundsTransactions" ADD CONSTRAINT "SocialFundsTransactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialFundsTransactions" ADD CONSTRAINT "SocialFundsTransactions_socialFundsId_fkey" FOREIGN KEY ("socialFundsId") REFERENCES "SocialFunds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialFundsTransactions" ADD CONSTRAINT "SocialFundsTransactions_bankIdentityId_fkey" FOREIGN KEY ("bankIdentityId") REFERENCES "BankIdentity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
