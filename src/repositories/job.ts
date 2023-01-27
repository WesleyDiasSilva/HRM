import { prisma } from '@/database/connection'
import { newJob } from '@/protocols'

export async function createJob(newJob: newJob, responsible_id: number) {
  try {
    await prisma.job.create({ data: { ...newJob, responsible_id } })
  } catch {}
}

export async function getAllJobs() {
  try {
    const jobs = await prisma.job.findMany({
      include: { applicants: { select: { applicant: true } }, responsible: { select: { name: true, email: true } } },
    })
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
      include: {
        responsible: { select: { name: true } },
      },
    })
    return job
  } catch {
    return null
  }
}

export async function getMyJobs(id: number){
  try{
    const jobs = await prisma.job.findMany({
      where: {
        responsible_id: id
      }, 
      include: {
        applicants: {
          select: {applicant: {select: {name: true, experiences: true, age: true, email: true}}}
        }
      }
    })
    return jobs;
  }catch{
    return []
  }
}
