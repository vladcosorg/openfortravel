import ky from 'ky-universal'

export async function fetchCurrentCountryCode(ip: string): Promise<string> {
  const response = await ky(
    `https://api.ipdata.co/${ip}?api-key=d7e6b4605424e5ae000386de7ab7408394c12b8395408051fbcaec80`,
  ).json<{ country_code: string }>()
  return response['country_code'].toLowerCase()
}
