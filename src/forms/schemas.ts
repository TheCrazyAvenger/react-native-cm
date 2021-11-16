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
    .required('Password is required'),
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
