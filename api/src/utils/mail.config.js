const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const EMAIL = process.env.EMAIL;
const EMAIL_PSSWRD = process.env.EMAIL_PSSWRD;
const SERVER = process.env.SERVER;
const CLIENT_HOST = process.env.CLIENT_HOST;

const mail = {
  user: EMAIL,
  pass: EMAIL_PSSWRD,
};

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
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

//msj of Welcome
const sendWelcomeEmail = async (email, subject, html) => {
  try {
    await transporter.sendMail({
      from: `${mail.user}`,
      to: email,
      subject: "Welcome! It's a pleasure to have you here",
      text: ` ¡Bienvenidos a Modern Fashion!

      Estamos encantados de tenerte como nuevo miembro de nuestra comunidad de moda. Como miembro valioso, ahora tiene acceso a las últimas tendencias, ofertas exclusivas y una experiencia de compra sin igual.
      
      En Modern Fashion, nos esforzamos por ofrecerte lo mejor en ropa, accesorios y más, modernos y con estilo. Ya sea que esté buscando un atuendo elegante para una ocasión especial o simplemente desee actualizar su guardarropa diario, tenemos una amplia gama de opciones que se adaptan a su estilo personal.
      
      Como miembro registrado, puede crear su propio perfil personalizado, guardar sus artículos favoritos para más tarde y disfrutar de un viaje de compras sin inconvenientes. Manténgase al día con nuestras novedades, promociones y consejos de moda a través de nuestros boletines regulares.
      
      Si tiene alguna pregunta o necesita ayuda, nuestro amable equipo de atención al cliente está aquí para ayudarlo. No dude en comunicarse con nosotros a través de nuestra página de contacto y estaremos encantados de ayudarle.
      
      Gracias por elegir Modern Fashion. Esperamos brindarle opciones de moda excepcionales y una experiencia de compra encantadora.
      
      Atentamente,
      
      El equipo de Modern Fashion`,
      html: `<head>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f9f9f9;
              color: #333333;
              text-align: center;
          }
  
          .container {
              max-width: 500px;
              margin: 0 auto;
              padding: 30px;
              background-color: #ffffff;
              border-radius: 5px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
  
          h1 {
              font-size: 24px;
              margin-bottom: 20px;
          }
  
          p {
              font-size: 16px;
              line-height: 1.5;
              margin-bottom: 20px;
          }
  
          .button {
              display: inline-block;
              padding: 10px 20px;
              background-color: #3366cc;
              color: #ffffff;
              text-decoration: none;
              border-radius: 4px;
              transition: background-color 0.3s ease;
          }
  
          .button:hover {
              background-color: #254b99;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <h1>Welcome to Modern Fashion!</h1>
          <p>We are thrilled to have you as a new member of our fashion community. As a valued member, you now have access to the latest trends, exclusive offers, and an unparalleled shopping experience.</p>
          <p>At Modern Fashion, we strive to bring you the best in modern and stylish clothing, accessories, and more. Whether you're looking for a chic outfit for a special occasion or simply want to upgrade your everyday wardrobe, we have a wide range of options to suit your personal style.</p>
          <p>As a registered member, you can create your own personalized profile, save your favorite items for later, and enjoy a seamless shopping journey. Stay up to date with our new arrivals, promotions, and fashion tips through our regular newsletters.</p>
          <p>If you have any questions or need assistance, our friendly customer support team is here to help. Feel free to reach out to us through our contact page, and we'll be delighted to assist you.</p>
          <p>Thank you for choosing Modern Fashion. We look forward to providing you with exceptional fashion choices and a delightful shopping experience.</p>
          <a class="button" href="mailto:${mail.user}">Contact Us</a>
      </div>
  </body>`,
    });
    console.log('Email enviado');
  } catch (error) {
    console.log('Something went wrong with your email', error);
  }
};

