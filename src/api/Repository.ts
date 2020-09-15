import { axiosAPI } from 'boot/axios'
import { Country } from 'components/models'

export async function fetchOneCountry(id: number): Promise<Country> {
  const response = await axiosAPI(`/countries/${id}`)
  return response.data
}

export async function fetchOneCountryByCode(code: string): Promise<Country> {
  const response = await axiosAPI(`/countries?code=${code}`)
  return response.data[0]
}

export async function fetchAllCountries(): Promise<Country[]> {
  const response = await axiosAPI('/countries')
  return response.data
}
