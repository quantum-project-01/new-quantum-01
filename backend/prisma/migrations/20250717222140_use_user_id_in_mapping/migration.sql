-- DropForeignKey
ALTER TABLE "partner_venue_map" DROP CONSTRAINT "partner_venue_map_partnerDetailId_fkey";

-- AddForeignKey
ALTER TABLE "partner_venue_map" ADD CONSTRAINT "partner_venue_map_partnerDetailId_fkey" FOREIGN KEY ("partnerDetailId") REFERENCES "partner_details"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
