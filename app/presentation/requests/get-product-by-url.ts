import joi from 'joi';

const getProductByUrlSchema = joi.object({
  url: joi.string().required(),
});

export default getProductByUrlSchema;
