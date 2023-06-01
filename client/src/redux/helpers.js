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
  if (discount === 'Discounts') {
    return (products = products.filter((product) => product.discounts > 0));
  } else if (discount !== 'All') {
    return (products = products.filter((product) => product.discounts === Number(discount)));
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

export const filterByStock = (products, stock) => {
  if (stock !== 'All') {
    return (products = products.filter((product) => product.stock === Number(stock)));
  } else {
    return products;
  }
};

//* USER FILTERS
export const filterByName = (users, name) => {
  if (name !== '') {
    return (users = users.filter((user) => user.name === name));
  } else {
    return users;
  }
};

export const filterByLastname = (users, lastname) => {
  if (lastname !== '') {
    return (users = users.filter((user) => user.lastname === lastname));
  } else {
    return users;
  }
};

export const filterByUsername = (users, username) => {
  if (username !== '') {
    return (users = users.filter((user) => user.username === username));
  } else {
    return users;
  }
};

export const filterByEmail = (users, email) => {
  if (email !== '') {
    return (users = users.filter((user) => user.email === email));
  } else {
    return users;
  }
};

export const filterByBirthdate = (users, birthdate) => {
  if (birthdate !== '') {
    return (users = users.filter((user) => user.birthdate === birthdate));
  } else {
    return users;
  }
};

export const filterByPhoneNumber = (users, phoneNumber) => {
  if (phoneNumber !== '') {
    return (users = users.filter((user) => user.phoneNumber === phoneNumber));
  } else {
    return users;
  }
};

export const filterByStatus = (users, disable) => {
  if (disable !== '') {
    if (disable === 'Active') {
      return (users = users.filter((user) => user.disable === false));
    } else {
      return (users = users.filter((user) => user.disable === true));
    }
  } else {
    return users;
  }
};

export const filterByAdmin = (users, admin) => {
  if (admin !== '') {
    if (admin === 'Admin') {
      return (users = users.filter((user) => user.isAdmin === true));
    } else {
      return (users = users.filter((user) => user.isAdmin === false));
    }
  } else {
    return users;
  }
};

// export const filterByStatus = (users, disable) => {
//   if (disable !== '') {
//     return (users = users.filter((user) => user.disable === disable));
//   } else {
//     return users;
//   }
// };

// export const filterByAdmin = (users, admin) => {
//   if (admin !== '') {
//     return (users = users.filter((user) => user.isAdmin === admin));
//   } else {
//     return users;
//   }
// };
