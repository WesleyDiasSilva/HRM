import {
  createNewEmployeeController,
  createNewJobController,
  deleteJobController,
  getAllEmployeeController,
  getAllJobsController,
  getJobByIdController,
  getMyJobsController,
  loginEmployeeController,
  updateJobController,
} from '@/controllers/employee-controllers'
import {
  authenticationEmployee,
  authenticationEmployeeAdmin,
  authenticationEmployeeRole,
} from '@/middlewares/authentication'
import { validate } from '@/middlewares/validation'
import { loginEmployeeModel, newEmployeeModel } from '@/models/employee-schemas'
import { newJobModel, updateJobModel } from '@/models/jobs-schema'
import { Router } from 'express'

const EmployeeRoutes = Router()

EmployeeRoutes.post('/employee/login', validate(loginEmployeeModel), loginEmployeeController)
  .use(authenticationEmployee)
  .get('/employee/job', getAllJobsController)
  .get('/employee/job/:id', getJobByIdController)
  .use(authenticationEmployeeRole)
  .post('/employee/job', validate(newJobModel), createNewJobController)
  .get('/employee/my-jobs', getMyJobsController)
  .put('/employee/job/:id', validate(updateJobModel), updateJobController)
  .delete('/employee/job/:id', deleteJobController)
  .use(authenticationEmployeeAdmin)
  .post('/employee/create', validate(newEmployeeModel), createNewEmployeeController)
  .get('/employee', getAllEmployeeController)

export default EmployeeRoutes
