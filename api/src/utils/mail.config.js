const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const EMAIL = process.env.EMAIL;
const EMAIL_PSSWRD = process.env.EMAIL_PSSWRD;
const SERVER = process.env.SERVER
const CLIENT_HOST = process.env.CLIENT_HOST

const mail = {
  user: EMAIL,
  pass: EMAIL_PSSWRD,
};

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  tls: {
    rejectUnauthorized: false,
  },
  secure: true,
  auth: {
    user: mail.user,
    pass: mail.pass,
  },
});

module.exports = {
  sendEmail: async (email, subject, html) => {
    try {
      await transporter.sendMail({
        from: `${mail.user}`,
        to: email,
        subject: "Welcome",
        text: "Welcome to Modern Fashion",
        html,
      });
      console.log("Email enviado");
    } catch (error) {
      console.log("Something went wrong with your email", error);
    }
  },
  sendStatusEmail: async (email, subject, html) => {
    try {
      await transporter.sendMail({
        from: `${mail.user}`,
        to: email,
        subject,
        text: "IMPORTANT INFORMATION FOR YOU",
        html,
      });
    } catch (error) {
      console.log("Something went wrong with your email", error);
    }
  },

  getTemplate: (email, token) => {
    return `
      <head>
          <link rel="stylesheet" href="./style.css">
      </head>
      
      <div id="email___content">
          
          <h2>Hola ${email}</h2>
          <p>Para confirmar tu cuenta, ingresa al siguiente enlace</p>
          <a
              href="${SERVER}user/confirm/${token}"
              target="_blank"
          >Confirmar Cuenta</a>
      </div>
    `;
  },
  templateChangePassword: (email, token) => {
    return `
          <head>
              <link rel="stylesheet" href="./style.css">
          </head>
          
          <div id="email___content">
              
              <h2>Hola ${email}</h2>
              <p>Has realizado un cambio de contraseña en Modern Fashion. Si tú no realizaste esta acción, ignora este mensaje.</p>
              <a
                  href="${SERVER}user/confirmchange/${token}"
                  target="_blank"
              >Confirma el cambio de tu contraseña</a>
          </div>
        `;
  },
  templateAdminInvitation: (email, token) => {
    return `
          <head>
              <link rel="stylesheet" href="./style.css">
          </head>
          
          <div id="email___content">
              
              <h2>Hola ${email}</h2>
              <p>Has sido invitado a formar parte del equipo administrativo de Modern Fashion</p>
              <a
                  href="${CLIENT_HOST}user/login"
                  target="_blank"
              >Te invitamos a iniciar sesión</a>
          </div>
        `;
  },
  templateAdminSuspension: (email, sender) => {
    return `
          <head>
              <link rel="stylesheet" href="./style.css">
          </head>
          
          <div id="email___content">
              
              <h2>Hola ${email}</h2>
              <p>Te comunicamos que tu permanencia en el equipo administrativo de Modern Fashion ha sido revocada. Para más información, comunícate con nosotros a ${sender}</p>
              <a
                  href="${CLIENT_HOST}home"
                  target="_blank"
              >Volver a la página principal</a>
          </div>
        `;
  },
  templateSuspensiónDeCuenta: (email, sender) => {
    return `
          <head>
              <link rel="stylesheet" href="./style.css">
          </head>
          
          <div id="email___content">
              
              <h2>Hola ${email}</h2>
              <p>Este correo electrónico te ha sido enviado porque tu cuenta en Modern Fashion ha sido suspendida.
              Para más información, comunícate con nosotros a ${sender}</p>
              
          </div>
        `;
  },
  templateRehabilitacionDeCuenta: (email, sender) => {
    return `
          <head>
              <link rel="stylesheet" href="./style.css">
          </head>
          
          <div id="email___content">
              
              <h2>Hola ${email}</h2>
              <p>Este correo electrónico te ha sido enviado porque tu cuenta en Modern Fashion ha sido restaurada.
              Para más información, comunícate con nosotros a ${sender}</p>
              
          </div>
        `;
  },
  templateEliminacionDeCuenta: (email, sender) => {
    return `
          <head>
              <link rel="stylesheet" href="./style.css">
          </head>
          
          <div id="email___content">
              
              <h2>Hola ${email}</h2>
              <p>Lamentamos verte partir. Si tú no has realizado esta acción o si tienes alguna sugerencia para hacernos y así tenerte de vuelta, te pedimos que nos escribas a ${sender}</p>
              
          </div>
        `;
  },
  getForgotPassTemplate: (email, token) => {
    return `
          <head>
              <link rel="stylesheet" href="./style.css">
          </head>
          
          <div id="email___content">
              
              <h2>Hola ${email}</h2>
              <p>Para establecer una nueva contraseña haz clic en el siguiente enlace</p>
              <a
                  href="${CLIENT_HOST}password/reset/${token}"
                  target="_blank"
              >Establecer nueva contraseña</a>
          </div>
        `;
  },
  getCompraProduct: (user, Products, sender) => {
    return `
    <head>
    <link rel="stylesheet" href="./style.css">
    </head>
    <div id="email___content">
    <h2>Hola ${user}</h2>
    <p>Este correo electrónico te ha sido enviado porque tu cuenta en Modern Fashion ha realizado una compra del producto ${Products}.
    Para más información, contáctanos a ${sender}</p>
    </div>
    `;
  },
  getFailCompra: (user, Products, sender, error) => {
    return `
    <head>
    <link rel="stylesheet" href="./style.css">
    </head>
    <div id="email___content">
    <h2>Hola ${user}</h2>
    <p>Este correo electrónico te ha sido enviado porque tu cuenta en Modern Fashion ha realizado una compra del producto ${Products}, la cual ha fallado por ${error}.
    Para más información, contáctanos a ${sender}</p>
    </div>
    `;
  },
};
