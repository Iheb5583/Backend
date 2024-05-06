const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // use SSL
    auth: {
      user: 'ihebabdelmoumen@gmail.com',
      pass: 'cpkd bnye xrbn kxla',
    }
  });

const sendEmail = async (req, res) => {
    const mailOptions = {
        from: 'ihebabdelmoumen@gmail.com',
        to: 'ihebabdelmoumen@gmail.com',
        subject: 'Node.js Email Tutorial',
        text: 'This is a basic email sent from Node.js using Nodemailer.',
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email' });
    }
};

module.exports = { sendEmail };
