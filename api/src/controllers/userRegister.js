const jwt = require('jsonwebtoken');
const { User } = require('../db.js');
const { encrypt } = require('../utils/HashPassword.js');
const { getTemplate } = require('../utils/mail.config.js')

const registerCtrl = async (
  name,
  lastname,
  username,
  email,
  password,
  birthdate,
  phoneNumber,
  isAdmin
) => {
  if (!name) throw new Error('El nombre es requerido');
  if (!lastname) throw new Error('El apellido es requerido');
  if (!username) throw new Error('El nombre de usuario es requerido');
  if (!email) throw new Error('El email es requerido');
  if (!password) throw new Error('La contraseña es requerida');
  if (!birthdate) throw new Error('La fecha de nacimiento es requerida');
  if (!phoneNumber) throw new Error('El numero de telefono es requerido');

  const passwordHash = await encrypt(password);
  const createUser = await User.create({
    name,
    lastname,
    username,
    email,
    password: passwordHash,
    birthdate,
    phoneNumber,
    isAdmin,
  });

  // Generar JWT token
  const token = jwt.sign({ id: createUser.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  getTemplate(email, token);
  return { user: createUser, token };
};


const products = [
  {
    "name": "Remera De Algodón Broocklyn",
    "size": "XL",
    "gender": "Hombre",
    "description": "De la nueva colección de remeras Brickton, temporada 2023",
    "price": 3.799,
    "discounts": 0.1,
    "views": 56,
    "stock": 10,
    "image": "https://http2.mlstatic.com/D_NQ_NP_988044-MLA53782412313_022023-O.webp",
    "seasons": [
      {
        "id": 1,
        "name": "Verano"
      },
      {
        "id": 2,
        "name": "Primavera"
      }
    ],
    "Category": [
      {
        "id": 1,
        "name": "Remeras"
      }
    ],
    "reviews": [
      {
        "id": 1,
        "text": "La camisa es muy cómoda y tiene una excelente calidad.",
        "rating": 4.5
      },
      {
        "id": 2,
        "text": "Muy buena camisa, la recomiendo.",
        "rating": 5
      }
    ]
  },
  {
    "name": "Camisa de algodón",
    "size": "M",
    "gender": "Hombre",
    "description": "Camisa de algodón con corte clásico y botones.",
    "price": 3.999,
    "discounts": 0.0,
    "views": 40,
    "stock": 20,
    "image": "https://http2.mlstatic.com/D_NQ_NP_780776-MLA32226874603_092019-O.webp",
    "seasons": [
      {
        "id": 1,
        "name": "Verano"
      },
      {
        "id": 2,
        "name": "Primavera"
      }
    ],
    "Category": [
      {
        "id": 1,
        "name": "Camisas"
      }
    ],
    "reviews": [
      {
        "id": 3,
        "text": "La camisa es muy cómoda y tiene una excelente calidad.",
        "rating": 4.5
      },
      {
        "id": 4,
        "text": "Muy buena camisa, la recomiendo.",
        "rating": 5
      }
    ]
  },
  {
    "name": "Pantalones cortos deportivos",
    "size": "L",
    "gender": "Mujer",
    "description": "Pantalones cortos deportivos con tecnología de secado rápido.",
    "price": 4.499,
    "discounts": 0.0,
    "views": 34,
    "stock": 5,
    "image": "https://http2.mlstatic.com/D_NQ_NP_693102-MLA31750393167_082019-O.webp",
    "seasons": [
      {
        "id": 1,
        "name": "Verano"
      },
      {
        "id": 3,
        "name": "Otoño"
      }
    ],
    "Category": [
      {
        "id": 2,
        "name": "Pantalones"
      },
      {
        "id": 3,
        "name": "Deportes"
      }
    ],
    "reviews": [
      {
        "id": 5,
        "text": "Excelentes pantalones, muy cómodos y livianos.",
        "rating": 4
      },
      {
        "id": 6,
        "text": "Me encantaron los pantalones, los uso para salir a correr.",
        "rating": 4.5
      }
    ]
  },
  {
    "name": "Buzo oversize",
    "size": "XL",
    "gender": "Hombre",
    "description": "Buzo oversize frisado con capucha y cordon al tono panama",
    "price": 7.479,
    "discounts": 0.2,
    "views": 156,
    "stock": 30,
    "image": "https://http2.mlstatic.com/D_NQ_NP_706849-MLA49509043139_032022-O.webp",
    "seasons": [
      {
        "id": 1,
        "name": "Verano"
      },
      {
        "id": 2,
        "name": "Primavera"
      }
    ],
    "Category": [
      {
        "id": 1,
        "name": "Camisas"
      }
    ],
    "reviews": [
      {
        "id": 7,
        "text": "La camisa es muy cómoda y tiene una excelente calidad.",
        "rating": 4.5
      },
      {
        "id": 8,
        "text": "Muy buena camisa, la recomiendo.",
        "rating": 5
      }
    ]
  }
]

module.exports = { registerCtrl };
