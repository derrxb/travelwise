/*
  Warnings:

  - You are about to drop the column `aiFeautes` on the `UserProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "aiFeautes",
ADD COLUMN     "aiFeatures" JSONB;
