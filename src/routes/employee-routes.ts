import { loginEmployeeController } from '@/controllers/employee-controllers'
import { validate } from '@/middlewares/validation'
import { loginEmployeeModel } from '@/models/employee-schemas'
import { Router } from 'express'

const EmployeeRoutes = Router()

EmployeeRoutes.post('/login-employee', validate(loginEmployeeModel), loginEmployeeController)
  .all('/*')
  .post('/job')
  .get('/job')
  .get('/job/:id')
  .get('/my-jobs')
  .put('/job/:id')
  .delete('/job/:id')

export default EmployeeRoutes
