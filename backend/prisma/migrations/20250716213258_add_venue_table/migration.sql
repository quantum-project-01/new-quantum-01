-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" VARCHAR(20) NOT NULL DEFAULT 'user';

-- CreateTable
CREATE TABLE "partner_details" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "companyName" VARCHAR(255) NOT NULL,
    "subscriptionType" VARCHAR(20) NOT NULL,
    "gstNumber" VARCHAR(20),
    "websiteUrl" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "partner_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "venues" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "location" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "highlight" VARCHAR(255) NOT NULL,
    "main" VARCHAR(255) NOT NULL,
    "rating" DECIMAL(2,1),
    "start_price_per_hour" DECIMAL(10,2) NOT NULL,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedOn" TIMESTAMP(3) NOT NULL,
    "partnerId" VARCHAR(255) NOT NULL,
    "detailDescription" TEXT,
    "features" VARCHAR(255)[],
    "city" VARCHAR(100) NOT NULL,
    "state" VARCHAR(100) NOT NULL,
    "country" VARCHAR(100) NOT NULL,
    "zip" VARCHAR(20) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "mapLocationLink" TEXT NOT NULL,
    "cancellationPolicy" VARCHAR(255)[],

    CONSTRAINT "venues_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "partner_details_userId_key" ON "partner_details"("userId");

-- AddForeignKey
ALTER TABLE "partner_details" ADD CONSTRAINT "partner_details_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
