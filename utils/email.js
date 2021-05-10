const nodemailer = require('nodemailer');

// new Email(user, url).sendWelcome();

// module.exports = class Email {
//   constructor(user, url) {
//     this.to = user.email;
//     this.name = user.name;
//     this.url = url;
//     this.from = `Eric Seto <${process.env.EMAIL_FROM}>`;
//   }

//   createTransport() {
//     const transporter = nodemailer.createTransport({
//       service: 'Gmail',
//       auth: {
//         user: process.env.EMAIL_USERNAME,
//         pass: process.env.EMAIL_PASSWORD,
//       },
//       tls: {
//         rejectUnauthorized: false,
//       },
//     });
//   }

//   send(template, subject) {
//     //send the actual email
//     // render HTML

//     // define email options
//     const mailOptions = {
//       from: 'eric seto <ericseto807192@gmail.com>',
//       to: options.email,
//       subject: options.subject,
//       text: options.message,
//       // html:
//     };
//     //create a transport and send email
//   }

//   sendWelcome() {
//     this.send('Welcome', 'welcome to the WaterPolo Family');
//   }
// };

const sendEmail = async (options) => {
  // 1) create a transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  // 2) Define the email options
  const mailOptions = {
    from: 'eric seto <ericseto807192@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };
  //3) actually send the email
  await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;