const sendPurchaseSuccess = async (email, subject, products, html) => {
  try {
    await transporter.sendMail({
      from: `${mail.user}`,
      to: email,
      subject: 'Successful purchase',
      text: `
      En nombre de Modern Fashion, nos complace informarle que su compra ha sido realizada con éxito.

      Queremos expresar nuestro más sincero agradecimiento por elegirnos como su destino de comprasNos complace confirmar que su pedido ha sido procesado y enviado según lo acordado. 

      Nuestro equipo de expertos ha trabajado diligentemente para garantizar que su experiencia de compra sea satisfactoria y que sus productos seleccionados cumplan con los más altos estándares de calidad. 
      Le recordamos que estamos comprometidos con su satisfacción y que nuestro servicio al cliente está disponible para ayudarlo en caso de que tenga alguna consulta o inquietud adicional.

      No dude en ponerse en contacto con nosotros a través de los canales de comunicación proporcionados.
      Una vez más, le agradecemos por confiar en Modern Fashion. 
      Esperamos que disfrute de sus nuevas adquisiciones y que nuestra relación comercial continúe en el futuro. 

      Atentamente, 

      El equipo de Modern Fashion`,
      html: `<head>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f9f9f9;
              color: #333333;
              text-align: center;
          }
  
          .container {
              max-width: 500px;
              margin: 0 auto;
              padding: 30px;
              background-color: #ffffff;
              border-radius: 5px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
  
          h1 {
              font-size: 24px;
              margin-bottom: 20px;
          }
  
          p {
              font-size: 16px;
              line-height: 1.5;
              margin-bottom: 20px;
          }
  
          .product-list {
              list-style: none;
              padding: 0;
              margin-bottom: 20px;
          }
  
          .product-list li {
              display: flex;
              align-items: center;
              margin-bottom: 10px;
          }
  
          .product-list img {
              width: 80px;
              height: 80px;
              object-fit: cover;
              margin-right: 10px;
          }
  
          .product-list .product-details {
              flex: 1;
          }
  
          .button {
              display: inline-block;
              padding: 10px 20px;
              background-color: #3366cc;
              color: #ffffff;
              text-decoration: none;
              border-radius: 4px;
              transition: background-color 0.3s ease;
          }
  
          .button:hover {
              background-color: #254b99;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <h1>En nombre de Modern Fashion, nos complace informarle que su compra ha sido realizada con éxito.</h1>
          <p>Queremos expresar nuestro más sincero agradecimiento por elegirnos como su destino de compras. Nos complace confirmar que su pedido ha sido procesado y enviado según lo acordado.</p>
          <p>Nuestro equipo de expertos ha trabajado diligentemente para garantizar que su experiencia de compra sea satisfactoria y que sus productos seleccionados cumplan con los más altos estándares de calidad. Le recordamos que estamos comprometidos con su satisfacción y que nuestro servicio al cliente está disponible para ayudarlo en caso de que tenga alguna consulta o inquietud adicional.</p>
          <p>No dude en ponerse en contacto con nosotros a través de los canales de comunicación proporcionados. Una vez más, le agradecemos por confiar en Modern Fashion. Esperamos que disfrute de sus nuevas adquisiciones y que nuestra relación comercial continúe en el futuro.</p>
          <p>Atentamente,</p>
          <p>El equipo de Modern Fashion</p>
      </div>
  </body>`,
    });
    console.log('Email enviado');
  } catch (error) {
    console.log(error);
  }
};

const sendPurchaseFailure = async (email, user, Products, sender, error) => {
  try {
    await transporter.sendMail({
      from: `${mail.user}`,
      to: email,
      subject: 'Error en la compra',
      text: `
      Estimado/a cliente,

      Lamentamos informarle que su compra ha experimentado un inconveniente y no se ha podido completar satisfactoriamente. Entendemos lo importante que es para usted recibir los productos que ha seleccionado, y nos disculpamos por cualquier inconveniente que esto haya causado.

      Para obtener información adicional sobre el problema que ha surgido, le recomendamos que se comunique con nuestro equipo de atención al cliente. Puede enviar un correo electrónico a ${mail.user} y uno de nuestros representantes estará encantado de ayudarlo a resolver cualquier duda o inquietud que pueda tener.

      Nuevamente, le pedimos disculpas por los inconvenientes causados por este incidente y agradecemos su comprensión. Valoramos su confianza en nosotros y esperamos poder atenderle mejor en el futuro.

      Atentamente,

      El equipo de Modern Fashion `,
      html: `
      <html>
      <head>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f9f9f9;
                  color: #333333;
                  text-align: center;
              }
      
              .container {
                  max-width: 500px;
                  margin: 0 auto;
                  padding: 30px;
                  background-color: #ffffff;
                  border-radius: 5px;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              }
      
              h1 {
                  font-size: 24px;
                  margin-bottom: 20px;
              }
      
              p {
                  font-size: 16px;
                  line-height: 1.5;
                  margin-bottom: 20px;
              }
      
              .button {
                  display: inline-block;
                  padding: 10px 20px;
                  background-color: #3366cc;
                  color: #ffffff;
                  text-decoration: none;
                  border-radius: 4px;
                  transition: background-color 0.3s ease;
              }
      
              .button:hover {
                  background-color: #254b99;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>Estimado/a cliente,</h1>
              <p>Lamentamos informarle que su compra ha experimentado un inconveniente y no se ha podido completar satisfactoriamente. Entendemos lo importante que es para usted recibir los productos que ha seleccionado, y nos disculpamos por cualquier inconveniente que esto haya causado.</p>
              <p>Para obtener información adicional sobre el problema que ha surgido, le recomendamos que se comunique con nuestro equipo de atención al cliente. Puede enviar un correo electrónico a <a href="mailto:${mail.user}">${mail.user}</a> y uno de nuestros representantes estará encantado de ayudarlo a resolver cualquier duda o inquietud que pueda tener.</p>
              <p>Nuevamente, le pedimos disculpas por los inconvenientes causados por este incidente y agradecemos su comprensión. Valoramos su confianza en nosotros y esperamos poder atenderle mejor en el futuro.</p>
              <p>Atentamente,</p>
              <p>El equipo de Modern Fashion</p>
          </div>
      </body>`,
    });
    console.log('Email enviado');
  } catch (error) {}
};

