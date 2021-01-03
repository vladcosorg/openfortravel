import { Flavor } from '@/shared/src/misc/type-helpers'

export type CountryCode = string
export type CountryLabel = string
export type CountrySlug = string

export type CountrySlugPair = { origin: CountrySlug; destination: CountrySlug }
export type CountryList<K extends CountryCode, V = CountryLabel> = Record<K, V>
export enum CountrySlugType {
  ORIGIN = 'origin',
  DESTINATION = 'destination',
}

export type DestinationSlug = Flavor<string, 'destinationSlug'>
export type OriginSlug = Flavor<string, 'originSlug'>
