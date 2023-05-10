require('dotenv').config();
const pg = require('pg');
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, DB_DEPLOY } = process.env;

const dbUrl = DB_DEPLOY || `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const sequelize = new Sequelize(dbUrl, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  dialectModule: pg,
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
const { Usuario, Admin, CartDetail, Categories,Products, PurchaseDetail, Review, Seasons, ShippingAddress, Shopping, Trolley } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
// Relación uno a muchos entre Character y Pokemon

// // Relación muchos a muchos entre Product y Category
// Products.belongsToMany(Categories, { through: 'ProductCategory' });
// Categories.belongsToMany(Products, { through: 'ProductCategory' });

// // Relación uno a uno entre Usuario y Carrito
// Usuario.hasOne(Trolley);
// Trolley.belongsTo(Usuario);

// // Relación uno a muchos entre Usuario y Compra
// Usuario.hasMany(Shopping);
// Shopping.belongsTo(Usuario);

// // Relación muchos a muchos entre Carrito y Producto
// Trolley.belongsToMany(Products, { through: CartDetail });
// Products.belongsToMany(Trolley, { through: CartDetail });

// // Relación uno a muchos entre Carrito y Detalle_Carrito
// Trolley.hasMany(CartDetail);
// CartDetail.belongsTo(Trolley);

// // Relación uno a muchos entre Compra y Detalle_Compra
// Shopping.hasMany(PurchaseDetail);
// PurchaseDetail.belongsTo(Shopping);

// // Relación muchos a muchos entre Producto y Detalle_Carrito
// Products.belongsToMany(Trolley, { through: CartDetail });
// Trolley.belongsToMany(Products, { through: CartDetail });

// // Relación muchos a muchos entre Producto y Detalle_Compra
// Products.belongsToMany(Shopping, { through: PurchaseDetail });
// Shopping.belongsToMany(Products, { through: PurchaseDetail });

// // Relación uno a muchos entre Usuario y Review
// Usuario.hasMany(Review);
// Review.belongsTo(Usuario);

// // Relación uno a muchos entre Producto y Review
// Products.hasMany(Review);
// Review.belongsTo(Products);

// // Relación muchos a muchos entre Producto y Season
// Products.belongsToMany(Seasons, { through: 'ProductSeason' });
// Seasons.belongsToMany(Products, { through: 'ProductSeason' });



module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