const sendMailBaja = async (email, user, Products, sender, error) => {
    try {
      await transporter.sendMail({
        from: `${mail.user}`,
        to: email,
        subject: 'Error en la compra',
        text: `
        Estimado/a cliente,
  
        Lamentamos informarle que su compra ha experimentado un inconveniente y no se ha podido completar satisfactoriamente. Entendemos lo importante que es para usted recibir los productos que ha seleccionado, y nos disculpamos por cualquier inconveniente que esto haya causado.
  
        Además, queremos informarle que su cuenta ha sido suspendida debido a la infracción de las normas de nuestra página. Le recordamos que es importante cumplir con nuestras políticas para garantizar una experiencia segura y satisfactoria para todos nuestros usuarios.
  
        Para obtener información adicional sobre el problema que ha surgido o sobre la suspensión de su cuenta, le recomendamos que se comunique con nuestro equipo de atención al cliente. Puede enviar un correo electrónico a ${mail.user} y uno de nuestros representantes estará encantado de ayudarlo a resolver cualquier duda o inquietud que pueda tener.
  
        Nuevamente, le pedimos disculpas por los inconvenientes causados por este incidente y por la suspensión de su cuenta. Valoramos su comprensión y esperamos poder atenderle mejor en el futuro.
  
        Atentamente,
  
        El equipo de Modern Fashion `,
        html: `
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f9f9f9;
                    color: #333333;
                    text-align: center;
                }
        
                .container {
                    max-width: 500px;
                    margin: 0 auto;
                    padding: 30px;
                    background-color: #ffffff;
                    border-radius: 5px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
        
                h1 {
                    font-size: 24px;
                    margin-bottom: 20px;
                }
        
                p {
                    font-size: 16px;
                    line-height: 1.5;
                    margin-bottom: 20px;
                }
        
                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #3366cc;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 4px;
                    transition: background-color 0.3s ease;
                }
        
                .button:hover {
                    background-color: #254b99;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Estimado/a cliente,</h1>
                <p>Lamentamos informarle que su compra ha experimentado un inconveniente y no se ha podido completar satisfactoriamente. Entendemos lo importante que es para usted recibir los productos que ha seleccionado, y nos disculpamos por cualquier inconveniente que esto haya causado.</p>
                <p>Además, queremos informarle que su cuenta ha sido suspendida debido a la infracción de las normas de nuestra página. Le recordamos que es importante cumplir con nuestras políticas para garantizar una experiencia segura y satisfactoria para todos nuestros usuarios.</p>
                <p>Para obtener información adicional sobre el problema que ha surgido o sobre la suspensión de su cuenta, le recomendamos que se comunique con nuestro equipo de atención al cliente. Puede enviar un correo electrónico a <a href="mailto:${mail.user}">${mail.user}</a> y uno de nuestros representantes estará encantado de ayudarlo a resolver cualquier duda o inquietud que pueda tener.</p>
                <p>Nuevamente, le pedimos disculpas por los inconvenientes causados por este incidente y por la suspensión de su cuenta. Valoramos su comprensión y esperamos poder atenderle mejor en el futuro.</p>
                <p>Atentamente,</p>
                <p>El equipo de Modern Fashion</p>
            </div>
        </body>`,
      });
      console.log('Email enviado');
    } catch (error) {}
  };

  const sendMailAlta = async (email, user) => {
    try {
      await transporter.sendMail({
        from: `${mail.user}`,
        to: email,
        subject: 'Reactivación de cuenta',
        text: `
        Estimado/a ${user},
  
        Nos complace informarle que su cuenta ha sido dada de alta nuevamente. Le damos la bienvenida de vuelta a nuestra plataforma y nos disculpamos por cualquier inconveniente que haya experimentado durante la suspensión.
  
        Apreciamos su comprensión y su compromiso con nuestras normas y políticas. Estamos comprometidos en brindarle una experiencia segura y satisfactoria en nuestra página.
  
        Si tiene alguna pregunta o necesita asistencia, no dude en ponerse en contacto con nuestro equipo de atención al cliente. Estaremos encantados de ayudarlo en lo que necesite.
  
        Gracias por su confianza y esperamos poder brindarle un excelente servicio en el futuro.
  
        Atentamente,
  
        El equipo de Modern Fashion`,
        html: `
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f9f9f9;
                    color: #333333;
                    text-align: center;
                }
        
                .container {
                    max-width: 500px;
                    margin: 0 auto;
                    padding: 30px;
                    background-color: #ffffff;
                    border-radius: 5px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
        
                h1 {
                    font-size: 24px;
                    margin-bottom: 20px;
                }
        
                p {
                    font-size: 16px;
                    line-height: 1.5;
                    margin-bottom: 20px;
                }
        
                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #3366cc;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 4px;
                    transition: background-color 0.3s ease;
                }
        
                .button:hover {
                    background-color: #254b99;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Estimado/a ${user},</h1>
                <p>Nos complace informarle que su cuenta ha sido dada de alta nuevamente. Le damos la bienvenida de vuelta a nuestra plataforma y nos disculpamos por cualquier inconveniente que haya experimentado durante la suspensión.</p>
                <p>Apreciamos su comprensión y su compromiso con nuestras normas y políticas. Estamos comprometidos en brindarle una experiencia segura y satisfactoria en nuestra página.</p>
                <p>Si tiene alguna pregunta o necesita asistencia, no dude en ponerse en contacto con nuestro equipo de atención al cliente. Estaremos encantados de ayudarlo en lo que necesite.</p>
                <p>Gracias por su confianza y esperamos poder brindarle un excelente servicio en el futuro.</p>
                <p>Atentamente,</p>
                <p>El equipo de Modern Fashion</p>
            </div>
        </body>`,
      });
      console.log('Email enviado');
    } catch (error) {}
  };
  

  const sendAdminWelcome = async (email, user) => {
    try {
      await transporter.sendMail({
        from: `${mail.user}`,
        to: email,
        subject: '¡Felicitaciones! Bienvenida al equipo como administrador',
        text: `
        Estimada/o ${user},
  
        ¡Enhorabuena! Nos complace informarte que has sido seleccionada/o como administradora/or en nuestro equipo. Queremos darte una cálida bienvenida y expresar nuestro agradecimiento por unirte a nosotros.
  
        Como administradora/or, tendrás un papel fundamental en la gestión y toma de decisiones de nuestra plataforma. Confiamos en tus habilidades y experiencia para contribuir al crecimiento y éxito continuo de nuestra empresa.
  
        Esperamos que esta nueva posición sea una experiencia gratificante y llena de oportunidades para desarrollarte profesionalmente. Estamos seguros de que harás grandes aportes y te convertirás en un activo valioso para nuestro equipo.
  
        Si tienes alguna pregunta o necesitas ayuda, no dudes en comunicarte con nosotros. Estaremos encantados de brindarte todo el apoyo necesario para que te sientas cómoda/o y puedas desempeñar tu rol de manera efectiva.
  
        Una vez más, felicitaciones por convertirte en parte de nuestro equipo como administradora/or. Estamos emocionados de trabajar contigo y esperamos un futuro brillante juntos.
  
        ¡Bienvenida/o al equipo!
  
        Atentamente,
  
        El equipo de Modern Fashion`,
        html: `
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f9f9f9;
                    color: #333333;
                    text-align: center;
                }
        
                .container {
                    max-width: 500px;
                    margin: 0 auto;
                    padding: 30px;
                    background-color: #ffffff;
                    border-radius: 5px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
        
                h1 {
                    font-size: 24px;
                    margin-bottom: 20px;
                }
        
                p {
                    font-size: 16px;
                    line-height: 1.5;
                    margin-bottom: 20px;
                }
        
                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #3366cc;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 4px;
                    transition: background-color 0.3s ease;
                }
        
                .button:hover {
                    background-color: #254b99;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Estimada/o ${user},</h1>
                <p>¡Enhorabuena! Nos complace informarte que has sido seleccionada/o como administradora/or en nuestro equipo. Queremos darte una cálida bienvenida y expresar nuestro agradecimiento por unirte a nosotros.</p>
                <p>Como administradora/or, tendrás un papel fundamental en la gestión y toma de decisiones de nuestra plataforma. Confiamos en tus habilidades y experiencia para contribuir al crecimiento y éxito continuo de nuestra empresa.</p>
                <p>Esperamos que esta nueva posición sea una experiencia gratificante y llena de oportunidades para desarrollarte profesionalmente. Estamos seguros de que harás grandes aportes y te convertirás en un activo valioso para nuestro equipo.</p>
                <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en comunicarte con nosotros. Estaremos encantados de brindarte todo el apoyo necesario para que te sientas cómoda/o y puedas desempeñar tu rol de manera efectiva.</p>
                <p>Una vez más, felicitaciones por convertirte en parte de nuestro equipo como administradora/or. Estamos emocionados de trabajar contigo y esperamos un futuro brillante juntos.</p>
                <p>¡Bienvenida/o al equipo!</p>
                <p>Atentamente,</p>
                <p>El equipo de Modern Fashion</p>
            </div>
        </body>`,
      });
      console.log('Email enviado');
    } catch (error) {}
  };

  const sendAdminRemoval = async (email, user) => {
    try {
      await transporter.sendMail({
        from: `${mail.user}`,
        to: email,
        subject: 'Remoción de posición de administrador',
        text: `
        Estimada/o ${user},
  
        Lamentamos informarte que se ha tomado la decisión de remover tu posición de administradora/or en nuestro equipo. Queremos agradecerte por tu contribución y dedicación durante tu tiempo como administradora/or.
  
        Valoramos tus esfuerzos y el impacto positivo que has tenido en nuestra plataforma. Sin embargo, debido a cambios en nuestra estructura organizativa, hemos decidido hacer ajustes en los roles y responsabilidades del equipo.
  
        Apreciamos tu comprensión y te animamos a seguir siendo parte activa de nuestra comunidad. Tu opinión y participación siguen siendo valiosas para nosotros. Si tienes alguna pregunta o necesitas asistencia, no dudes en contactarnos.
  
        Agradecemos nuevamente tu compromiso y esperamos contar contigo en otros proyectos y oportunidades en el futuro.
  
        Atentamente,
  
        El equipo de Modern Fashion`,
        html: `
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f9f9f9;
                    color: #333333;
                    text-align: center;
                }
        
                .container {
                    max-width: 500px;
                    margin: 0 auto;
                    padding: 30px;
                    background-color: #ffffff;
                    border-radius: 5px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
        
                h1 {
                    font-size: 24px;
                    margin-bottom: 20px;
                }
        
                p {
                    font-size: 16px;
                    line-height: 1.5;
                    margin-bottom: 20px;
                }
        
                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #3366cc;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 4px;
                    transition: background-color 0.3s ease;
                }
        
                .button:hover {
                    background-color: #254b99;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Estimada/o ${user},</h1>
                <p>Lamentamos informarte que se ha tomado la decisión de remover tu posición de administradora/or en nuestro equipo. Queremos agradecerte por tu contribución y dedicación durante tu tiempo como administradora/or.</p>
                <p>Valoramos tus esfuerzos y el impacto positivo que has tenido en nuestra plataforma. Sin embargo, debido a cambios en nuestra estructura organizativa, hemos decidido hacer ajustes en los roles y responsabilidades del equipo.</p>
                <p>Apreciamos tu comprensión y te animamos a seguir siendo parte activa de nuestra comunidad. Tu opinión y participación siguen siendo valiosas para nosotros. Si tienes alguna pregunta o necesitas asistencia, no dudes en contactarnos.</p>
                <p>Agradecemos nuevamente tu compromiso y esperamos contar contigo en otros proyectos y oportunidades en el futuro.</p>
                <p>Atentamente,</p>
                <p>El equipo de Modern Fashion</p>
            </div>
        </body>`,
      });
      console.log('Email enviado');
    } catch (error) {}
  };
  
  
  

module.exports = {
  sendWelcomeEmail,
  sendPurchaseSuccess,
  sendPurchaseFailure,
  sendMailBaja,
  sendMailAlta,
  sendAdminWelcome,
  sendAdminRemoval
};
