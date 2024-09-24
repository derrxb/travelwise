/*
  Warnings:

  - You are about to drop the column `travelAppSatisfaction` on the `UserProfile` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "TravelAppSatisfaction" AS ENUM ('YES', 'NO', 'UNDECIDED');

-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "travelAppSatisfaction",
ADD COLUMN     "appSatisfaction" "TravelAppSatisfaction";
