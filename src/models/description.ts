import { Restriction } from 'src/api/restrictions/models'
import { t } from 'src/boot/i18n'

export function getShortDescription(
  restriction: Restriction,
  returning = false,
): string {
  return [
    t(`description.intro.${returning ? 'return' : 'travel'}`, {
      origin: restriction.originLabel,
      destination: restriction.destinationLabel,
    }),
    t(`description.status.${restriction.status}`),
  ].join(' ')
}

export function getFullDescription(
  restriction: Restriction,
  returning = false,
): string {
  return (
    getShortDescription(restriction, returning) +
    [
      t(`description.testing.${restriction.testRequired}`),
      t(`description.insurance.${restriction.insuranceRequired}`),
    ].join(' ')
  )
}
