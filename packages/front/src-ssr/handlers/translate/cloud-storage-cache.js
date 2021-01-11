const { Storage } = require('@google-cloud/storage')
const storage = new Storage()
const bucket = storage.bucket('translation-cache')

class CloudStorageCache {
  async has(key) {
    return (await bucket.file(key.getKey()).exists())[0]
  }
  async get(key) {
    const [contents] = await bucket.file(key.getKey()).download()
    return JSON.parse(contents.toString())
  }
  async set(key, content) {
    await bucket.file(key.getKey()).save(JSON.stringify(content))
  }
}

module.exports = CloudStorageCache
