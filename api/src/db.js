require('dotenv').config();
const pg = require('pg');
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, DB_DEPLOY, NODE_ENV } = process.env;

const dbUrl = DB_DEPLOY || `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const sequelize = new Sequelize(dbUrl, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  dialectModule: pg,
  dialectOptions: {
    ssl: NODE_ENV === "production",
  }
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
  Admin,
  CartDetail,
  Category,
  Product,
  PurchaseDetail,
  Review,
  Season,
  ShippingAddress,
  Shopping,
  Trolley,
} = sequelize.models;

// Aca vendrian las relaciones
//Relaciones de admin
Admin.hasMany(User);
User.belongsTo(Admin);
//Relacion de admin y produc
Admin.hasMany(Product);
Product.belongsTo(Admin);
//Relacion entre user y review
User.hasMany(Review);
Review.belongsTo(User);
 //Relacion entre usueario y carrito
 User.hasMany(Trolley);
 Trolley.belongsTo(User);
 //Relacion usuario y su carritoDetail
User.hasMany(CartDetail);
CartDetail.belongsTo(User);
// detalle de la compra
User.hasMany(PurchaseDetail);
PurchaseDetail.belongsTo(User);
 //Relacion de usuario y su favoritos
 User.belongsToMany(Product, {through: "Favorites"});
 Product.belongsToMany(User, {through: "Favorites"});
 //Relacion entre Useario y Dirrecion
 User.hasMany(ShippingAddress);
 ShippingAddress.belongsTo(User);
 //Relacion entre producto y carrito
 Product.belongsToMany(Shopping, {through: 'Shopping_Product'});
 Shopping.belongsToMany(Product, {through: 'Shopping_Product'});
// Product uno a muchos reviews;
Product.hasMany(Review);
Review.belongsTo(Product);
//Relacion de Product a Categories M : M
Product.belongsToMany(Category, {through: 'ProductCategory'});
Category.belongsToMany(Product, {through: 'ProductCategory'});
//Relacion entre Products y season M : M
Product.belongsToMany(Season, {through: 'ProductSeason'});
Season.belongsToMany(Product, {through: 'ProductSeason'});

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
