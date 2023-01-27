import { newJob } from '@/protocols'
import { createJob, getAllJobs, getJobById } from '@/repositories/job'

export async function serviceCreateJob(newJob: newJob, responsible_id: number) {
  try {
    await createJob(newJob, responsible_id)
    return true
  } catch {
    return false
  }
}

export async function serviceGetAllJobs() {
  try {
    const jobs = await getAllJobs()
    return jobs
  } catch {
    return []
  }
}

export async function serviceGetJobById(id: number) {
  try {
    const job = await getJobById(id)
    return job
  } catch {
    return null
  }
}
