import * as yup from 'yup';

export const introduceSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('Please enter your first name')
    .max(50, 'The field should be less than or equal to 50 symbols ')
    .min(2, 'This field should contain at least 2 symbols')
    .matches(
      /^[а-яA-яa-zA-Z-\s]*$/,
      'Please enter only letters of the alphabet, hyphen (-) and spaces',
    ),
  lastName: yup
    .string()
    .required('Please enter your last name')
    .max(50, 'The field should be less than or equal to 50 symbols ')
    .min(2, 'This field should contain at least 2 symbols')
    .matches(
      /^[а-яA-яa-zA-Z-\s]*$/,
      'Please enter only letters of the alphabet, hyphen (-) and spaces',
    ),
  checkBox: yup.boolean().required().oneOf([true]),
});

export const emailSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please check your email format')
    .required('Please enter your email')
    .max(64, 'This field should be less than or equal to 64 symbols'),
});

export const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/,
      {
        message:
          'The password must have at least eight characters with one uppercase letter, one lower case letter, one number (0-9), one symbol (e.g. !@#$%^&*) and no spaces',
      },
    )
    .max(32, 'This field should be less than or equal to 32 symbols')
    .required('Please enter your password')
    .notOneOf([yup.ref('currentPassword')], `Don't use your old password`),
  confirmPassword: yup
    .string()
    .required(' Please confirm your password')
    .oneOf(
      [yup.ref('password')],
      'The password and confirmation password do not match',
    ),
});

export const mobileSchema = yup.object().shape({
  mobile: yup
    .string()
    .required('Please enter your phone number')
    .matches(/^\+[1-9]{1}[0-9]{3,14}$/, {message: 'Enter correct number'}),
});

export const mobileVerCodeSchema = yup.object().shape({
  code: yup.number().required('Please enter code'),
});

export const logInSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please check your email format')
    .required('Please enter your email')
    .max(64, 'This field should be less than or equal to 64 symbols'),
  password: yup.string().required('Please enter your password'),
});

export const forgotPassSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please check your email format')
    .required('Please enter your email')
    .max(64, 'This field should be less than or equal to 64 symbols'),
});

export const autoBuySchema = yup.object().shape({
  startDate: yup.string().required('Please enter Start Date'),
  endDate: yup
    .string()
    .notOneOf([yup.ref('startDate')], 'Start Date must come before End Date')
    .label('End Date')
    .required('Please enter End Date'),
  frequency: yup.string().required('Please enter Frequency'),
  amount: yup
    .number()
    .required('Please enter amount')
    .min(1, 'Minimum purchase amount is .001 ounces.'),
});

export const priceAlertsSchema = yup.object().shape({
  condition: yup.string().required('Please enter Condition'),
  value: yup
    .number()
    .required('Please enter value')
    .min(0.5, 'At least 0.5%')
    .max(100, 'Only 100%'),
});

export const profileSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('Please enter your first name')
    .max(50, 'The field should be less than or equal to 50 symbols ')
    .min(2, 'This field should contain at least 2 symbols')
    .matches(
      /^[а-яA-яa-zA-Z-\s]*$/,
      'Please enter only letters of the alphabet, hyphen (-) and spaces',
    ),
  lastName: yup
    .string()
    .required('Please enter your last name')
    .max(50, 'The field should be less than or equal to 50 symbols ')
    .min(2, 'This field should contain at least 2 symbols')
    .matches(
      /^[а-яA-яa-zA-Z-\s]*$/,
      'Please enter only letters of the alphabet, hyphen (-) and spaces',
    ),
  legalStreetAdress: yup
    .string()
    .required('Please enter your Legal Adress')
    .max(30, 'The field should be less than or equal to 30 symbols ')
    .min(2, 'This field should contain at least 2 symbols'),
  legalCity: yup
    .string()
    .required('Please enter your Legal City')
    .max(30, 'The field should be less than or equal to 30 symbols ')
    .min(2, 'This field should contain at least 2 symbols'),
  legalState: yup.string().required('Please enter your Legal State'),
  legalCode: yup
    .number()
    .min(5, 'At least 5 numbers')
    .required('Please enter Postal Code'),
  shippingStreetAdress: yup
    .string()
    .required('Please enter your Shipping Adress')
    .max(30, 'The field should be less than or equal to 30 symbols ')
    .min(2, 'This field should contain at least 2 symbols'),
  shippingCity: yup
    .string()
    .required('Please enter your Shipping City')
    .max(30, 'The field should be less than or equal to 30 symbols ')
    .min(2, 'This field should contain at least 2 symbols'),
  shippingState: yup.string().required('Please enter your Shipping State'),
  shippingCode: yup
    .number()
    .min(5, 'At least 5 numbers')
    .required('Please enter Postal Code'),
});

export const verificationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('Please enter your first name')
    .max(50, 'The field should be less than or equal to 50 symbols ')
    .min(2, 'This field should contain at least 2 symbols')
    .matches(
      /^[а-яA-яa-zA-Z-\s]*$/,
      'Please enter only letters of the alphabet, hyphen (-) and spaces',
    ),
  lastName: yup
    .string()
    .required('Please enter your last name')
    .max(50, 'The field should be less than or equal to 50 symbols ')
    .min(2, 'This field should contain at least 2 symbols')
    .matches(
      /^[а-яA-яa-zA-Z-\s]*$/,
      'Please enter only letters of the alphabet, hyphen (-) and spaces',
    ),
  dateOfBirth: yup.string().required('Please enter your Date of Birth'),
  mobile: yup
    .string()
    .required('Please enter your phone number')
    .matches(
      /^[\\(]{0,1}([0-9]){3}[\\)]{0,1}[ ]?([^0-1]){1}([0-9]){2}[ ]?[-]?[ ]?([0-9]){4}[ ]*((x){0,1}([0-9]){1,5}){0,1}$/,
      {
        message: 'Please enter correct number',
      },
    ),
});

