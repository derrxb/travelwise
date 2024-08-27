import joi from 'joi';

const createProductSchema = joi.object({
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
  // coverImage: joi.string().optional(),
  // thumbnailImage: joi.string().optional(),
  publicUrl: joi.string().required(),
});

export default createProductSchema;
