import { newEmployee, newJob, updateJobType } from '@/protocols'
import { serviceCreateEmployee, serviceGetAllEmployees, serviceLoginEmployee } from '@/services/employee-services'
import {
  serviceCreateJob,
  serviceDeleteJob,
  serviceGetAllJobs,
  serviceGetJobById,
  serviceGetMyJobs,
  serviceUpdateJob,
} from '@/services/job-service'
import { DataEmployeeToken } from '@/utils/jwt'
import { Request, Response } from 'express'

type BodyLogin = {
  email: string
  password: string
}
export async function loginEmployeeController(req: Request, res: Response): Promise<Response> {
  const { email, password } = req.body as BodyLogin
  try {
    const { status, token, employee } = await serviceLoginEmployee(email as string, password as string)
    if (status) return res.status(200).send({ token, name: employee?.name, role: employee?.role })
    return res.status(400).send('Access denied!')
  } catch {
    return res.status(500).send('Service currently unavailable, please try again later!')
  }
}

export async function createNewJobController(req: Request, res: Response): Promise<Response> {
  try {
    const newJob = req.body as newJob
    const { id } = res.locals.employee as DataEmployeeToken
    await serviceCreateJob(newJob, id)
    return res.status(201).send('Created!')
  } catch (e) {
    return res.status(500).send('Service currently unavailable, please try again later!')
  }
}

export async function getAllJobsController(req: Request, res: Response): Promise<Response> {
  try {
    const jobs = await serviceGetAllJobs()
    return res.status(200).send(jobs)
  } catch {
    return res.status(500).send([])
  }
}

export async function getJobByIdController(req: Request, res: Response): Promise<Response> {
  try {
    const id = parseInt(req.params.id)
    const job = await serviceGetJobById(id)
    if (!job) return res.status(404).send('Not found!')
    return res.status(200).send(job)
  } catch {
    return res.status(500).send('Service currently unavailable, please try again later!')
  }
}

export async function createNewEmployeeController(req: Request, res: Response): Promise<Response> {
  try {
    const newEmployee = req.body as newEmployee
    await serviceCreateEmployee(newEmployee)
    return res.status(201).send('Created!')
  } catch {
    return res.sendStatus(500)
  }
}

export async function getAllEmployeeController(req: Request, res: Response): Promise<Response> {
  try {
    const employees = await serviceGetAllEmployees()
    return res.status(200).send(employees)
  } catch {
    return res.sendStatus(500)
  }
}

export async function getMyJobsController(req: Request, res: Response): Promise<Response> {
  try {
    const employee = res.locals.employee as DataEmployeeToken
    const jobs = await serviceGetMyJobs(employee.id)
    return res.status(200).send(jobs)
  } catch {
    return res.sendStatus(500)
  }
}

export async function deleteJobController(req: Request, res: Response): Promise<Response> {
  try {
    const id = parseInt(req.params.id)
    await serviceDeleteJob(id)
    return res.sendStatus(200)
  } catch {
    return res.sendStatus(500)
  }
}

export async function updateJobController(req: Request, res: Response): Promise<Response> {
  try {
    const id = parseInt(req.params.id)
    const job = req.body as updateJobType
    await serviceUpdateJob(id, job)
    return res.sendStatus(200)
  } catch {
    return res.sendStatus(500)
  }
}
