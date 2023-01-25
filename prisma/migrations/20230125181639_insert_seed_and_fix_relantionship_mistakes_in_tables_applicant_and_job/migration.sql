/*
  Warnings:

  - You are about to drop the `sessionApplicant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "sessionApplicant" DROP CONSTRAINT "sessionApplicant_applicant_id_fkey";

-- AlterTable
ALTER TABLE "Applicant" ADD COLUMN     "jobId" INTEGER;

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "applicantId" INTEGER;

-- DropTable
DROP TABLE "sessionApplicant";

-- CreateTable
CREATE TABLE "SessionApplicant" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "applicant_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SessionApplicant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicantsOnJobs" (
    "id" SERIAL NOT NULL,
    "job_id" INTEGER NOT NULL,
    "applicant_id" INTEGER NOT NULL,

    CONSTRAINT "ApplicantsOnJobs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SessionApplicant_token_key" ON "SessionApplicant"("token");

-- CreateIndex
CREATE UNIQUE INDEX "SessionApplicant_applicant_id_key" ON "SessionApplicant"("applicant_id");

-- AddForeignKey
ALTER TABLE "SessionApplicant" ADD CONSTRAINT "SessionApplicant_applicant_id_fkey" FOREIGN KEY ("applicant_id") REFERENCES "Applicant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicantsOnJobs" ADD CONSTRAINT "ApplicantsOnJobs_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicantsOnJobs" ADD CONSTRAINT "ApplicantsOnJobs_applicant_id_fkey" FOREIGN KEY ("applicant_id") REFERENCES "Applicant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
