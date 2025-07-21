-- CreateEnum
CREATE TYPE "SlotAvailability" AS ENUM ('available', 'not_available', 'booked', 'filling_fast');

-- CreateTable
CREATE TABLE "slots" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "availability" "SlotAvailability" NOT NULL DEFAULT 'available',
    "startTime" VARCHAR(10) NOT NULL,
    "endTime" VARCHAR(10) NOT NULL,
    "facilityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "slots_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "slots" ADD CONSTRAINT "slots_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "facilities"("id") ON DELETE CASCADE ON UPDATE CASCADE;
