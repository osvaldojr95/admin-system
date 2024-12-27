/*
  Warnings:

  - You are about to drop the column `date` on the `customer_imports` table. All the data in the column will be lost.
  - You are about to drop the column `totalErrors` on the `customer_imports` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "customer_imports" DROP COLUMN "date",
DROP COLUMN "totalErrors",
ADD COLUMN     "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "processingDate" TIMESTAMP(3);
