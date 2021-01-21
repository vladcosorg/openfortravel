const axios = require('axios')

module.exports = function (app) {
  app.post('/send-message', async (req, res) => {
    return setTimeout(() => res.status(200).send(), 3000)
    const origin = req.body.originCode
    const destination = req.body.destinationCode
    const email = req.body.email
    if (!/^[a-z]{2}$/.test(origin)) {
      return res.status(400).send('Invalid origin')
    }

    if (destination !== undefined && !/^[a-z]{2}$/.test(destination)) {
      return res.status(400).send('Invalid destination')
    }

    const mailingListName = destination ? `${origin}${destination}` : origin
    const auth = {
      username: 'api',
      password: process.env.MAILGUN_API_KEY,
    }

    try {
      await axios.post(
        'https://api.mailgun.net/v3/lists',
        new URLSearchParams({
          address: `${mailingListName}@mg.openfortravel.org`,
        }),
        {
          auth,
        },
      )
    } catch (error) {
      console.log('Already')
    }

    let response = ''
    try {
      response = await axios.post(
        `https://api.mailgun.net/v3/lists/${mailingListName}@mg.openfortravel.org/members`,
        new URLSearchParams({
          address: email,
          upsert: true,
        }),
        {
          auth,
        },
      )
    } catch (error) {
      return res.status(error.response.status).send(error.response.data)
    }

    return res.status(response.status).send()
  })
}
