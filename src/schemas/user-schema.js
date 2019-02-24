import Joi from 'joi';


let UsernameSchema = Joi.object().keys({
  username: Joi.string().alphanum().min(4).max(20).required()
});

let EmailSchema = Joi.object().keys({
  email: Joi.string().required()
});

let PhoneSchema = Joi.object().keys({
  phone: Joi.string().required()
});

let UserSchema = Joi.object().keys({
  username: Joi.string().alphanum().min(4).max(20).required(),
  password: Joi.string().alphanum().min(4).max(20).required(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(), // TODO: Must be completed
  image: Joi.string().allow('').optional(), // TODO: Must be completed
});


let CodeSchema = Joi.object().keys({
  smsCode: Joi.number().integer().min(1000).max(9999).required()
});

export {UsernameSchema, EmailSchema, PhoneSchema, UserSchema, CodeSchema};
