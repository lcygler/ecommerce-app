import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { createProduct } from '../redux/asyncActions';
import { validateProduct } from '../utils/validateForm';

import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';

import backgroundImage from '../assets/images/background.jpg';

let timeoutId = null;
let navigateTimeoutId = null;

const genders = [
  { id: 1, name: 'Hombre' },
  { id: 2, name: 'Mujer' },
  { id: 3, name: 'Otros' },
];

const seasons = [
  { id: 1, name: 'Verano' },
  { id: 2, name: 'Primavera' },
  { id: 3, name: 'Invierno' },
  { id: 4, name: 'Otoño' },
];

function CreateProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    size: '',
    gender: '',
    description: '',
    price: '',
    discounts: '',
    stock: '',
    image: '',
    season: '',
    category: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    size: '',
    gender: '',
    description: '',
    price: '',
    discounts: '',
    stock: '',
    image: '',
    season: '',
    category: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      // Handle checkbox inputs
      setFormData((prevFormData) => {
        const currentSeasons = [...(prevFormData[name] || [])];

        if (checked) {
          if (!currentSeasons.includes(value)) {
            currentSeasons.push(value);
          }
        } else {
          const index = currentSeasons.indexOf(value);
          if (index !== -1) {
            currentSeasons.splice(index, 1);
          }
        }

        return { ...prevFormData, [name]: currentSeasons };
      });
    } else {
      // Handle other inputs
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
  };

  const handleForm = (e) => {
    const { form } = e.target;

    const formFields = {};
    for (const element of form.elements) {
      if (element.name) {
        formFields[element.name] = element.value;
      }
    }

    validateProduct(formFields, errors, setErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.name && Object.values(errors).every((error) => error === '')) {
      const newProduct = {
        name: formData.name.trim().charAt(0).toUpperCase() + formData.name.trim().slice(1),
        size: formData.size.trim(),
        gender: formData.gender.trim(),
        description: formData.description.trim(),
        price: formData.price,
        discounts: formData.discounts,
        stock: Math.floor(formData.stock),
        image: formData.image.trim(),
        Seasons: { name: formData.season.trim() },
        Categories: { name: formData.category.trim() },
      };

      const response = await dispatch(createProduct(newProduct));
      console.log('Esta es la respuesta a la creacion');
      console.log(response);
      console.log(response.payload);
      timeoutId = setTimeout(() => {
        setIsLoading(false);
        if (response) {
          setSuccess('Product creation successful!');
          setFormData({
            name: '',
            size: '',
            gender: '',
            description: '',
            price: '',
            discounts: '',
            stock: '',
            image: '',
            season: '',
            category: '',
          });
          navigateTimeoutId = setTimeout(() => {
            navigate(`/home/${response.payload.id}`);
          }, 1000);
        } else {
          setError('Incomplete or incorrect data');
        }
      }, 2000);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(navigateTimeoutId);
    };
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      height="100vh"
      backgroundImage={`url(${backgroundImage})`}
      backgroundSize="cover"
      backgroundPosition="center"
    >
      <Box bg="white" boxShadow="lg" borderRadius="md" mx="auto" p={6} maxW="lg">
        <form onChange={handleForm} onSubmit={handleSubmit}>
          {error && (
            <Alert status="error" marginBottom={4}>
              <AlertIcon />
              {error}
            </Alert>
          )}
          {success && (
            <Alert status="success" marginBottom={4}>
              <AlertIcon />
              {success}
            </Alert>
          )}
          <Stack direction="column" spacing={4}>
            <Stack direction="row" spacing={4}>
              <FormControl isRequired isInvalid={errors.name !== ''}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter name"
                  value={formData.name}
                  onChange={handleChange}
                  _focus={{ borderColor: 'blue.500', borderWidth: '2px', boxShadow: 'none' }}
                  _invalid={{ borderColor: 'red.500', borderWidth: '2px', boxShadow: 'none' }}
                />
                {/* <FormErrorMessage>{errors.name}</FormErrorMessage> */}
              </FormControl>

              <FormControl isRequired isInvalid={errors.description !== ''}>
                <FormLabel htmlFor="description">Description</FormLabel>
                <Input
                  id="description"
                  name="description"
                  type="text"
                  placeholder="Enter description"
                  value={formData.description}
                  onChange={handleChange}
                  _focus={{ borderColor: 'blue.500', borderWidth: '2px', boxShadow: 'none' }}
                  _invalid={{ borderColor: 'red.500', borderWidth: '2px', boxShadow: 'none' }}
                />
                {/* <FormErrorMessage>{errors.description}</FormErrorMessage> */}
              </FormControl>
            </Stack>

            <Stack direction="row" spacing={4}>
              <FormControl isRequired isInvalid={errors.category !== ''}>
                <FormLabel htmlFor="category">Category</FormLabel>
                <Input
                  id="category"
                  name="category"
                  type="text"
                  placeholder="Enter category"
                  value={formData.category}
                  onChange={handleChange}
                  _focus={{ borderColor: 'blue.500', borderWidth: '2px', boxShadow: 'none' }}
                  _invalid={{ borderColor: 'red.500', borderWidth: '2px', boxShadow: 'none' }}
                />
                {/* <FormErrorMessage>{errors.category}</FormErrorMessage> */}
              </FormControl>

              <FormControl isRequired isInvalid={errors.season !== ''}>
                <FormLabel htmlFor="season">Season</FormLabel>
                <Select
                  id="season"
                  name="season"
                  placeholder="Choose season"
                  value={formData.season}
                  onChange={handleChange}
                  // isMulti
                  _focus={{ borderColor: 'blue.500', borderWidth: '2px', boxShadow: 'none' }}
                  _invalid={{ borderColor: 'red.500', borderWidth: '2px', boxShadow: 'none' }}
                >
                  {seasons.map((season) => (
                    <option key={season.id} value={season.name}>
                      {season.name}
                    </option>
                  ))}
                </Select>
                {/* <FormErrorMessage>{errors.season}</FormErrorMessage> */}
              </FormControl>
            </Stack>

            <Stack direction="row" spacing={4}>
              <FormControl isRequired isInvalid={errors.gender !== ''}>
                <FormLabel htmlFor="gender">Gender</FormLabel>
                <Select
                  id="gender"
                  name="gender"
                  placeholder="Choose gender"
                  value={formData.gender}
                  onChange={handleChange}
                  // isMulti
                  _focus={{ borderColor: 'blue.500', borderWidth: '2px', boxShadow: 'none' }}
                  _invalid={{ borderColor: 'red.500', borderWidth: '2px', boxShadow: 'none' }}
                >
                  {genders.map((gender) => (
                    <option key={gender.id} value={gender.name}>
                      {gender.name}
                    </option>
                  ))}
                </Select>
                {/* <FormErrorMessage>{errors.gender}</FormErrorMessage> */}
              </FormControl>

              <FormControl isRequired isInvalid={errors.size !== ''}>
                <FormLabel htmlFor="size">Size</FormLabel>
                <Input
                  id="size"
                  name="size"
                  type="text"
                  placeholder="Enter size"
                  value={formData.size}
                  onChange={handleChange}
                  _focus={{ borderColor: 'blue.500', borderWidth: '2px', boxShadow: 'none' }}
                  _invalid={{ borderColor: 'red.500', borderWidth: '2px', boxShadow: 'none' }}
                />
                {/* <FormErrorMessage>{errors.size}</FormErrorMessage> */}
              </FormControl>
            </Stack>

            <Stack direction="row" spacing={4}>
              <FormControl isRequired isInvalid={errors.price !== ''}>
                <FormLabel htmlFor="price">Price</FormLabel>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="Enter price"
                  value={formData.price}
                  onChange={handleChange}
                  _focus={{ borderColor: 'blue.500', borderWidth: '2px', boxShadow: 'none' }}
                  _invalid={{ borderColor: 'red.500', borderWidth: '2px', boxShadow: 'none' }}
                />
                {/* <FormErrorMessage>{errors.price}</FormErrorMessage> */}
              </FormControl>

              <FormControl isRequired isInvalid={errors.discounts !== ''}>
                <FormLabel htmlFor="discounts">Discount</FormLabel>
                <Input
                  id="discounts"
                  name="discounts"
                  type="number"
                  placeholder="Enter discount"
                  value={formData.discounts}
                  onChange={handleChange}
                  _focus={{ borderColor: 'blue.500', borderWidth: '2px', boxShadow: 'none' }}
                  _invalid={{ borderColor: 'red.500', borderWidth: '2px', boxShadow: 'none' }}
                />
                {/* <FormErrorMessage>{errors.discounts}</FormErrorMessage> */}
              </FormControl>
            </Stack>

            <Stack direction="row" spacing={4}>
              <FormControl isRequired isInvalid={errors.stock !== ''}>
                <FormLabel htmlFor="stock">Stock</FormLabel>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  placeholder="Enter stock"
                  value={formData.stock}
                  onChange={handleChange}
                  _focus={{ borderColor: 'blue.500', borderWidth: '2px', boxShadow: 'none' }}
                  _invalid={{ borderColor: 'red.500', borderWidth: '2px', boxShadow: 'none' }}
                />
                {/* <FormErrorMessage>{errors.stock}</FormErrorMessage> */}
              </FormControl>

              <FormControl isRequired isInvalid={errors.image !== ''}>
                <FormLabel htmlFor="image">Image</FormLabel>
                <Input
                  id="image"
                  name="image"
                  type="url"
                  placeholder="Enter image URL"
                  value={formData.image}
                  onChange={handleChange}
                  _focus={{ borderColor: 'blue.500', borderWidth: '2px', boxShadow: 'none' }}
                  _invalid={{ borderColor: 'red.500', borderWidth: '2px', boxShadow: 'none' }}
                />
                {/* <FormErrorMessage>{errors.image}</FormErrorMessage> */}
              </FormControl>
            </Stack>

            {/* <Stack>
              <FormControl isRequired isInvalid={errors.season !== ''}>
                <FormLabel htmlFor="season">Season</FormLabel>
                <Stack direction="row">
                  {seasons.map((season) => (
                    <Checkbox
                      key={season.id}
                      name="season"
                      value={season.name}
                      checked={formData.season?.includes(season.name) || false}
                      onChange={handleChange}
                      _focus={{ borderColor: 'blue.500', borderWidth: '2px', boxShadow: 'none' }}
                      _invalid={{ borderColor: 'red.500', borderWidth: '2px', boxShadow: 'none' }}
                    >
                      {season.name}
                    </Checkbox>
                  ))}
                </Stack>
              </FormControl>
            </Stack> */}
          </Stack>

          <Stack direction="column" spacing={4} mt="20px">
            <Stack direction="row" spacing={4}>
              <Button
                width="100%"
                onClick={() => {
                  navigate('/home');
                }}
              >
                Go back
              </Button>

              <Button
                type="submit"
                colorScheme="blue"
                isLoading={isLoading}
                loadingText="Registering..."
                width="100%"
              >
                Create
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}

export default CreateProduct;