import 'express-async-errors'
import express from 'express'
import EmployeeRoutes from '../src/routes/employee-routes'
import cors from 'cors'
import { errorHandling } from './middlewares/error-handling'
import { loadEnvs } from './config/envs'

loadEnvs();

const server = express()

server
  .use(express.json())
  .use(cors())
  .use(EmployeeRoutes)
  .use(errorHandling)

export default server;
