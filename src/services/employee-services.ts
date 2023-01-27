import { findEmployee } from '@/repositories/employee'
import { upsertSession } from '@/repositories/sessions-employee'
import { decryptHash } from '@/utils/bcrypt'
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
