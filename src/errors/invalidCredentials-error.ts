import { ApplicationError } from '@/protocols'

export function invalidCredentialsError(): ApplicationError {
  return {
    name: 'invalidCredentials',
    message: 'Incorrect e-mail or password!',
  }
}
