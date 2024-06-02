/*
  Warnings:

  - You are about to drop the column `isNew` on the `Click` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Click" DROP COLUMN "isNew",
ADD COLUMN     "isRead" BOOLEAN NOT NULL DEFAULT false;
