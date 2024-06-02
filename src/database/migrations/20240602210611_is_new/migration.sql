/*
  Warnings:

  - You are about to drop the column `new` on the `Click` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Click" DROP COLUMN "new",
ADD COLUMN     "isNew" BOOLEAN NOT NULL DEFAULT true;
