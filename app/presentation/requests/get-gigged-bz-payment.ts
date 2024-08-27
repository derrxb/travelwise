import joi from 'joi';

const getGiggedBzPaymentSchema = joi.object({
  invoiceNo: joi.string().required(),
  paymentKey: joi.string().required(),
});

export default getGiggedBzPaymentSchema;
