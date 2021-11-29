import * as yup from 'yup';

export const introduceSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('Please enter your First Name')
    .max(50, 'The field should be less than or equal to 50 symbols ')
    .min(2, 'This field should contain at least 2 symbols'),
  lastName: yup
    .string()
    .required('Please enter your Last Name')
    .max(50, 'The field should be less than or equal to 50 symbols ')
    .min(2, 'This field should contain at least 2 symbols'),
  checkBox: yup.boolean().required().oneOf([true]),
});

export const emailSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .label('Email adress')
    .required('Please enter your email')
    .max(50, 'The field should be less than or equal to 50 symbols '),
});

export const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
      {message: 'All conditions must be met'},
    )
    .required('Password is required')
    .notOneOf([yup.ref('currentPassword')], `Don't use your old password`),
  confirmPassword: yup
    .string()
    .required('Confirm your password')
    .oneOf([yup.ref('password')], 'Passwords does not match'),
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
    .email()
    .label('Email adress')
    .required('Please enter your email')
    .max(50, 'The field should be less than or equal to 50 symbols '),
  password: yup.string().required('Password is required'),
});

export const forgotPassSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .label('Email adress')
    .required('Please enter your email')
    .max(50, 'The field should be less than or equal to 50 symbols '),
});

export const autoBuySchema = yup.object().shape({
  startDate: yup.string().required('Please enter Start Date'),
  endDate: yup.string().label('End Date').required('Please enter End Date'),
  frequency: yup.string().required('Please enter Frequency'),
  amount: yup.number().required('Please enter amount'),
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
    .required('Please enter your First Name')
    .max(16, 'The field should be less than or equal to 16 symbols ')
    .min(2, 'This field should contain at least 2 symbols'),
  lastName: yup
    .string()
    .required('Please enter your Last Name')
    .max(16, 'The field should be less than or equal to 16 symbols ')
    .min(2, 'This field should contain at least 2 symbols'),
});

export const verificationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('Please enter your First Name')
    .max(16, 'The field should be less than or equal to 16 symbols ')
    .min(2, 'This field should contain at least 2 symbols'),
  lastName: yup
    .string()
    .required('Please enter your Last Name')
    .max(16, 'The field should be less than or equal to 16 symbols ')
    .min(2, 'This field should contain at least 2 symbols'),
  dateOfBirth: yup.string().required('Please enter your Date of Birth'),
  mobile: yup
    .string()
    .required('Please enter your phone number')
    .matches(/^\+[1-9]{1}[0-9]{3,14}$/, {message: 'Enter correct number'}),
  address1: yup
    .string()
    .required('Please enter your Address 1')
    .max(16, 'The field should be less than or equal to 16 symbols ')
    .min(2, 'This field should contain at least 2 symbols'),
  address2: yup
    .string()
    .required('Please enter your Address 2')
    .max(16, 'The field should be less than or equal to 16 symbols ')
    .min(2, 'This field should contain at least 2 symbols'),
  city: yup
    .string()
    .required('Please enter your City')
    .max(16, 'The field should be less than or equal to 16 symbols ')
    .min(2, 'This field should contain at least 2 symbols'),
  state: yup.string().required('Please enter your State'),
  postalCode: yup
    .number()
    .min(5, 'At least 5 numbers')
    .required('Please enter Postal Code'),
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
    .required('Please enter your Name on Card')
    .max(16, 'The field should be less than or equal to 16 symbols ')
    .min(2, 'This field should contain at least 2 symbols'),
  cardNumber: yup
    .string()
    .required('Please enter your Card Number')
    .label('Card Number')
    .max(19)
    .matches(/[0-9] /, 'Please enter correct number'),
  firstName: yup
    .string()
    .required('Please enter your First Name')
    .max(16, 'The field should be less than or equal to 16 symbols ')
    .min(2, 'This field should contain at least 2 symbols'),
  lastName: yup
    .string()
    .required('Please enter your Last Name')
    .max(16, 'The field should be less than or equal to 16 symbols ')
    .min(2, 'This field should contain at least 2 symbols'),
  expirationDate: yup.string().required('Please enter your Date'),
  csc: yup
    .string()
    .label('CSC')
    .required('Please enter your CSC')
    .matches(/[0-9]{3}/, 'Please enter correct CSC'),
  address: yup
    .string()
    .required('Please enter your Address')
    .min(2, 'This field should contain at least 2 symbols'),
  city: yup
    .string()
    .required('Please enter your City')
    .max(16, 'The field should be less than or equal to 16 symbols ')
    .min(2, 'This field should contain at least 2 symbols'),
  state: yup.string().required('Please enter your State'),
  postalCode: yup
    .string()
    .matches(/[0-9]{5}/, 'Please enter correct code')
    .required('Please enter Code'),
  phone: yup
    .string()
    .required('Please enter your phone number')
    .matches(
      /^[\\(]{0,1}([0-9]){3}[\\)]{0,1}[ ]?([^0-1]){1}([0-9]){2}[ ]?[-]?[ ]?([0-9]){4}[ ]*((x){0,1}([0-9]){1,5}){0,1}$/,
      {
        message: 'Enter correct number',
      },
    ),
});

export const bankSchema = yup.object().shape({
  name: yup
    .string()
    .required('Please enter your Name on Card')
    .max(16, 'The field should be less than or equal to 16 symbols ')
    .min(2, 'This field should contain at least 2 symbols'),
  cardNumber: yup
    .string()
    .required('Please enter your Card Number')
    .label('Number')
    .matches(/[0-9]{4}/, 'Please enter correct number'),
  accountNumber: yup
    .string()
    .required('Please enter your Card Number')
    .max(8)
    .label('Number')
    .matches(/[0-9]{8}/, 'Please enter correct number'),
  accountType: yup.string().required('Please enter your State'),
  accountName: yup
    .string()
    .required('Please enter Exact Account Name')
    .min(2, 'This field should contain at least 2 symbols'),
  address: yup
    .string()
    .required('Please enter your Address')
    .min(2, 'This field should contain at least 2 symbols'),
  city: yup
    .string()
    .required('Please enter your City')
    .max(16, 'The field should be less than or equal to 16 symbols ')
    .min(2, 'This field should contain at least 2 symbols'),
  state: yup.string().required('Please enter your State'),
  postalCode: yup
    .string()
    .matches(/[0-9]{5}/, 'Please enter correct code')
    .required('Please enter Code'),
});
