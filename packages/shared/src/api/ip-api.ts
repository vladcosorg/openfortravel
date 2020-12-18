import axios from 'axios'

export async function fetchCurrentCountryCode(): Promise<string> {
  const response = await axios.get<{ country_code: string }>(
    'https://api.ipdata.co?api-key=d7e6b4605424e5ae000386de7ab7408394c12b8395408051fbcaec80',
  )
  return response.data['country_code'].toLowerCase()
}
