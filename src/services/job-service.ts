import { newJob } from '@/protocols'
import { createJob } from '@/repositories/job'

export async function serviceCreateJob(newJob: newJob, responsible_id: number) {
  try {
    await createJob(newJob, responsible_id)
  } catch {}
}
