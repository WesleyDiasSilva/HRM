import { prisma } from '@/database/connection'
import { newJob } from '@/protocols'

export async function createJob(newJob: newJob, responsible_id: number) {
  try {
    await prisma.job.create({ data: { ...newJob, responsible_id } })
  } catch {}
}
