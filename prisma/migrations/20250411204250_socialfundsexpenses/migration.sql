-- CreateTable
CREATE TABLE "SocialFundsExpenses" (
    "id" SERIAL NOT NULL,
    "socialFundsId" INTEGER NOT NULL,
    "userId" INTEGER,
    "amount" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "bankIdentityId" INTEGER,

    CONSTRAINT "SocialFundsExpenses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SocialFundsExpenses" ADD CONSTRAINT "SocialFundsExpenses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialFundsExpenses" ADD CONSTRAINT "SocialFundsExpenses_socialFundsId_fkey" FOREIGN KEY ("socialFundsId") REFERENCES "SocialFunds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialFundsExpenses" ADD CONSTRAINT "SocialFundsExpenses_bankIdentityId_fkey" FOREIGN KEY ("bankIdentityId") REFERENCES "BankIdentity"("id") ON DELETE SET NULL ON UPDATE CASCADE;
