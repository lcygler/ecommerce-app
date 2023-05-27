const { Product, Review, Category, Season } = require('../db.js');
// const { uploadImage } = require('../utils/cloudinary.js');

const AddProducts = async (api) => {
  const products = api.products;
  const existingProductsCount = await Product.count();

  if (existingProductsCount < 1) {
    for (const product of products) {
      const {
        Category: categoriesData,
        seasons: seasonsData,
        reviews: reviewsData,
        ...productData
      } = product;

      //* Create or find categories
      const categoryNames = categoriesData.map((category) => category.name);
      const categories = await Promise.all(
        categoryNames.map((name) => Category.findOrCreate({ where: { name } }))
      );

      //* Create or find seasons
      const seasonNames = seasonsData.map((season) => season.name);
      const seasons = await Promise.all(
        seasonNames.map((name) => Season.findOrCreate({ where: { name } }))
      );

      //* Create product
      const newProduct = await Product.create(productData);

      //* Add categories and seasons to the product
      await newProduct.addCategories(categories.map(([category]) => category));
      await newProduct.addSeasons(seasons.map(([season]) => season));

      //* Create reviews and associate them with the product
      for (const review of reviewsData) {
        const newReview = await Review.create({
          comment: review.text,
          punctuation: review.rating,
        });
        await newReview.setProduct(newProduct);
      }
    }
  } else {
    console.log('La DB ya esta cargada con datos');
  }
};

const getAllProducts = async () => {
  const products = await Product.findAll({
    where: {
      disable: false,
    },
    include: [Category, Season, Review],
  });
  return products;
};

const getAdminProducts = async () => {
  const products = await Product.findAll({
    include: [Category, Season, Review],
  });
  return products;
};

module.exports = {
  AddProducts,
  getAllProducts,
  getAdminProducts,
};
