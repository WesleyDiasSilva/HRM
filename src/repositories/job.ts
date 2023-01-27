import { prisma } from '@/database/connection'
import { newJob, updateJobType } from '@/protocols'

export async function createJob(newJob: newJob, responsible_id: number) {
  await prisma.job.create({ data: { ...newJob, responsible_id } })
}

export async function getAllJobs() {
  const jobs = await prisma.job.findMany({
    include: { applicants: { select: { applicant: true } }, responsible: { select: { name: true, email: true } } },
  })
  return jobs
}

export async function getJobById(id: number) {
  const job = await prisma.job.findFirst({
    where: {
      id,
    },
    include: {
      responsible: { select: { name: true } },
    },
  })
  return job
}

export async function getMyJobs(id: number) {
  const jobs = await prisma.job.findMany({
    where: {
      responsible_id: id,
    },
    include: {
      applicants: {
        select: { applicant: { select: { name: true, experiences: true, age: true, email: true } } },
      },
    },
  })
  return jobs
}

export async function deleteJob(id: number) {
  await prisma.job.delete({ where: { id } })
}

export async function updateJob(id: number, job: updateJobType) {
  await prisma.job.update({ where: { id }, data: job })
}
