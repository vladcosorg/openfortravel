import axios from 'axios'

export async function fetchCurrentCountryCode(): Promise<string> {
  const response = await axios.get<{ countryCode: string }>(
    'http://ip-api.com/json/',
  )
  return response.data.countryCode.toLowerCase()
}
