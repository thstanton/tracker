/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Destination` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Destination` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Destination_slug_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Destination_name_key" ON "Destination"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Destination_slug_key" ON "Destination"("slug");
