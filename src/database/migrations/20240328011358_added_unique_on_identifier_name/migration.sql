/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Identifier` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Identifier_name_key" ON "Identifier"("name");
