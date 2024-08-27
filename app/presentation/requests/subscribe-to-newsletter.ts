import joi from 'joi';

const subscribeToNewsletterSchema = joi.object({
  firstName: joi.string().required(),
  email: joi.string().required(),
});

export default subscribeToNewsletterSchema;
