import { prisma } from '@/database/connection'
import { newEmployee } from '@/protocols'

export async function findEmployee(email: string) {
  const employee = await prisma.employee.findFirst({ where: { email } })
  return employee
}

export async function createEmployee(employee: newEmployee) {
  await prisma.employee.create({
    data: {
      email: employee.email,
      name: employee.name,
      role: employee.role,
      password: employee.password as string,
    },
  })
}

export async function getAllEmployees() {
  const employees = await prisma.employee.findMany()
  return employees
}
