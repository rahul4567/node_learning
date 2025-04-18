//const nodemailer = require("nodemailer");

async function sendEmail(to, subject, text) {
  // Dev: console log instead of real email
  console.log(`Sending email to ${to} with text: ${text}`);

  // Uncomment for real SMTP:
  /*
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your_email@gmail.com',
      pass: 'your_app_password'
    }
  });

  await transporter.sendMail({ from: 'your_email@gmail.com', to, subject, text });
  */
}

module.exports = { sendEmail };
