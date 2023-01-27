import { newEmployee } from '@/protocols'
import { createEmployee, findEmployee, getAllEmployees } from '@/repositories/employee'
import { upsertSession } from '@/repositories/sessions-employee'
import { decryptHash, encryptPassword } from '@/utils/bcrypt'
import { createTokenEmployee } from '@/utils/jwt'

export async function serviceLoginEmployee(email: string, hash: string) {
  try {
    const foundEmployee = await findEmployee(email)
    if (!foundEmployee) return { status: false, token: '', employee: foundEmployee }

    const passwordCorrect = decryptHash(hash, foundEmployee.password)
    if (!passwordCorrect) return { status: false, token: '', employee: foundEmployee }

    const tokenJwt = createTokenEmployee({ id: foundEmployee.id, name: foundEmployee.name, role: foundEmployee.role })
    const status = await upsertSession(foundEmployee.id, tokenJwt)

    if (!status) return { status: false, token: '', employee: foundEmployee }
    return { status: true, token: tokenJwt, employee: foundEmployee }
  } catch (e) {
    return { status: false, token: '', employee: null }
  }
}

export async function serviceCreateEmployee(newEmployee: newEmployee) {
  try {
    const employeeExists = await findEmployee(newEmployee.email)
    if (employeeExists) return false
    const hash = encryptPassword(newEmployee.email)
    newEmployee.password = hash
    await createEmployee(newEmployee)
    return true
  } catch {
    return false
  }
}

export async function serviceGetAllEmployees() {
  try {
    const employees = await getAllEmployees()
    return employees
  } catch {
    return []
  }
}
