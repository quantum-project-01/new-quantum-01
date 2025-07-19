-- CreateTable
CREATE TABLE "partner_venue_map" (
    "id" TEXT NOT NULL,
    "partnerDetailId" TEXT NOT NULL,
    "venueId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "partner_venue_map_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "partner_venue_map_partnerDetailId_venueId_key" ON "partner_venue_map"("partnerDetailId", "venueId");

-- AddForeignKey
ALTER TABLE "partner_venue_map" ADD CONSTRAINT "partner_venue_map_partnerDetailId_fkey" FOREIGN KEY ("partnerDetailId") REFERENCES "partner_details"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partner_venue_map" ADD CONSTRAINT "partner_venue_map_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "venues"("id") ON DELETE CASCADE ON UPDATE CASCADE;
