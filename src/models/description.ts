import { Restriction } from 'src/api/restrictions/models'
import { t } from 'src/boot/i18n'

export function getShortDescription(restriction: Restriction): string {
  return [
    t('description.intro', {
      origin: restriction.originLabel,
      destination: restriction.destinationLabel,
    }),
    t(`description.status.${restriction.status}`),
  ].join('')
}

export function getFullDescription(restriction: Restriction): string {
  return (
    getShortDescription(restriction) +
    [
      t(`description.testing.${restriction.testRequired}`),
      t(`description.insurance.${restriction.insuranceRequired}`),
    ].join('')
  )
}
