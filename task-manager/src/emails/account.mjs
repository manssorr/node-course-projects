import sgMail from '@sendgrid/mail';

const sendgridAPIKey = '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'

sgMail.setApiKey(sendgridAPIKey)

const sendWelcomeEmail = (email, name) => {
	sgMail.send({
		to: email,
		from: '6532489@gmail.com',
		subject: 'Thanks for joining in!',
		text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
	})
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'andrew@mead.io',
        subject: 'Sorry to see you go!',
        text: `Goodbye, ${name}. I hope to see you back sometime soon.`
    })
}

export { sendWelcomeEmail, sendCancelationEmail }