import { prisma } from '@/database/connection'

export async function upsertSession(employee_id: number, token: string) {
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
}

export async function findSession(id: number) {
  const session = await prisma.sessionEmployee.findFirst({ where: { employee_id: id } })
  return session
}
