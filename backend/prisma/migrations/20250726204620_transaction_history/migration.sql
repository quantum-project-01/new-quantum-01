-- CreateTable
CREATE TABLE "transaction_history" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "paymentAmount" DECIMAL(10,2) NOT NULL,
    "paymentCurrency" VARCHAR(3) NOT NULL,
    "paymentMethod" VARCHAR(50) NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL,
    "isRefunded" BOOLEAN NOT NULL DEFAULT false,
    "refundDate" TIMESTAMP(3),
    "captured" BOOLEAN,
    "capturedAt" TIMESTAMP(3),
    "razorpayOrderId" VARCHAR(255),
    "razorpayPaymentId" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transaction_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "transaction_history_bookingId_key" ON "transaction_history"("bookingId");

-- AddForeignKey
ALTER TABLE "transaction_history" ADD CONSTRAINT "transaction_history_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "bookings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
