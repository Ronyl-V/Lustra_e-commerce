-- DropIndex
DROP INDEX "Order_transactionId_key";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "transactionId" SET DEFAULT 'UNKNOWN';

-- CreateTable
CREATE TABLE "Deal" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "images" TEXT[],
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Deal_pkey" PRIMARY KEY ("id")
);
