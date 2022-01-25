import sgMail from '@sendgrid/mail';

const sendgridAPIKey = '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'

sgMail.setApiKey(sendgridAPIKey)

sgMail.send({
    to: 'mansourashraf173@gmail.com',
    from: '6532489@gmail.com',
    subject: 'This is my first creation!',
    text: 'I hope this one actually get to you.'
})