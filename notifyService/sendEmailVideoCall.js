const nodemailer = require('nodemailer');
const dotenv=require("dotenv");

dotenv.config({path:'./.env'})

module.exports = async function (req, res) {
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
        // Check if 'req' exists and contains the 'email' and 'id' parameters
        if (!req.payload || !req.payload.email || !req.payload.id) {
            throw new Error("Missing 'email' or 'id' parameter");
        }
        const { email, id } = req.payload;
       
        // Create mail details
        const mailDetails = {
            from: process.env.EMAIL,
            to: email,
            subject: 'New Video Call | AmbuConnect',
            text: `Ambulance Person wants to connect with you ${email} and ${id}`
        };

        console.log(email);
        console.log(id);
        // Send the email using nodemailer
        mailTransporter.sendMail(mailDetails, (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send({ error: 'Failed to send email' });
            } else {
                console.log('Email sent successfully');
                res.status(200).send({ success: 'Email sent successfully' });
            }
        });
    } catch (error) {
        console.error(error);
        // Example: Sending an error response
        res.status(400).json({ error: error.message || 'Bad Request' });
    }
};
