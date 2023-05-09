const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const port =  process.env.DB_PORT || 3001



  server.listen(port, () => {
    console.log(`%s listening at ${port}`); 
  });
