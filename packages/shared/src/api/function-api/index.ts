import { useKy } from '@/shared/src/composables/use-plugins'
import { IncompleteEncodedNodeCollection } from '@/shared/src/restriction-tree/converter'

export async function fetchDetailedRestrictions(
  destinationISO: string,
): Promise<IncompleteEncodedNodeCollection> {
  return await useKy()
    .get(
      `${process.env.CLOUD_FUNCTIONS_URL}/api/restrictions/${destinationISO}/details`,
    )
    .json()
}
