import { serverCache } from '@/front/src/misc/server-cache'
import { useKy } from '@/shared/src/composables/use-plugins'
import {
  RawCountryFactsheetMap,
  RawCountryFactsheet,
} from '@/shared/src/models/country-factsheet/raw-country-factsheet'
import { createRawCountryFactsheetMap } from '@/shared/src/models/country-factsheet/raw-factory'

export async function fetchAllCountryFactsheets(): Promise<RawCountryFactsheetMap> {
  return serverCache.destinations
    ? createRawCountryFactsheetMap(serverCache.destinations)
    : await useKy()
        .get(`${process.env.CLOUD_FUNCTIONS_URL}/api/country-factsheets`)
        .json()
}
export async function fetchCountryFactsheet(
  destinationISO: string,
): Promise<RawCountryFactsheet> {
  return await useKy()
    .get(
      `${process.env.CLOUD_FUNCTIONS_URL}/api/country-factsheets/${destinationISO}`,
    )
    .json()
}
