/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `configs` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "configs_key_key" ON "configs"("key");
