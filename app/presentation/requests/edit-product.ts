import joi from 'joi';

const editProductSchema = joi.object({
  name: joi.string().required(),
  description: joi.string().required(),
  price: joi
    .number()
    .integer()
    .required()
    // @ts-ignore
    .error((errors) => {
      const newErrors = errors.map((error) => {
        error.message = 'Price must be a cent value';
        return error;
      });
      return newErrors;
    }),
  currency: joi
    .string()
    .required()
    // @ts-ignore
    .error((errors) => {
      const newErrors = errors.map((error) => {
        error.message = 'Currency should either be USD or BZD';
        return error;
      });
      return newErrors;
    }),
  publicUrl: joi.string().required(),
  published: joi.allow('draft', 'published').required(),
});

export default editProductSchema;
