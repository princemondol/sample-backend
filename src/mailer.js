import nodemailer from 'nodemailer';
import 'dotenv/config';

export const sendmail = async (to, message) => {

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure : true,
    auth: {
      user: process.env.EMAIL_ACCOUNT,
      pass: process.env.EMAIL_PASS
    }
  })

  let msg = {
    from: process.env.EMAIL_ACCOUNT,
    to: to,
    subject: "Test Message",
    html: message
  }

  try {
    let info = await transporter.sendMail(msg);
    console.log(`Info : ${info.messageId}`)
  } catch (e) {
    console.log(e);
  }

} 