import { Restriction } from '@/front/src/models/restriction'
import { getI18nInstance } from '@/shared/src/composables/use-plugins'

export function getShortDescription(
  restriction: Restriction,
  returning = false,
): string {
  return [
    getI18nInstance().t(
      `description.intro.${returning ? 'return' : 'travel'}`,
      {
        origin: restriction.originLabel,
        destination: restriction.destinationLabel,
      },
    ),
    getI18nInstance().t(`description.status.${restriction.status}`),
  ].join(' ')
}

export function getFullDescription(
  restriction: Restriction,
  returning = false,
): string {
  return (
    getShortDescription(restriction, returning) +
    [
      getI18nInstance().t(`description.testing.${restriction.testRequired}`),
      getI18nInstance().t(
        `description.insurance.${restriction.insuranceRequired}`,
      ),
    ].join(' ')
  )
}
