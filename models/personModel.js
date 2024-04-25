// models/personModel.js
const Joi = require("joi");
const uuid = require("uuid");

const personSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().integer().min(0).max(130).required(),
  hobbies: Joi.array().items(Joi.string()).required(),
});

const validatePerson = (person) => {
  const { error } = personSchema.validate(person);
  if (error) {
    return { error: error.details[0].message };
  }
  return { valid: true };
};

const createPerson = (name, age, hobbies) => {
  return {
    id: uuid.v4(),
    name: name,
    age: age,
    hobbies: hobbies,
  };
};

module.exports = {
  validatePerson,
  createPerson,
  personSchema,
};
