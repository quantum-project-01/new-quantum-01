/*
  Warnings:

  - You are about to drop the column `city` on the `venues` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `venues` table. All the data in the column will be lost.
  - You are about to drop the column `createdOn` on the `venues` table. All the data in the column will be lost.
  - You are about to drop the column `detailDescription` on the `venues` table. All the data in the column will be lost.
  - You are about to drop the column `main` on the `venues` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `venues` table. All the data in the column will be lost.
  - You are about to drop the column `updatedOn` on the `venues` table. All the data in the column will be lost.
  - You are about to drop the column `zip` on the `venues` table. All the data in the column will be lost.
  - The `cancellationPolicy` column on the `venues` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `updatedAt` to the `venues` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `location` on the `venues` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "venues" DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "createdOn",
DROP COLUMN "detailDescription",
DROP COLUMN "main",
DROP COLUMN "state",
DROP COLUMN "updatedOn",
DROP COLUMN "zip",
ADD COLUMN     "approved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "details" JSONB,
ADD COLUMN     "images" VARCHAR(500)[],
ADD COLUMN     "totalReviews" INTEGER DEFAULT 0,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "location",
ADD COLUMN     "location" JSONB NOT NULL,
ALTER COLUMN "highlight" DROP NOT NULL,
ALTER COLUMN "mapLocationLink" DROP NOT NULL,
DROP COLUMN "cancellationPolicy",
ADD COLUMN     "cancellationPolicy" JSONB;
