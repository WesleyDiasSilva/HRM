export type newJob = {
  name: string
  description: string
  remote: boolean
  value: number
}

export type newEmployee = {
  name: string
  email: string
  password: null | string
  role: number
}

export type updateJobType = {
  name: string
  description: string
  remote: boolean
  value: number
  open: boolean
}
