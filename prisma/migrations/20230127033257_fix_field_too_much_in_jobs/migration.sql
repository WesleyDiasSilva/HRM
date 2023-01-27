/*
  Warnings:

  - You are about to drop the column `jobId` on the `applicants` table. All the data in the column will be lost.
  - You are about to drop the column `applicantId` on the `jobs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "applicants" DROP COLUMN "jobId";

-- AlterTable
ALTER TABLE "jobs" DROP COLUMN "applicantId";
