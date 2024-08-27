import joi from 'joi';

const getOrderablePaymentLinkSchema = joi.object({
  paymentLink: joi.string().required(),
});

export default getOrderablePaymentLinkSchema;
