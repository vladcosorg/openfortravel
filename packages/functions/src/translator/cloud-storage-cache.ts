import { Storage } from '@google-cloud/storage'
import { CacheType } from 'vue-auto-i18n'
import { CacheKey } from 'vue-auto-i18n/cache/cache-key'

const storage = new Storage()
const bucket = storage.bucket('translation-cache')

export class CloudStorageCache implements CacheType {
  async has(key: CacheKey): Promise<boolean> {
    return (await bucket.file(key.getKey().toString()).exists())[0]
  }
  async get<T>(key: CacheKey): Promise<T | undefined> {
    const [contents] = await bucket.file(key.getKey().toString()).download()
    return JSON.parse(contents.toString())
  }
  async set(key: CacheKey, content: unknown): Promise<void> {
    await bucket.file(key.getKey().toString()).save(JSON.stringify(content))
  }
}
