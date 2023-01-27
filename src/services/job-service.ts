import { newJob, updateJobType } from '@/protocols'
import { createJob, deleteJob, getAllJobs, getJobById, getMyJobs, updateJob } from '@/repositories/job'

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

export async function serviceGetMyJobs(id: number) {
  try {
    const jobs = await getMyJobs(id)
    return jobs
  } catch {
    return []
  }
}

export async function serviceDeleteJob(id: number) {
  try {
    await deleteJob(id)
    return null
  } catch {
    return null
  }
}

export async function serviceUpdateJob(id: number, job: updateJobType){
  try{
    await updateJob(id, job)
    return null
  }catch{
    return null
  }
}
