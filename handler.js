'use strict';

const nodemailer = require('nodemailer');

module.exports.email = (event, context, callback) => {

    var requestBody = JSON.parse(event.body);

    var mailOptions = {
        from: 'Company name <info@server.com>',
        to: requestBody.email_to,
        subject: 'Test Email Lambda',
        html: '<h4>Hello World!!</h4>'
    };

    var smtp_service = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        service: 'Gmal',
        auth: {
            user: 'your-email',
            pass: 'your-pass'
        }
    });

    smtp_service.sendMail(mailOptions, function (error, response) {
        let jResponse = null;

        if (error) {
            jResponse = { status: 500, send: false, error }
        } else {
            jResponse = { status: 200, send: true, message: 'Your email was sent correctly' };
        }

        callback(null, {
            statusCode: jResponse.status,
            body: JSON.stringify(jResponse)
        });
    });

};



