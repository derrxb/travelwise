import joi from 'joi';
import cardValidator from 'card-validator';

export const makeOneLinkPaymentSchema = joi.object({
  invoiceno: joi.string().required(),
  paymentKey: joi.string().required(),
  email: joi.string().email().required(),
  cardholderName: joi.string().required(),
  cardNumber: joi
    .string()
    .custom((value, helpers) => {
      const cardNumberValidation = cardValidator.number(value);
      if (!cardNumberValidation.isValid) {
        return helpers.error('any.invalid');
      }
      return value;
    }, 'Card Number Validation')
    .required(),
  expiryDate: joi
    .string()
    .custom((value, helpers) => {
      const expirationDateValidation = cardValidator.expirationDate(value);
      if (!expirationDateValidation.isValid) {
        return helpers.error('any.invalid');
      }
      return value;
    }, 'Expiration Date Validation')
    .required(),
  cvc: joi
    .string()
    .custom((value, helpers) => {
      const cvvValidation = cardValidator.cvv(value);
      if (!cvvValidation.isValid) {
        return helpers.error('any.invalid');
      }
      return value;
    }, 'CVV Validation')
    .required(),
});
