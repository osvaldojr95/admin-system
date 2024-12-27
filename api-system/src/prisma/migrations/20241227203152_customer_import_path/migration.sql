/*
  Warnings:

  - Added the required column `path` to the `customer_imports` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "customer_imports" ADD COLUMN     "path" TEXT NOT NULL;
