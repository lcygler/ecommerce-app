require("dotenv").config();
const api = require("./src/utils/Product.json");
const server = require("./src/app.js");
const { AddProducts } = require("./src/controllers/ProductController.js");
const { conn } = require("./src/db.js");
const port = process.env.PORT || 3001;

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  AddProducts(api);
  server.listen(port, () => {
    console.log(`%s listening at ${port}`); // eslint-disable-line no-console
  });
});

module.exports = server;
