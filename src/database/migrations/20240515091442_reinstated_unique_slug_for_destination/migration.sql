/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Destination` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Destination_slug_key" ON "Destination"("slug");
