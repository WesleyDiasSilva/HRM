/*
  Warnings:

  - You are about to drop the `Applicant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ApplicantsOnJobs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Employee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Job` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SessionApplicant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SessionEmployee` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ApplicantsOnJobs" DROP CONSTRAINT "ApplicantsOnJobs_applicant_id_fkey";

-- DropForeignKey
ALTER TABLE "ApplicantsOnJobs" DROP CONSTRAINT "ApplicantsOnJobs_job_id_fkey";

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_responsible_id_fkey";

-- DropForeignKey
ALTER TABLE "SessionApplicant" DROP CONSTRAINT "SessionApplicant_applicant_id_fkey";

-- DropForeignKey
ALTER TABLE "SessionEmployee" DROP CONSTRAINT "SessionEmployee_employee_id_fkey";

-- DropTable
DROP TABLE "Applicant";

-- DropTable
DROP TABLE "ApplicantsOnJobs";

-- DropTable
DROP TABLE "Employee";

-- DropTable
DROP TABLE "Job";

-- DropTable
DROP TABLE "SessionApplicant";

-- DropTable
DROP TABLE "SessionEmployee";

-- CreateTable
CREATE TABLE "employees" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" INTEGER NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions_employee" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sessions_employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jobs" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "remote" BOOLEAN NOT NULL,
    "value" INTEGER NOT NULL,
    "responsible_id" INTEGER NOT NULL,
    "open" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "applicantId" INTEGER,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "applicants" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "experiences" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "jobId" INTEGER,

    CONSTRAINT "applicants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions_applicants" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "applicant_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sessions_applicants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "applicants_jobs" (
    "id" SERIAL NOT NULL,
    "job_id" INTEGER NOT NULL,
    "applicant_id" INTEGER NOT NULL,

    CONSTRAINT "applicants_jobs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employees_email_key" ON "employees"("email");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_employee_token_key" ON "sessions_employee"("token");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_employee_employee_id_key" ON "sessions_employee"("employee_id");

-- CreateIndex
CREATE UNIQUE INDEX "applicants_email_key" ON "applicants"("email");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_applicants_token_key" ON "sessions_applicants"("token");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_applicants_applicant_id_key" ON "sessions_applicants"("applicant_id");

-- AddForeignKey
ALTER TABLE "sessions_employee" ADD CONSTRAINT "sessions_employee_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_responsible_id_fkey" FOREIGN KEY ("responsible_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions_applicants" ADD CONSTRAINT "sessions_applicants_applicant_id_fkey" FOREIGN KEY ("applicant_id") REFERENCES "applicants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applicants_jobs" ADD CONSTRAINT "applicants_jobs_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applicants_jobs" ADD CONSTRAINT "applicants_jobs_applicant_id_fkey" FOREIGN KEY ("applicant_id") REFERENCES "applicants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
