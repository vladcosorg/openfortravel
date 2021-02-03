import {
  Restriction,
  RestrictionStatus,
} from '@/shared/src/api/restrictions/models'

export function sortByStatusAndAlphabetically(
  collection: Restriction[],
): Restriction[] {
  const statuses = Object.values(RestrictionStatus)
  return [...collection].sort((restrictionA, restrictionB): number => {
    const statusSortResult =
      statuses.indexOf(restrictionA.status) -
      statuses.indexOf(restrictionB.status)

    if (statusSortResult !== 0) {
      return statusSortResult
    }

    return restrictionA.destinationLabel.localeCompare(
      restrictionB.destinationLabel,
    )
  })
}
