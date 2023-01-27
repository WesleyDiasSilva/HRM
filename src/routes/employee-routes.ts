import { createNewJobController, loginEmployeeController } from '@/controllers/employee-controllers'
import { authenticationEmployee, authenticationEmployeeRole } from '@/middlewares/authentication'
import { validate } from '@/middlewares/validation'
import { loginEmployeeModel } from '@/models/employee-schemas'
import { newJobModel } from '@/models/jobs-schema'
import { Router } from 'express'

const EmployeeRoutes = Router()

EmployeeRoutes.post('/employee/login', validate(loginEmployeeModel), loginEmployeeController)
  .use(authenticationEmployee)
  .get('/employee/job')
  .get('/employee/job/:id')
  .use(authenticationEmployeeRole)
  .post('/employee/job', validate(newJobModel), createNewJobController)
  .get('/employee/my-jobs')
  .put('/employee/job/:id')
  .delete('/employee/job/:id')

export default EmployeeRoutes
