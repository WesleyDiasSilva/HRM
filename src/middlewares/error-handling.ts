import { ApplicationError } from '@/protocols'
import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

export function errorHandling(error: ApplicationError | Error, req: Request, res: Response, next: NextFunction) {
  const { name, message } = error
  switch (true) {
    case name === 'UnauthorizedError':
      return res.status(httpStatus.UNAUTHORIZED).send({ message })

    case name === 'invalidCredentials':
      return res.status(httpStatus.UNAUTHORIZED).send({ message })

    case name === 'NotFoundError':
      return res.status(httpStatus.NOT_FOUND).send({ message })

    case name === 'ConflictsError':
      return res.status(httpStatus.CONFLICT).send({ message })
  }

  return res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Internal Server Error')
}
