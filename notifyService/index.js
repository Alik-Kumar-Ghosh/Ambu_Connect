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
        if (!req.query || !req.query.email) {
            throw new Error("Missing 'email' parameter");
        }
        const { email } = req.query;

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
    } catch (error) {
        console.error(error);
        console.log(error);
        // Example: Sending an error response
        res.status(400).json({ error: error.message || 'Bad Request' });
    }
};
