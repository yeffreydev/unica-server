/*
  Warnings:

  - Added the required column `price` to the `UserStock` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserStock" DROP CONSTRAINT "UserStock_stockId_fkey";

-- AlterTable
ALTER TABLE "UserStock" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "stockId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "UserStock" ADD CONSTRAINT "UserStock_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "Stock"("id") ON DELETE SET NULL ON UPDATE CASCADE;
