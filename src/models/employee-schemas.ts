import Joi from 'joi'

export const loginEmployeeModel = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
})

export const newEmployeeModel = Joi.object({
  email: Joi.string().required().email(),
  name: Joi.string().min(3).required(),
  role: Joi.number().positive().required()
}) 
