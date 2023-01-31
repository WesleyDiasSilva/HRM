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
const port = process.env.PORT ?? 5000

server.listen(port, () => {
  console.log(`Server is running in port: ${port}`)
})

export default server;
