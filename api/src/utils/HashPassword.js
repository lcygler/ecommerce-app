const bcrypt = require("bcryptjs");

//el encrypt hay que agregarlo en el handler que crea usuarios, y hashear la pass antes de crearlos

const encrypt = async (passwordPlain) => {
  const hash = await bcrypt.hash(passwordPlain, 10);
  return hash;
};

//cuando usemos encrypt en el handler de crear usuario quedaria algo asi:

// const { name, lastname, username, email, password, birthdate, phoneNumber } =
//   req.body;

// const passwordHash = await encrypt(password);
// const createUser = await User.create({
//   name,
//   lastname,
//   username,
//   email,
//   password: passwordHash,
//   birthdate,
//   phoneNumber,
// });

const compare = async (passwordPlain, hashPassword) => {
  return await bcrypt.compare(passwordPlain, hashPassword);
};

// para comparar hay que hacer un controller a login y agregarle esto:

// const {email, password} = req.body
// const user = await User.findOne({email})
// if(!user){
//     res.status(404).send({error: "user not found"})
// }
// const checkPassword = await compare(password, user.password)
//"compare" hay que importarlo de este archivo cuando lo usemos en el controller

module.exports = { encrypt, compare };
