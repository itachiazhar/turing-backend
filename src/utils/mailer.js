const nodemailer = require('nodemailer');
const template  = require('swig');
const emailConfig = require('./../configs/email');
const logger = require('./logger');

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport(emailConfig.transporter);

module.exports.sendMail = (options, callback) => {
    const { dept, recipients, subject, file, context } = options;
    const compile = template.compileFile(file);
    const content = compile(context);
    const mailOptions = {
        from: emailConfig.support,
        to: recipients,
        subject: subject,
        html: content
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            logger.log(error);
        }
        if (callback) {
            callback(error, info);
        }
    });
};
