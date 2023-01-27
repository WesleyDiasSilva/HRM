import { prisma } from '@/database/connection'
import { newEmployee } from '@/protocols'

export async function findEmployee(email: string) {
  try {
    const employee = await prisma.employee.findFirst({ where: { email } })
    return employee
  } catch {
    return null
  }
}

export async function createEmployee(employee: newEmployee) {
  try {
    await prisma.employee.create({
      data: {
        email: employee.email,
        name: employee.name,
        role: employee.role,
        password: employee.password as string,
      },
    })
    return true
  } catch {
    return false
  }
}

export async function getAllEmployees() {
  try {
    const employees = await prisma.employee.findMany()
    return employees
  } catch {
    return []
  }
}
