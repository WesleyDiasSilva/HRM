import { prisma } from '@/database/connection'

export async function upsertSession(employee_id: number, token: string) {
  try {
    await prisma.sessionEmployee.upsert({
      where: {
        employee_id,
      },
      create: {
        employee_id,
        token,
      },
      update: {
        token,
      },
    })
    return true
  } catch {
    return false
  }
}

export async function findSession(id: number) {
  try {
    const session = await prisma.sessionEmployee.findFirst({ where: { employee_id: id } })
    return session
  } catch {
    return null
  }
}
