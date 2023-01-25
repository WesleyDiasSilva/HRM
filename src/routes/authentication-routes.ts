import { Router } from "express";

const EmployeeRoutes = Router();

EmployeeRoutes
  .post('/login')
  .all('/*')
  .post('/job')
  .get('/job')
  .get('/job/:id')
  .get('/my-jobs')
  .put('/job/:id')
  .delete('/job/:id')

export default EmployeeRoutes;
