//Sending emails using SendGrid
const sgMail = require('@sendgrid/mail');

//Have api key here for testing -- not production
const sendgridApiKey = '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';

sgMail.setApiKey(sendgridApiKey);

sgMail.send({
    to : 'xxx@yahoo.com',
    from : 'xxx@yahoo.com',
    subject : 'This is my first mail using Node',
    text : 'First mail lets see if this works'
});

