const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const pg = require('pg');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, DB_DEPLOY, NODE_ENV } = process.env;

const dbUrl = DB_DEPLOY || `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const sequelize = new Sequelize(dbUrl, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  dialectModule: pg,
  dialectOptions: {
    ssl: NODE_ENV === 'production',
  },
});

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
  User,
  CartDetail,
  Category,
  Product,
  PurchaseDetail,
  Review,
  Season,
  ShippingAddress,
  Purchase,
  Cart,
} = sequelize.models;

//* USER - CART (Relación 1-1)
User.hasOne(Cart);
Cart.belongsTo(User);

//* USER - PURCHASE (Relación 1-N)
User.hasMany(Purchase);
Purchase.belongsTo(User);

//* CART - CART DETAIL (Relación 1-N)
Cart.hasMany(CartDetail);
CartDetail.belongsTo(Cart);

//* PURCHASE - PURCHASE DETAIL (Relación 1-N)
Purchase.hasMany(PurchaseDetail);
PurchaseDetail.belongsTo(Purchase);

//* PRODUCT - CART DETAIL (Relación 1-N)
Product.hasMany(CartDetail);
CartDetail.belongsTo(Product);

//* PRODUCT - PURCHASE DETAIL (Relación 1-N)
Product.hasMany(PurchaseDetail);
PurchaseDetail.belongsTo(Product);

//* USER - PRODUCT (Relación N-M)
User.belongsToMany(Product, { through: 'Favorites' });
Product.belongsToMany(User, { through: 'Favorites' });

//* USER - SHIPPING ADDRESS (Relación 1-N)
User.hasOne(ShippingAddress);
ShippingAddress.belongsTo(User);

//* USER - REVIEW (Relación 1-N)
User.hasMany(Review);
Review.belongsTo(User);

//* PRODUCT - REVIEW (Relación 1-N)
Product.hasMany(Review);
Review.belongsTo(Product);

//* PRODUCT - CATEGORY (Relación N-M)
Product.belongsToMany(Category, { through: 'Product_Category' });
Category.belongsToMany(Product, { through: 'Product_Category' });

//* PRODUCT - SEASON (Relación N-M)
Product.belongsToMany(Season, { through: 'Product_Season' });
Season.belongsToMany(Product, { through: 'Product_Season' });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};

// RELACIONES BACKUP

// ADMIN - USER (Relación 1-N)
// Admin.hasMany(User);
// User.belongsTo(Admin);

// ADMIN - PRODUCT (Relación 1-N)
// Admin.hasMany(Product);
// Product.belongsTo(Admin);

// USER - CART DETAIL (Relación 1-N)
// User.hasMany(CartDetail);
// CartDetail.belongsTo(User);

// USER - PURCHASE DETAIL (Relación 1-N)
// User.hasMany(PurchaseDetail);
// PurchaseDetail.belongsTo(User);

// PRODUCT - PURCHASE (Relación N-M)
// Product.belongsToMany(Purchase, { through: 'Purchase_Product' });
// Purchase.belongsToMany(Product, { through: 'Purchase_Product' });

// PRODUCT - CART DETAIL (Relación N-M)
// Product.belongsToMany(CartDetail, { through: 'Product_CartDetail' });
// CartDetail.belongsToMany(Product, { through: 'Product_CartDetail' });

// PRODUCT - PURCHASE DETAIL (Relación N-M)
// Product.belongsToMany(PurchaseDetail, { through: 'Product_PurchaseDetail' });
// PurchaseDetail.belongsToMany(Product, { through: 'Product_PurchaseDetail' });
