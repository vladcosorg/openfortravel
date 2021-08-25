import { defineStore } from 'pinia'

import { fetchAllCountryFactsheets } from '@/shared/src/api/function-api/country-factsheet'
import { createCountryFactsheetCollection } from '@/shared/src/models/country-factsheet/factory'
import { RawCountryFactsheetMap } from '@/shared/src/models/country-factsheet/raw-country-factsheet'

export const usePiniaRootStore = defineStore('root', {
  state: () => ({
    rawFactsheets: undefined as RawCountryFactsheetMap | undefined,
  }),
  getters: {
    countryFactsheets: (state) =>
      createCountryFactsheetCollection(state.rawFactsheets),
  },
  actions: {
    async fetchAllFactsheets() {
      if (this.rawFactsheets) {
        return
      }

      this.rawFactsheets = await fetchAllCountryFactsheets()
    },
  },
})
