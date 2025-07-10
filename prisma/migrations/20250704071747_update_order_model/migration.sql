/*
  Warnings:

  - You are about to drop the column `method` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `paymentNumber` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "method",
DROP COLUMN "paymentNumber";
