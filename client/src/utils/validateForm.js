import { emailRegex } from '../utils/consts';

export function validateLogin(formData, errors, setErrors) {
  let newErrors = { ...errors };
  const { email, password } = formData;

  //* Email
  if (!email) newErrors.email = 'Email cannot be empty';
  else if (typeof email !== 'string') newErrors.email = 'Email must be string';
  else if (!emailRegex.test(email)) newErrors.email = 'Email must be a valid address';
  else newErrors.email = '';

  //* Password
  if (!password) newErrors.password = 'Password cannot be empty';
  else if (typeof password !== 'string') newErrors.password = 'Password must be string';
  else newErrors.password = '';

  setErrors(newErrors);
}

export function validateRegister(formData, errors, setErrors) {
  let newErrors = { ...errors };
  const {
    name,
    lastname,
    username,
    email,
    password,
    passwordCheck,
    birthdate,
    phoneNumber,
    address,
    postalCode,
    state,
    country,
  } = formData;

  //* First name
  if (!name) newErrors.name = 'First name cannot be empty';
  else if (typeof name !== 'string') newErrors.name = 'First name must be string';
  else newErrors.name = '';

  //* Last name
  if (!lastname) newErrors.lastname = 'Last name cannot be empty';
  else if (typeof lastname !== 'string') newErrors.lastname = 'Last name must be string';
  else newErrors.lastname = '';

  //* Username
  if (!username) newErrors.username = 'Username cannot be empty';
  else if (typeof username !== 'string') newErrors.username = 'Username must be string';
  else newErrors.username = '';

  //* Email address
  if (!email) newErrors.email = 'Email cannot be empty';
  else if (typeof email !== 'string') newErrors.email = 'Email must be string';
  else if (!emailRegex.test(email)) newErrors.email = 'Email must be a valid address';
  else newErrors.email = '';

  //* Password
  if (!password) newErrors.password = 'Password cannot be empty';
  else if (typeof password !== 'string') newErrors.password = 'Password must be string';
  else newErrors.password = '';

  //* Confirm password
  if (!passwordCheck) newErrors.passwordCheck = 'Password cannot be empty';
  else if (typeof passwordCheck !== 'string') newErrors.passwordCheck = 'Password must be string';
  else if (passwordCheck !== password && passwordCheck)
    newErrors.passwordCheck = 'Passwords must match';
  else newErrors.passwordCheck = '';

  //* Birthdate
  if (!birthdate) newErrors.birthdate = 'Birthdate cannot be empty';
  else newErrors.birthdate = '';

  //* Phone number
  if (!phoneNumber) newErrors.phoneNumber = 'Phone cannot be empty';
  else if (!Number.isInteger(Number(phoneNumber)))
    newErrors.phoneNumber = 'Phone must be an integer';
  else newErrors.phoneNumber = '';

  //* Address
  if (!address) newErrors.address = 'Address cannot be empty';
  else if (typeof address !== 'string') newErrors.address = 'Address must be a string';
  else newErrors.address = '';

  //* Postal code
  if (!postalCode) newErrors.postalCode = 'Postal code cannot be empty';
  else if (typeof postalCode !== 'string') newErrors.postalCode = 'Address must be a string';
  else newErrors.postalCode = '';

  //* State
  if (!state) newErrors.state = 'State cannot be empty';
  else if (typeof state !== 'string') newErrors.state = 'State must be a string';
  else newErrors.state = '';

  //* Country
  if (!country) newErrors.country = 'Country cannot be empty';
  else if (typeof country !== 'string') newErrors.country = 'Country must be a string';
  else newErrors.country = '';

  setErrors(newErrors);
}
