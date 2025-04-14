/*
  Warnings:

  - You are about to drop the column `value` on the `Field` table. All the data in the column will be lost.
  - You are about to drop the column `values` on the `Field` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Field" DROP COLUMN "value",
DROP COLUMN "values";

-- CreateTable
CREATE TABLE "FielValue" (
    "id" SERIAL NOT NULL,
    "formSubmissionId" INTEGER NOT NULL,
    "fieldId" INTEGER NOT NULL,
    "value" TEXT,
    "values" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FielValue_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FielValue" ADD CONSTRAINT "FielValue_formSubmissionId_fkey" FOREIGN KEY ("formSubmissionId") REFERENCES "FormSubmission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FielValue" ADD CONSTRAINT "FielValue_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "Field"("id") ON DELETE CASCADE ON UPDATE CASCADE;
