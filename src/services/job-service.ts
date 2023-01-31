import { badRequestError } from '@/errors/badRequest-error'
import { notFoundError } from '@/errors/notFound-error'
import { newJob, updateJobType } from '@/protocols'
import { createJob, deleteJob, getAllJobs, getJobById, getMyJobs, updateJob } from '@/repositories/job'

export async function serviceCreateJob(newJob: newJob, responsible_id: number) {
  await createJob(newJob, responsible_id)
}

export async function serviceGetAllJobs() {
  const jobs = await getAllJobs()
  return jobs
}

export async function serviceGetJobById(id: number) {
  if(isNaN(id)) throw badRequestError("id invalid!")
  const job = await getJobById(id)
  if (!job) throw notFoundError()
  return job
}

export async function serviceGetMyJobs(id: number) {
  const jobs = await getMyJobs(id)
  return jobs
}

export async function serviceDeleteJob(id: number) {
  await deleteJob(id)
}

export async function serviceUpdateJob(id: number, job: updateJobType) {
  await updateJob(id, job)
}
