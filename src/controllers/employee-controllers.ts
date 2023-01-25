import { serviceLoginEmployee } from '@/services/employee-services'
import { Request, Response } from 'express'

export async function loginEmployeeController(req: Request, res: Response) {
  const { email, password } = req.body
  try {
    const { status, token, employee } = await serviceLoginEmployee(email, password)
    if (status) return res.status(200).send({ token, name: employee?.name, role: employee?.role })
    return res.status(400).send('Access denied!')
  } catch {
    return res.status(500).send('Service currently unavailable, please try again later!')
  }
}

export async function createNewEmployeeController(req: Request, res: Response) {
  try {
  } catch {}
}
