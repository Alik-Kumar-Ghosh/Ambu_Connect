const nodemailer = require('nodemailer');
const dotenv=require("dotenv");

dotenv.config({path:'./.env'})

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
			auth: {
				user:process.env.EMAIL ,
				pass: process.env.PASS
			}
		}
	);

let mailDetails = {
	from: 'amitdraganeel4961@gmail.com',
	to: 'akgalik3504@gmail.com',
	subject: 'Test mail',
	text: 'Node.js testing mail for ammbuconnect'
};

mailTransporter
	.sendMail(mailDetails,
		function (err, data) {
			if (err) {
				console.log(err);
			} else {
				console.log('Email sent successfully');
			}
		});
