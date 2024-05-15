-- DropForeignKey
ALTER TABLE "Click" DROP CONSTRAINT "Click_destinationId_fkey";

-- DropForeignKey
ALTER TABLE "Destination" DROP CONSTRAINT "Destination_userId_fkey";

-- AddForeignKey
ALTER TABLE "Click" ADD CONSTRAINT "Click_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Destination" ADD CONSTRAINT "Destination_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
