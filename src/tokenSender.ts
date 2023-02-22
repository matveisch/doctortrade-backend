import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '600138a3b1883d',
    pass: 'f2306220319316',
  },
});

export function sendToken(userId: string, email: string) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET ? process.env.JWT_SECRET : '', {
    expiresIn: '10m',
  });

  const mailConfigurations = {
    from: 'email@email.com',
    to: email,
    subject: 'Email Verification',
    text: `
      Hi! There, You have recently visited 
      our website and entered your email. 
      Please follow the given link to verify your 
      email ${process.env.HOST}${process.env.PORT}/user/verify/${token}. Thanks
    `,
  };

  transporter.sendMail(mailConfigurations, function (error, info) {
    if (error) return error;
    console.log('Email Sent Successfully');
    console.log(info);
  });
}
