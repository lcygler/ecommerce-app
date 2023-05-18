import { emailRegex, imageRegex } from '../utils/consts';

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
  else if (password.length < 6) newErrors.password = 'Password is too short';
  else if (password.length > 20) newErrors.password = 'Password is too long';
  else newErrors.password = '';

  //* Confirm password
  if (!passwordCheck) newErrors.passwordCheck = 'Password cannot be empty';
  else if (typeof passwordCheck !== 'string') newErrors.passwordCheck = 'Password must be string';
  else if (passwordCheck.length < 6) newErrors.passwordCheck = 'Password is too short';
  else if (passwordCheck.length > 20) newErrors.passwordCheck = 'Password is too long';
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

export function validateProduct(formData, errors, setErrors) {
  let newErrors = { ...errors };
  const { name, category, season, size, gender, description, price, discounts, stock, image } =
    formData;

  //* Name
  if (!name) newErrors.name = 'Name cannot be empty';
  else if (typeof name !== 'string') newErrors.name = 'Name must be string';
  else newErrors.name = '';

  //* Description
  if (!description) newErrors.description = 'Description cannot be empty';
  else if (typeof description !== 'string') newErrors.description = 'Description must be string';
  else newErrors.description = '';

  //* Category
  if (!category) newErrors.category = 'Category cannot be empty';
  else if (typeof category !== 'string') newErrors.category = 'Category must be string';
  else newErrors.category = '';

  //* Season
  if (!season) newErrors.season = 'Season cannot be empty';
  else if (typeof season !== 'string') newErrors.season = 'Season must be string';
  else newErrors.season = '';

  //* Gender
  if (!gender) newErrors.gender = 'Gender cannot be empty';
  else if (typeof gender !== 'string') newErrors.gender = 'Gender must be string';
  else newErrors.gender = '';

  //* Size
  if (!size) newErrors.size = 'Size cannot be empty';
  else newErrors.size = '';

  //* Price
  if (!price) newErrors.price = 'Price cannot be empty';
  else if (isNaN(Number(price))) newErrors.price = 'Price must be a number';
  else newErrors.price = '';

  //* Discounts
  if (!discounts) newErrors.discounts = 'Discounts cannot be empty';
  else if (isNaN(Number(discounts))) newErrors.discounts = 'Discounts must be a number';
  else newErrors.discounts = '';

  //* Stock
  if (!stock) newErrors.stock = 'Stock cannot be empty';
  else if (!Number.isInteger(Number(stock))) newErrors.stock = 'Stock must be integer';
  else newErrors.stock = '';

  //* Image
  if (!image) newErrors.image = 'Image cannot be empty';
  else if (typeof image !== 'string') newErrors.image = 'Image must be a string';
  else if (!imageRegex.test(image)) newErrors.image = 'Invalid image file format';
  else newErrors.image = '';

  setErrors(newErrors);
}
