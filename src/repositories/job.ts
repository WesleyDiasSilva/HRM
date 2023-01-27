import { prisma } from '@/database/connection'
import { newJob } from '@/protocols'

export async function createJob(newJob: newJob, responsible_id: number) {
  try {
    await prisma.job.create({ data: { ...newJob, responsible_id } })
  } catch {}
}

export async function getAllJobs() {
  try {
    const jobs = await prisma.job.findMany()
    return jobs
  } catch {
    return []
  }
}

export async function getJobById(id: number) {
  try {
    const job = await prisma.job.findFirst({
      where: {
        id,
      },
    })
    return job
  } catch {
    return null
  }
}
