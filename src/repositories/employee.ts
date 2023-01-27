import { prisma } from '@/database/connection'

export async function findEmployee(email: string) {
  try {
    const employee = await prisma.employee.findFirst({ where: { email } })
    return employee
  } catch {
    return null
  }
}

