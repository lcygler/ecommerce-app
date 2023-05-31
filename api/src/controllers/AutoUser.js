const axios = require('axios');
const { registerCtrl } = require('../controllers/userRegister');
const Users = require('../utils/users');

const addNewUserPeriodically = async () => {
  try {
    const response = await axios.get('https://randomuser.me/api/');
    const userData = parseUserData(response.data); // Función para extraer los datos relevantes del response

    await registerCtrl(userData); // Utiliza la función de registro existente para agregar el nuevo usuario

    console.log('Nuevo usuario agregado:', userData.name); // Imprime un mensaje con el nombre del usuario agregado
  } catch (error) {
    console.error('Error al agregar un nuevo usuario:', error.message);
  }
};

const saveUsersToDatabase = async () => {
  try {
    for (const user of Users) {
      // Lógica para guardar el usuario en la base de datos
      // Ejemplo: db.saveUser(user);
      console.log('Usuario guardado en la base de datos:', user.name);
    }
  } catch (error) {
    console.error('Error al guardar los usuarios en la base de datos:', error.message);
  }
};

const parseUserData = (data) => {
  const user = data.results[0];
  return {
    name: user.name.first,
    lastname: user.name.last,
    username: user.login.username,
    email: user.email,
    password: user.login.password,
    birthdate: user.dob.date,
    phoneNumber: user.phone,
    address: user.location.street.name,
    postalCode: user.location.postcode,
    state: user.location.state,
    country: user.location.country,
    isAdmin: false, // Puedes ajustar esto según tus necesidades
  };
};

// Ejecutar la función cada 20 minutos (1200000 ms)
setInterval(addNewUserPeriodically, 20 * 60 * 1000); // Ejecuta la función cada 20 minutos (20 minutos * 60 segundos * 1000 milisegundos)
module.exports = { addNewUserPeriodically, saveUsersToDatabase };
