import { Restriction } from '@/shared/src/api/restrictions/models'
import { useVueI18n } from '@/shared/src/composables/use-plugins'

export function getShortDescription(
  restriction: Restriction,
  returning = false,
): string {
  return [
    useVueI18n().t(`description.intro.${returning ? 'return' : 'travel'}`, {
      origin: restriction.originLabel,
      destination: restriction.destinationLabel,
    }),
    useVueI18n().t(`description.status.${restriction.status}`),
  ].join(' ')
}

export function getFullDescription(
  restriction: Restriction,
  returning = false,
): string {
  return (
    getShortDescription(restriction, returning) +
    [
      useVueI18n().t(`description.testing.${restriction.testRequired}`),
      useVueI18n().t(`description.insurance.${restriction.insuranceRequired}`),
    ].join(' ')
  )
}
