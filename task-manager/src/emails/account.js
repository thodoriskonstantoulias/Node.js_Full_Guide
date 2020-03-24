//Sending emails using SendGrid
const sgMail = require('@sendgrid/mail');

//Have api key here for testing -- not production

sgMail.setApiKey(process.env.SENDGRID_API_KEY); 

// sgMail.send({
//     to : 'xxx@yahoo.com',
//     from : 'xxx@yahoo.com',
//     subject : 'This is my first mail using Node',
//     text : 'First mail lets see if this works'
// });

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to : email,
        from : 'xxx@yahoo.com',
        subject : 'This is my first mail using Node',
        text : `First mail lets see if this works ${name}`
    });
};

module.exports = {sendWelcomeEmail};
