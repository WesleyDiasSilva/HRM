import jwt from 'jsonwebtoken'

export type DataEmployeeToken = {
  name: string
  id: number
  role: number
}

const config = {
  secret: process.env.SECRET_JWT,
  expires: { expiresIn: 60 * 24 * 30 },
}

export function createTokenEmployee(data: DataEmployeeToken) {
  const token = jwt.sign(data, config.secret ?? '', config.expires)
  return token
}

export function validateTokenEmployee(token: string) {
  try {
    const tokenValidated = jwt.verify(token, config.secret ?? '') as DataEmployeeToken
    return tokenValidated
  } catch {
    return null
  }
}
