const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'victorlpz2301@gmail.com',
    pass: process.env.MAIL_PASS,
  },
});

transporter
  .sendMail({
    from: "Ironhacker <victorlpz2301@gmail.com>",
    to: "victorlpz2301@gmail.com",
    subject: "test",
    text: "¿Por qué los programadores en React siempre parecen tan tranquilos y relajados?Porque siempre están en un estado de ¡Relax! (porque en React, el estado es una propiedad importante de los componentes)",
    html: "<p>¿Por qué los programadores en React siempre parecen tan tranquilos y relajados?Porque siempre están en un estado de ¡Relax! (porque en React, el estado es una propiedad importante de los componentes) <p> "
  })
  .then((info) => console.log(info))
  .catch((error) => console.log(error))