const { Product, Review, Categories, Seasons, ProductCategory, ProductSeason } = require("../db"); // Importamos los modelos que vamos a utilizar
const {uploadImage} = require("../utils/cloudinary.js");


const AddProducts = async (api) => {
  const productos = [];
  const temporadas = [];
  const categoria = [];

  // Crear registros para las categorías
  for (let i = 0; i < api.products.length; i++) {
    const product = api.products[i];
    for (let j = 0; j < product.Category.length; j++) {
      const category = product.Category[j];
      if (!categoria.includes(category.name)) {
        await Category.create({ name: category.name });
        categoria.push(category.name);
      }
    }
  }

  // Crear registros para las temporadas
  for (let i = 0; i < api.products.length; i++) {
    const product = api.products[i];
    for (let j = 0; j < product.seasons.length; j++) {
      const season = product.seasons[j];
      if (!temporadas.includes(season.name)) {
        await Season.create({ name: season.name });
        temporadas.push(season.name);
      }
    }
  }

  // Crear registros para los productos y establecer relaciones con categorías y temporadas
  for (let i = 0; i < api.products.length; i++) {
    const product = api.products[i];

    // Crear registro de producto
    const newProduct = await Product.create({
      name: product.name,
      size: product.size,
      gender: product.gender,
      description: product.description,
      price: product.price,
      discount: product.discount,
      views: product.views,
      stock: product.stock,
      image: product.image
    });
    productos.push(newProduct);

    // Establecer relaciones con categorías
    for (let j = 0; j < product.Category.length; j++) {
      const categoryName = product.Category[j].name;
      const category = await Category.findOne({ where: { name: categoryName } });
      await newProduct.addCategory(category);
    }

    // Establecer relaciones con temporadas
    for (let j = 0; j < product.seasons.length; j++) {
      const seasonName = product.seasons[j].name;
      const season = await Season.findOne({ where: { name: seasonName } });
      await newProduct.addSeason(season);
    }

     // Crear registros para las reviews y establecer relación con el producto
  for (let j = 0; j < product.reviews.length; j++) {
    const reviewData = product.reviews[j];
    const newReview = await Review.create({
      comment: reviewData.text,
      punctuation: reviewData.rating,
    });
    await newProduct.addReview(newReview);
  }
  }
  
  // const dataInfo = await Category.findAll();
  // console.log(dataInfo);
};

const getAllProducts = async () => {
  const products = await Product.findAll({
    where: {
      disable: false
    },
    include: [
      {

        model: Review
      },
      {
        model: Category
      },
      {
        model: Season
      }
    ]
  });
  return products;
}



const createProduct = async (
  name,
  description,
  price,
  stock,
  image,
  categories,
  seasons
) => {
  try {
    const upload = await uploadImage(image);
    const product = await Product.create({
      name,
      description,
      price,
      stock,
      image: upload.url,
    });


const createProduct = async (name, description, price, stock, image, Category, Season) => {
    try {
      const product = await Product.create({ name, description, price, stock, image });
  
      // Asociamos las categorías al producto
      await product.setCategories(Category);
  
      // Asociamos las temporadas al producto
      await product.setSeasons(Season);
  
      return product;
    } catch (error) {
      console.error(error);
      throw new Error('Error creating product');
    }
  };


// Función para actualizar un producto
async function updateProduct(productId, productData) {
  try {
    // Buscamos el producto en la base de datos
    const product = await Product.findByPk(productId);

    // Si el producto no existe, lanzamos un error
    if (!product) {
      throw new Error("El producto no existe");
    }

    // Actualizamos los datos del producto
    await product.update(productData);

    // Devolvemos el producto actualizado
    return product;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  AddProducts

};
