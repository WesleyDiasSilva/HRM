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
import httpStatus from 'http-status'

type BodyLogin = {
  email: string
  password: string
}
export async function loginEmployeeController(req: Request, res: Response): Promise<Response> {
  const { email, password } = req.body as BodyLogin
  const { token, employee } = await serviceLoginEmployee(email as string, password as string)
  return res.status(httpStatus.OK).send({ token, name: employee?.name, role: employee?.role })
}

export async function createNewJobController(req: Request, res: Response): Promise<Response> {
  const newJob = req.body as newJob
  const { id } = res.locals.employee as DataEmployeeToken
  await serviceCreateJob(newJob, id)
  return res.status(httpStatus.CREATED).send('Created!')
}

export async function getAllJobsController(req: Request, res: Response): Promise<Response> {
  const jobs = await serviceGetAllJobs()
  return res.status(httpStatus.OK).send(jobs)
}

export async function getJobByIdController(req: Request, res: Response): Promise<Response> {
  const id = parseInt(req.params.id)
  const job = await serviceGetJobById(id)
  return res.status(httpStatus.OK).send(job)
}

export async function createNewEmployeeController(req: Request, res: Response): Promise<Response> {
  const newEmployee = req.body as newEmployee
  await serviceCreateEmployee(newEmployee)
  return res.status(201).send('Created!')
}

export async function getAllEmployeeController(req: Request, res: Response): Promise<Response> {
  const employees = await serviceGetAllEmployees()
  return res.status(httpStatus.OK).send(employees)
}

export async function getMyJobsController(req: Request, res: Response): Promise<Response> {
  const employee = res.locals.employee as DataEmployeeToken
  const jobs = await serviceGetMyJobs(employee.id)
  return res.status(httpStatus.OK).send(jobs)
}

export async function deleteJobController(req: Request, res: Response): Promise<Response> {
  const id = parseInt(req.params.id)
  await serviceDeleteJob(id)
  return res.sendStatus(httpStatus.OK).send('Deleted!')
}

export async function updateJobController(req: Request, res: Response): Promise<Response> {
  const id = parseInt(req.params.id)
  const job = req.body as updateJobType
  await serviceUpdateJob(id, job)
  return res.status(httpStatus.OK).send('Updated!')
}
