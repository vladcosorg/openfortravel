const path = require('path')

module.exports = async function () {
  if (process.env.NODE_ENV === 'development') {
    require('dotenv').config({ path: path.resolve('.env.development.node') })
  } else {
    const { SecretManagerServiceClient } = require('@google-cloud/secret-manager')
    const client = new SecretManagerServiceClient()
    const [tranaslationApiResponse] = await client.accessSecretVersion({
      name: 'projects/678272975127/secrets/TRANSLATION_API_KEY/versions/latest',
    })

    process.env.TRANSLATION_API_KEY = tranaslationApiResponse.payload.data.toString()

    const [mailgunApiResponse] = await client.accessSecretVersion({
      name: 'projects/678272975127/secrets/MAILGUN_API_KEY/versions/latest',
    })

    process.env.MAILGUN_API_KEY = mailgunApiResponse.payload.data.toString()
  }
}
