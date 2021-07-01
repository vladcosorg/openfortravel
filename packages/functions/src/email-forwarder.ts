import * as functions from 'firebase-functions'
import nodemailer from 'nodemailer'
import mg from 'nodemailer-mailgun-transport'

const auth = {
  auth: {
    api_key: functions.config().env.emailForwarder.mailgunKey, // Mailgun API key
    domain: 'mg.openfortravel.org', // Mailgun domain ie. mg.mydomain.com
  },
}
const nodemailerMailgun = nodemailer.createTransport(mg(auth)) // mailgun instance

export const emailForwarder = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', 'https://openfortravel.org') // don't forget to change this to your domain !
  const data: { from: string; message: string } = req.body // data passed as POST
  try {
    await nodemailerMailgun.sendMail({
      from: 'contact@openfortravel.org', // environment variable for sender
      replyTo: data.from,
      to: functions.config().env.emailForwarder.toEmail, // An array if you have multiple recipients.
      subject: `${data.from} from openfortravel.org `, // subject (from the post request)
      html: data.message, // html email body (from the post request )
    })
  } catch (error) {
    res.status(500).send(error)
  }
  res.status(200).send('good')
})
