import { NextFunction, Request, Response } from 'express'
import { ObjectSchema } from 'joi'

export function validate(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    const { error } = schema.validate(req.body, {
      abortEarly: false,
    })

    if (!error) {
      next()
    } else {
      res.status(400).send(error.details)
    }
  }
}
