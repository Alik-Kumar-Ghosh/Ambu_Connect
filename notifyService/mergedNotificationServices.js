const nodemailer = require('nodemailer');
const dotenv=require("dotenv");


dotenv.config({path:'./.env'})

module.exports = async function (params ) {
    // Initialize the Appwrite client
    const { req, res } = params;

    
    // Initialize the nodemailer transporter
    const mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    });

    try {
        // Check if 'req.query' exists and contains the 'email' property
        if (!req.query || !req.query.email || !req.query.id) {
            throw new Error("Missing 'email' parameter");
        }
        const { email ,id } = req.query;
        console.log(email)
        console.log(id)

        if(id==='0'){

        // Create mail details
        const mailDetails = {
            from: 'amitdraganeel4961@gmail.com',
            to: email,
            subject: 'New Patient Report | AmbuConnect',
            text: 'Please Check your Active Patient List of AmbuConnect, New Patient Report has Been added'
        };

        console.log(email)
        // Send the email using nodemailer
        mailTransporter.sendMail(mailDetails, (err, data) => {
            if (err) {
                console.error(err);
                console.log(err)
                res.status(500).send({ error: 'Failed to send email 1' });
            } else {
                console.log('Email sent successfully');
                res.status(200).send({ success: 'Email sent successfully 1' });
            }
        });
      }
      else{
        const mailDetails = {
          from: 'amitdraganeel4961@gmail.com',
          to: email,
          subject: 'New Video Call | AmbuConnect',
          text: `Ambulance Person wants to connect with a doctor with https://ambuconnect.vercel.app/room/${id}`
      };

      console.log(email)
      // Send the email using nodemailer
      mailTransporter.sendMail(mailDetails, (err, data) => {
          if (err) {
              console.error(err);
              console.log(err)
              res.status(500).send({ error: 'Failed to send email 2' });
          } else {
              console.log('Email sent successfully');
              res.status(200).send({ success: 'Email sent successfully 2' });
          }
      });
      }
    } catch (error) {
        console.error(error);
        console.log(error);
        // Example: Sending an error response
        res.status(400).json({ error: error.message || 'Bad Request ' });
    }
};
