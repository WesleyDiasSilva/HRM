import { conflictError } from '@/errors/conflict-error'
import { invalidCredentialsError } from '@/errors/invalidCredentials-error'
import { unauthorizedError } from '@/errors/unauthorized-error'
import { newEmployee } from '@/protocols'
import { createEmployee, findEmployee, getAllEmployees } from '@/repositories/employee'
import { upsertSession } from '@/repositories/sessions-employee'
import { decryptHash, encryptPassword } from '@/utils/bcrypt'
import { createTokenEmployee } from '@/utils/jwt'

export async function serviceLoginEmployee(email: string, hash: string) {
  const foundEmployee = await findEmployee(email)
  if (!foundEmployee) throw unauthorizedError()

  const passwordCorrect = decryptHash(hash, foundEmployee.password)
  if (!passwordCorrect) throw invalidCredentialsError()

  const tokenJwt = createTokenEmployee({ id: foundEmployee.id, name: foundEmployee.name, role: foundEmployee.role })
  await upsertSession(foundEmployee.id, tokenJwt)
  return { token: tokenJwt, employee: foundEmployee }
}

export async function serviceCreateEmployee(newEmployee: newEmployee) {
  const employeeExists = await findEmployee(newEmployee.email)
  if (employeeExists) throw conflictError('E-mail already registered!')

  const hash = encryptPassword(newEmployee.email)
  newEmployee.password = hash
  await createEmployee(newEmployee)
}

export async function serviceGetAllEmployees() {
  const employees = await getAllEmployees()
  return employees
}
