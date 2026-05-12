const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function testEmail() {
  console.log('Using config:', {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    from: process.env.EMAIL_FROM
  });

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: 'ankityadav18193@gmail.com',
      subject: 'Test Email from AudMint',
      text: 'If you see this, your SMTP settings are correct!',
    });
    console.log('Email sent:', info.messageId);
    process.exit(0);
  } catch (err) {
    console.error('Email failed:', err);
    process.exit(1);
  }
}

testEmail();
