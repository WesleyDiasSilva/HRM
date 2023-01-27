import Joi from 'joi'

export const newJobModel = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string().max(128).required(),
  remote: Joi.boolean().required(),
  value: Joi.number().positive().required(),
})
