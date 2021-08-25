export enum RiskLevel {
  NO_DATA = 'no-data',
  LOW = 'low',
  MODERATE = 'moderate',
  HIGH = 'high',
  VERY_HIGH = 'very-high',
}

export const factsheetDefaults = {
  infoLink: '',

  riskLevel: RiskLevel.NO_DATA,
  thisWeekCasesPer100K: 0,
  lastWeekCasesPer100K: 0,

  maskRestrictions: undefined as undefined | 'public' | 'public-enclosed',
  restaurantRestrictions: undefined as
    | undefined
    | 'closed'
    | 'open-with-restrictions',
  barRestrictions: undefined as undefined | 'closed' | 'open-with-restrictions',
}
export type FactsheetCountryDocument = Partial<
  Readonly<typeof factsheetDefaults>
>
export type MappedFactsheetCountryCollection = Record<
  string,
  FactsheetCountryDocument
>

export interface RawCountryFactsheet
  extends Readonly<typeof factsheetDefaults> {
  countryCode: string
}

export type RawCountryFactsheetMap = Record<string, RawCountryFactsheet>

let defaults: Array<keyof typeof factsheetDefaults>
export function getRawFactsheetFields(): Array<keyof typeof factsheetDefaults> {
  if (!defaults) {
    defaults = Object.keys(factsheetDefaults) as Array<
      keyof typeof factsheetDefaults
    >
  }

  return defaults
}
