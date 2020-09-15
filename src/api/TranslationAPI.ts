import axios from 'axios'
import { transform, capitalize, trim } from 'lodash'

type obj = Record<string, string>
type recobj = Record<string, obj | string>
type TranslationAPIResponse = {
  data: { translations: { translatedText: string }[] }
}
export async function translate(input: recobj, targetLanguage: string) {
  const params = new URLSearchParams({
    q: encode(input),
    target: targetLanguage,
    format: 'text',
    key: 'AIzaSyAfFKXuPwwnrNwzPZuynAMPyd88AmLWsOg',
  })

  const response = await axios.post<TranslationAPIResponse>(
    'https://translation.googleapis.com/language/translate/v2',
    params,
  )
  return decode(response.data.data.translations[0].translatedText)
}

function encode(input: recobj): string {
  input = transformRecursive(
    input,
    (key) => key.toUpperCase(),
    (value) => value.toLowerCase(),
  )
  return JSON.stringify(input)
}

function decode(input: string): recobj {
  return transformRecursive(
    JSON.parse(input),
    (key) => trim(key.toLowerCase()),
    (value) => capitalize(value),
  )
}

function isString(arg: unknown): arg is string {
  return typeof arg === 'string'
}

function transformRecursive<T extends recobj>(
  input: T,
  keyCallback: { (key: string): string },
  valueCallback?: { (value: string): string },
): recobj {
  return transform(input, function (result: T, val, key) {
    if (isString(val)) {
      if (valueCallback) {
        val = valueCallback(val)
      }
      val = trim(val)
    } else {
      val = transformRecursive(val, keyCallback)
    }

    result[keyCallback(key)] = val
  })
}
