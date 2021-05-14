import { query, where, getDocs } from 'firebase/firestore'

import type { PlainRestriction } from '@/shared/src/api/restrictions/models'
import { restrictionCollection } from '@/shared/src/misc/firebase'

export async function findRestrictionsByOrigin(
  originCode: string,
): Promise<PlainRestriction[]> {
  const q = query(restrictionCollection, where('origin', '==', originCode))
  const results = await getDocs(q)
  return results.docs.map((snapshot) => snapshot.data())
}
