import {
  outlinedBallot as declarationIcon,
  outlinedCoronavirus as testIcon,
  outlinedHttps as houseIcon,
  outlinedLocalPolice as borderIcon,
  outlinedMedicalServices as insuranceIcon,
} from '@quasar/extras/material-icons-outlined'
import { LocaleMessages } from 'vue-i18n'

import { Destination } from '@/shared/src/api/destinations/models'
import {
  Restriction,
  RestrictionStatus,
} from '@/shared/src/api/restrictions/models'
import { useVueI18n } from '@/shared/src/composables/use-plugins'

type SummaryItem = {
  label: string | LocaleMessages
  value: string | LocaleMessages
  caption: string | LocaleMessages
  icon: string
  valueClasses?: string
}
export function getSummaryItems(
  restriction: Restriction,
  destination: Destination,
): SummaryItem[] {
  const { t } = useVueI18n()
  const statusMap = {
    [RestrictionStatus.ALLOWED]: '',
    [RestrictionStatus.CONDITIONAL]: 'text-warning',
    [RestrictionStatus.FORBIDDEN]: 'text-negative',
    [RestrictionStatus.ALLOWED_SOON]: 'text-info',
  }

  return [
    {
      label: t('restriction.travel.label'),
      value: t(`restriction.travel.value.${restriction.status}`),
      caption: 'No additional requirements at the border',
      icon: borderIcon,
      valueClasses: statusMap[restriction.status],
    },
    {
      label: t('restriction.testing.label'),
      value: t(`restriction.testing.value.${restriction.testRequired}`),
      caption: [
        t(`restriction.testing.caption.pcr.${restriction.testRequired}`, {
          hrs: destination.testValidityInHours,
        }),
        t(
          `restriction.testing.caption.proof.${
            destination.proofOfRecoveryInDays > 0
          }`,
          {
            days: destination.proofOfRecoveryInDays,
          },
        ),
      ].join(' '),
      valueClasses: restriction.testRequired ? 'text-negative' : '',
      icon: testIcon,
    },
    {
      label: t('restriction.insurance.label'),
      value: t(`restriction.insurance.value.${restriction.insuranceRequired}`),
      caption: 'No additional requirements at the border',
      icon: insuranceIcon,
      valueClasses: restriction.insuranceRequired ? 'text-negative' : '',
    },
    {
      label: t('restriction.healthDeclaration.label'),
      value: t(
        `restriction.healthDeclaration.value.${
          destination.isHealthDeclarationRequired ? 'true' : 'false'
        }`,
      ),
      caption: t(
        `restriction.healthDeclaration.caption.${destination.isHealthDeclarationRequired}`,
      ),
      icon: declarationIcon,
    },
    {
      label: t('restriction.selfIsolation.label'),
      value: restriction.selfIsolation
        ? t('restriction.selfIsolation.days', {
            number: destination.selfIsolationInDays,
          })
        : t('restriction.selfIsolation.staticValue.false'),
      caption: 'No additional requirements at the border',
      icon: houseIcon,
      valueClasses: restriction.selfIsolation ? 'text-negative' : 'text-info',
    },
  ]
}
