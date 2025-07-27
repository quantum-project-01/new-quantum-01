/*
  Warnings:

  - The primary key for the `transaction_history` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `transaction_history` table. All the data in the column will be lost.
  - You are about to drop the column `razorpayOrderId` on the `transaction_history` table. All the data in the column will be lost.
  - Added the required column `orderId` to the `transaction_history` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "BookingStatus" ADD VALUE 'failed';

-- AlterEnum
ALTER TYPE "PaymentStatus" ADD VALUE 'failed';

-- AlterTable
ALTER TABLE "transaction_history" DROP CONSTRAINT "transaction_history_pkey",
DROP COLUMN "id",
DROP COLUMN "razorpayOrderId",
ADD COLUMN     "orderId" VARCHAR(255) NOT NULL,
ADD CONSTRAINT "transaction_history_pkey" PRIMARY KEY ("orderId");
