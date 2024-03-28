-- DropForeignKey
ALTER TABLE "Click" DROP CONSTRAINT "Click_identifierId_fkey";

-- AlterTable
ALTER TABLE "Click" ALTER COLUMN "identifierId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Click" ADD CONSTRAINT "Click_identifierId_fkey" FOREIGN KEY ("identifierId") REFERENCES "Identifier"("id") ON DELETE SET NULL ON UPDATE CASCADE;
