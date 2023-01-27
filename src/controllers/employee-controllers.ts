import { newJob } from '@/protocols'
import { serviceLoginEmployee } from '@/services/employee-services'
import { serviceCreateJob } from '@/services/job-service'
import { DataEmployeeToken } from '@/utils/jwt'
import { Request, Response } from 'express'

type BodyLogin = {
  email: string
  password: string
}
export async function loginEmployeeController(req: Request, res: Response) {
  const { email, password } = req.body as BodyLogin
  try {
    const { status, token, employee } = await serviceLoginEmployee(email as string, password as string)
    console.log(token)
    if (status) return res.status(200).send({ token, name: employee?.name, role: employee?.role })
    return res.status(400).send('Access denied!')
  } catch {
    return res.status(500).send('Service currently unavailable, please try again later!')
  }
}

export async function createNewJobController(req: Request, res: Response) {
  try {
    const newJob = req.body as newJob
    const { id } = res.locals.employee as DataEmployeeToken
    await serviceCreateJob(newJob, id)
    return res.status(201).send('Created!')
  } catch (e){
    console.log(e)
    return res.status(500).send('Service currently unavailable, please try again later!')
  }
}
