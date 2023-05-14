export const filterByCategory = (products, category) => {
  if (category !== 'All') {
    return (products = products.filter((product) =>
      product.Categories.map((e) => e.name).includes(category)
    ));
  } else {
    return products;
  }
};

export const filterByGender = (products, gender) => {
  if (gender !== 'All') {
    return (products = products.filter((product) => product.gender === gender));
  } else {
    return products;
  }
};

export const filterBySeason = (products, season) => {
  if (season !== 'All') {
    return (products = products.filter((product) =>
      product.Seasons.map((e) => e.name).includes(season)
    ));
  } else {
    return products;
  }
};

export const filterByDiscount = (products, discount) => {
  if (discount !== 'All') {
    return (products = products.filter((product) => product.discount === Number(discount)));
  } else {
    return products;
  }
};

export const sortProducts = (products, order) => {
  switch (order) {
    case 'Price (Asc)':
      return products.sort((a, b) => {
        if (a.price < b.price) {
          return -1;
        } else if (a.price > b.price) {
          return 1;
        } else {
          return 0;
        }
      });

    case 'Price (Desc)':
      return products.sort((a, b) => {
        if (a.price < b.price) {
          return 1;
        } else if (a.price > b.price) {
          return -1;
        } else {
          return 0;
        }
      });

    default:
      return products;
  }
};
