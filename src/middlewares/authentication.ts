import { findSession } from '@/repositories/sessions-employee'
import { validateTokenEmployee } from '@/utils/jwt'
import { NextFunction, Request, Response } from 'express'

export async function authenticationEmployee(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).send('Unautorized')
  const token = authHeader.split(' ')[1]
  if (!token) return res.status(401).send('Unautorized')
  try {
    const employee = validateTokenEmployee(token)
    if (!employee) return res.status(401).send('Unautorized')
    const session = await findSession(employee.id)
    if (session && session.token === token) {
      res.locals.employee = employee
      next()
    } else {
      return res.status(401).send('Unautorized')
    }
  } catch {
    return res.status(401).send('Unautorized')
  }
}

export function authenticationEmployeeRole(req: Request, res: Response, next: NextFunction) {
  const role: number = req.body.employee
  if (role < 1) return res.status(401).send('Unautorized')
  next()
}
