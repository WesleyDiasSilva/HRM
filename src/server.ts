import EmployeeRoutes from '@/routes/authentication-routes'
import cors from 'cors'
import express from 'express'

const server = express()

server
  .use(express.json())
  .use(cors())
  .use(EmployeeRoutes)

const port = process.env.PORT ?? 5000

server.listen(() => {
  console.log(`Server is running in port: ${port}`)
})
