import bcrypt from 'bcrypt'

export function encryptPassword(password: string) {
  const hash = bcrypt.hashSync(password, 10)
  return hash
}

export function decryptHash(hash: string, password: string) {
  try {
    const result = bcrypt.compareSync(password, hash)
    return result
  } catch {
    return false
  }
}
