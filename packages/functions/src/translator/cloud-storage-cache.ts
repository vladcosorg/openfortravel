import { Storage } from '@google-cloud/storage'
import { CacheType } from 'vue-auto-i18n'

const storage = new Storage()
const bucket = storage.bucket('translation-cache')

export class CloudStorageCache implements CacheType {
  async has(key: string): Promise<boolean> {
    return (await bucket.file(key).exists())[0]
  }
  async get<T>(key: string): Promise<T | undefined> {
    const [contents] = await bucket.file(key).download()
    return JSON.parse(contents.toString())
  }
  async set(key: string, content: unknown): Promise<void> {
    await bucket.file(key).save(JSON.stringify(content))
  }
}