export const documentsVerificationSchema = yup.object().shape({
  documentsType: yup.string().required('Please choose Document Type'),
  documents: yup.array().min(1, 'Please select at least one image.'),
});

export const paymentMethodSchema = yup.object().shape({
  paymentMethod: yup.string(),
});

export const cardSchema = yup.object().shape({
  name: yup
    .string()
    .required('Please enter the name on your card')
    .max(100, '“This field should be less than or equal to 100 symbols”')
    .min(2, 'This field should contain at least 2 symbols')
    .matches(
      /^[а-яA-яa-zA-Z-\s]*$/,
      'Please enter only letters of the alphabet, hyphen (-) and spaces',
    ),
  cardNumber: yup
    .string()
    .required('Please enter your card number')
    .label('Card Number')
    .max(19)
    .matches(/[0-9] /, 'Please enter a valid card number'),
  firstName: yup
    .string()
    .required('Please enter your first name')
    .max(50, 'The field should be less than or equal to 50 symbols ')
    .min(2, 'This field should contain at least 2 symbols')
    .matches(
      /^[а-яA-яa-zA-Z-\s]*$/,
      'Please enter only letters of the alphabet, hyphen (-) and spaces',
    ),
  lastName: yup
    .string()
    .required('Please enter your last name')
    .max(50, 'The field should be less than or equal to 50 symbols ')
    .min(2, 'This field should contain at least 2 symbols')
    .matches(
      /^[а-яA-яa-zA-Z-\s]*$/,
      'Please enter only letters of the alphabet, hyphen (-) and spaces',
    ),
  expirationDate: yup.string().required('Please enter your Date'),
  csc: yup
    .string()
    .required('Please enter your CSC')
    .matches(/^[0-9]+$/, 'Please enter a valid CSC')
    .min(3, 'The field should contain at least 3 symbols')
    .max(4, 'The field should be less than or equal to 4 symbols '),

  address: yup
    .string()
    .required('Please enter your street address')
    .min(2, 'This field should contain at least 2 symbols'),
  city: yup
    .string()
    .required('Please enter your city')
    .max(50, 'The field should be less than or equal to 50 symbols ')
    .min(2, 'This field should contain at least 2 symbols'),
  state: yup.string().required('Please enter your state'),
  postalCode: yup
    .string()
    .matches(/[0-9]{5}/, 'Please enter a valid postal code')
    .required('Please enter your postal code'),
  phone: yup
    .string()
    .required('Please enter your phone number')
    .matches(
      /^[\\(]{0,1}([0-9]){3}[\\)]{0,1}[ ]?([^0-1]){1}([0-9]){2}[ ]?[-]?[ ]?([0-9]){4}[ ]*((x){0,1}([0-9]){1,5}){0,1}$/,
      {
        message: 'Please check your mobile number format',
      },
    ),
});

export const bankSchema = yup.object().shape({
  name: yup
    .string()
    .required('Please enter your bank name')
    .max(100, 'The field should be less than or equal to 100 symbols ')
    .min(2, 'This field should contain at least 2 symbols'),
  routingNumber: yup
    .string()
    .required('Please enter your routing number')
    .label('Number')
    .matches(/^[0-9]+$/, 'Please enter a valid routing number')
    .min(2, 'This field should contain at least 2 symbols'),
  accountNumber: yup
    .string()
    .required('Please enter your account number')
    .matches(/^[0-9]+$/, 'Please enter a valid account number')
    .min(2, 'This field should contain at least 2 symbols'),
  accountType: yup.string().required('Please enter your account type'),
  accountName: yup
    .string()
    .required('Please enter your exact account name')
    .min(2, 'This field should contain at least 2 symbols')
    .max(100, 'The field should be less than or equal to 100 symbols '),
  address: yup
    .string()
    .required('PPlease enter your street address')
    .min(2, 'This field should contain at least 2 symbols'),
  city: yup
    .string()
    .required('Please enter your city')
    .max(50, 'The field should be less than or equal to 50 symbols ')
    .min(2, 'This field should contain at least 2 symbols'),
  state: yup.string().required('Please enter your state'),
  postalCode: yup
    .string()
    .matches(/[0-9]{5}/, 'Please enter a valid postal code')
    .required('Please enter your postal code'),
});

export const buySchema = yup.object().shape({
  amount: yup
    .number()
    .min(0.1, 'Please enter Amount.')
    .required('Please enter Amount.')
    .min(1, 'Minimum purchase amount is .001 ounces'),
  amountOz: yup
    .number()
    .required()
    .min(0.001, 'Minimum purchase amount is .001 ounces'),
  frequency: yup.string().required('Please enter Frequency'),
  paymentMethod: yup.string().required('Please enter Payment Method'),
});

export const sellSchema = yup.object().shape({
  amount: yup
    .number()
    .min(0.1, 'Please enter Amount.')
    .required('Please enter Amount.')
    .min(1, 'Minimum amount is .001 ounces'),
  amountOz: yup.number().required().min(0.001, 'Minimum amount is .001 ounces'),
  paymentMethod: yup.string().required('Please enter Payment Method'),
});

export const reviewBuySchema = yup.object().shape({
  checkBox: yup.boolean().required().oneOf([true]),
});

export const fundWithdrawSchema = yup.object().shape({
  amount: yup
    .number()
    .required('Please enter Amount.')
    .min(100, 'Minimum amount is $100.00')
    .max(500000, 'Maximum amount is $500,000.00'),
  paymentMethod: yup.string().required('Please enter Payment Method'),
});
