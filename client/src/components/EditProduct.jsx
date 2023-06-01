import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import {
  getCategories,
  getGenders,
  getProductById,
  getSeasons,
  updateProductById,
} from '../redux/asyncActions';
import { validateEditProduct } from '../utils/validateForm';

import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  Select,
  Spinner,
  Stack,
} from '@chakra-ui/react';
import { FaChevronLeft } from 'react-icons/fa';
import backgroundImage from '../assets/images/background.jpg';

let timeoutId = null;
let navigateTimeoutId = null;

function EditProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const selectedProduct = useSelector((state) => state.selectedProduct);

  useEffect(() => {
    const fetchProduct = async () => {
      await dispatch(getProductById(productId));
      setIsLoadingData(false);
    };
    fetchProduct();
    dispatch(getCategories());
    dispatch(getSeasons());
    dispatch(getGenders());
  }, [dispatch, productId]);

  const categories = useSelector((state) => state.categories);
  const seasons = useSelector((state) => state.seasons);
  const genders = useSelector((state) => state.genders);

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

  useEffect(() => {
    if (!isLoadingData && selectedProduct) {
      const {
        name,
        image,
        Categories,
        discounts,
        price,
        Seasons,
        size,
        gender,
        description,
        stock,
      } = selectedProduct;

      setFormData({
        name,
        size,
        gender,
        description,
        price,
        discounts,
        stock,
        image,
        season: Seasons ? Seasons[0].name : '',
        category: Categories ? Categories[0].name : '',
      });
    }
  }, [isLoadingData, selectedProduct]);

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
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleForm = (e) => {
    const { form } = e.target;

    const formFields = {};
    for (const element of form.elements) {
      if (element.name) {
        formFields[element.name] = element.value;
      }
    }

    validateEditProduct(formFields, errors, setErrors);
  };

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'modernFashion');

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/dmitoclts/upload', data);
      setFormData((prevFormData) => ({
        ...prevFormData,
        image: response.data.secure_url,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // if (formData.name && Object.values(errors).every((error) => error === '')) {
    // const newProduct = {
    //   id: productId,
    //   name:
    //     formData.name
    //       .trim()
    //       .charAt(0)
    //       .toUpperCase() + formData.name.trim().slice(1),
    //   size: formData.size.trim(),
    //   gender: formData.gender.trim(),
    //   description: formData.description.trim(),
    //   price: formData.price,
    //   discounts: formData.discounts,
    //   stock: Math.floor(formData.stock),
    //   image: formData.image.trim(),
    //   Seasons: { name: formData.season.trim() },
    //   Categories: { name: formData.category.trim() },
    // };

    if (
      Object.values(formData).some((field) => field !== '') &&
      Object.values(errors).every((error) => error === '')
    ) {
      const updatedProduct = {};

      if (formData.name.trim() !== '') {
        updatedProduct.name =
          formData.name
            .trim()
            .charAt(0)
            .toUpperCase() + formData.name.trim().slice(1);
      }
      if (formData.size.trim() !== '') {
        updatedProduct.size = formData.size.trim();
      }
      if (formData.gender.trim() !== '') {
        updatedProduct.gender = formData.gender.trim();
      }
      if (formData.description.trim() !== '') {
        updatedProduct.description = formData.description.trim();
      }
      if (formData.price !== '') {
        updatedProduct.price = formData.price;
      }
      if (formData.discounts !== '') {
        updatedProduct.discounts = formData.discounts;
      }
      if (formData.stock !== '') {
        updatedProduct.stock = Math.floor(formData.stock);
      }
      if (formData.image.trim() !== '') {
        updatedProduct.image = formData.image.trim();
      }
      if (formData.season.trim() !== '') {
        updatedProduct.Seasons = { name: formData.season.trim() };
      }
      if (formData.category.trim() !== '') {
        updatedProduct.Categories = { name: formData.category.trim() };
      }

      const response = dispatch(updateProductById({ productId, updatedProduct }));

      timeoutId = setTimeout(() => {
        setIsLoading(false);
        if (response) {
          setSuccess('Product updated successfully!');
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
            navigate(`/dashboard`);
          }, 1000);
        } else {
          setError('Incomplete or incorrect data');
        }
      }, 2000);
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(navigateTimeoutId);
    };
  }, []);

  if (isLoadingData || !selectedProduct) {
    return (
      <Box display="grid" placeItems="center" height="100vh">
        <Spinner size="xl" color="blue.500" />
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      height="100vh"
      backgroundImage={`url(${backgroundImage})`}
      backgroundSize="cover"
      backgroundPosition="center"
      position="relative"
    >
      <Box
        bg="white"
        boxShadow="lg"
        borderRadius="md"
        mx="auto"
        p={8}
        maxW="lg"
        boxSizing="border-box"
      >
        <Heading size="lg" mb="6" w="100%" textAlign="center">
          Update Product
        </Heading>
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
              <FormControl /* isRequired */ isInvalid={errors.name !== ''}>
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
              </FormControl>

              <FormControl /* isRequired */ isInvalid={errors.description !== ''}>
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
              </FormControl>
            </Stack>

            <Stack direction="row" spacing={4}>
              <FormControl /* isRequired */ isInvalid={errors.category !== ''}>
                <FormLabel htmlFor="category">Category</FormLabel>
                <Select
                  id="category"
                  name="category"
                  placeholder="Choose category"
                  value={formData.category}
                  onChange={handleChange}
                  _focus={{ borderColor: 'blue.500', borderWidth: '2px', boxShadow: 'none' }}
                  _invalid={{ borderColor: 'red.500', borderWidth: '2px', boxShadow: 'none' }}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl /* isRequired */ isInvalid={errors.season !== ''}>
                <FormLabel htmlFor="season">Season</FormLabel>
                <Select
                  id="season"
                  name="season"
                  placeholder="Choose season"
                  value={formData.season}
                  onChange={handleChange}
                  _focus={{ borderColor: 'blue.500', borderWidth: '2px', boxShadow: 'none' }}
                  _invalid={{ borderColor: 'red.500', borderWidth: '2px', boxShadow: 'none' }}
                >
                  {seasons.map((season) => (
                    <option key={season.id} value={season.name}>
                      {season.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Stack>

            <Stack direction="row" spacing={4}>
              <FormControl /* isRequired */ isInvalid={errors.gender !== ''}>
                <FormLabel htmlFor="gender">Gender</FormLabel>
                <Select
                  id="gender"
                  name="gender"
                  placeholder="Choose gender"
                  value={formData.gender}
                  onChange={handleChange}
                  _focus={{ borderColor: 'blue.500', borderWidth: '2px', boxShadow: 'none' }}
                  _invalid={{ borderColor: 'red.500', borderWidth: '2px', boxShadow: 'none' }}
                >
                  {genders.map((gender) => (
                    <option key={gender.id} value={gender.name}>
                      {gender.name}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl /* isRequired */ isInvalid={errors.size !== ''}>
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
              </FormControl>
            </Stack>

            <Stack direction="row" spacing={4}>
              <FormControl /* isRequired */ isInvalid={errors.price !== ''}>
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
              </FormControl>

              <FormControl /* isRequired */ isInvalid={errors.discounts !== ''}>
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
              </FormControl>
            </Stack>

            <Stack direction="row" spacing={4}>
              <FormControl /* isRequired */ isInvalid={errors.stock !== ''}>
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
              </FormControl>

              <FormControl /* isRequired */ isInvalid={errors.image !== ''}>
                <FormLabel htmlFor="image">New Image</FormLabel>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  placeholder="Upload image"
                  onChange={uploadImage}
                  style={{ padding: '3px', boxSizing: 'border-box' }}
                  _focus={{ borderColor: 'blue.500', borderWidth: '2px', boxShadow: 'none' }}
                  _invalid={{ borderColor: 'red.500', borderWidth: '2px', boxShadow: 'none' }}
                />
              </FormControl>
            </Stack>
          </Stack>

          <Stack direction="column" spacing={4} mt="25px">
            <Stack direction="row" spacing={4} justifyContent="center">
              {/* <Button
                width="100%"
                onClick={() => {
                  navigate('/dashboard');
                }}
                isDisabled={isLoading}
              >
                Go back
              </Button> */}

              <Button
                type="submit"
                colorScheme="blue"
                isLoading={isLoading}
                loadingText="Updating..."
                width="40%"
              >
                Update
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>

      <Button
        colorScheme="blue"
        variant="ghost"
        size="md"
        rounded="full"
        onClick={() => navigate('/dashboard')}
        position="absolute"
        top="20px"
        left="20px"
        isDisabled={isLoading}
      >
        <Icon as={FaChevronLeft} mr="2" /> Back to Dashboard
      </Button>
    </Box>
  );
}

export default EditProduct;
