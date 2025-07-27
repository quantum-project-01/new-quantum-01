/*
  Warnings:

  - You are about to drop the column `duaration` on the `bookings` table. All the data in the column will be lost.
  - Added the required column `duration` to the `bookings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "PaymentStatus" ADD VALUE 'initiated';

-- AlterEnum
ALTER TYPE "SlotAvailability" ADD VALUE 'locked';

-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "duaration",
ADD COLUMN     "duration" INTEGER NOT NULL,
ALTER COLUMN "bookingStatus" DROP DEFAULT,
ALTER COLUMN "paymentStatus" DROP DEFAULT;
