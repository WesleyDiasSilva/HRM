import { findSession } from '@/repositories/sessions-employee'
import { validateTokenEmployee } from '@/utils/jwt'
import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

export async function authenticationEmployee(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(httpStatus.UNAUTHORIZED).send('Unautorized')
  const token = authHeader.split(' ')[1]
  if (!token) return res.status(httpStatus.UNAUTHORIZED).send('Unautorized')
  try {
    const employee = validateTokenEmployee(token)
    if (!employee) return res.status(httpStatus.UNAUTHORIZED).send('Unautorized')
    const session = await findSession(employee.id)
    if (session && session.token.split(' ')[1] === token) {
      res.locals.employee = employee
      next()
    } else {
      return res.status(httpStatus.UNAUTHORIZED).send('Unautorized')
    }
  } catch {
    return res.status(httpStatus.NOT_FOUND).send('Unautorized')
  }
}

export function authenticationEmployeeRole(req: Request, res: Response, next: NextFunction) {
  const role: number = res.locals.employee.role
  if (role < 2) return res.status(httpStatus.UNAUTHORIZED).send('Unautorized')
  next()
}

export function authenticationEmployeeAdmin(req: Request, res: Response, next: NextFunction) {
  const role: number = res.locals.employee.role
  if (role < 3) return res.status(httpStatus.UNAUTHORIZED).send('Unautorized')
  next()
}
