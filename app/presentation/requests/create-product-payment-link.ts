import joi from 'joi';

const createProductPaymentLinkSchema = joi.object({
  productId: joi.string().required(),
});

export default createProductPaymentLinkSchema;
