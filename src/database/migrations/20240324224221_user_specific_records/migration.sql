/*
  Warnings:

  - A unique constraint covering the columns `[slug,userId]` on the table `Destination` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Destination_name_key";

-- DropIndex
DROP INDEX "Destination_slug_key";

-- CreateIndex
CREATE UNIQUE INDEX "Destination_slug_userId_key" ON "Destination"("slug", "userId");
