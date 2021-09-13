export const continents = ['na', 'eu', 'as', 'sa', 'oc', 'af'] as const
export type ContinentsList = typeof continents
export type Continent = ContinentsList[number]
