import { Destination } from 'src/api/destinations'
import { t } from 'src/boot/i18n'
import { Origin } from 'src/models/origin'

export function getShortDescription(
  origin: Origin,
  destination: Destination,
): string {
  return [
    t('description.intro', {
      origin: origin.countryLabel,
      destination: destination.countryLabel,
    }),
    t(`description.status.${destination.status}`),
  ].join('')
}

export function getFullDescription(
  origin: Origin,
  destination: Destination,
): string {
  return (
    getShortDescription(origin, destination) +
    [t(`description.testing.${destination.testRequired}`)].join('')
  )
}
