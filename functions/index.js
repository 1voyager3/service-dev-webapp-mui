const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require("nodemailer");
const cors = require('cors')({ origin: true });
require('dotenv').config();


// @desc initialization
const config = functions.config();
admin.initializeApp();

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        // @desc testing email and password
        user: config.user.email,
        pass: config.user.password,
    },
});

let mailOptions = {
    from: 'Demo Development',
    // // @desc development email
    to: process.env.DEV_EMAIL,
    subject: 'Testing nodemailer',
    text: 'Text successful!',
};


exports.sendMail = functions.https.onRequest((request, response) => {

    cors(request, response, () => {
        transporter.sendMail(mailOptions, error => {

            if (error) {
                response.send(error);
            } else {
                response.send('Message sent successfully!');
            }

        });
    });
});

// @desc Documentation
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

