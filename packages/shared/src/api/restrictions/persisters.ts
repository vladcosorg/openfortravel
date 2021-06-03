import { setDoc, doc, writeBatch } from 'firebase/firestore'

import { generateIDFromEntity } from '@/shared/src/api/restrictions/common'
import type { PlainRestriction } from '@/shared/src/api/restrictions/models'
import { restrictionCollection, firestore } from '@/shared/src/misc/firebase'

export async function persistRestriction(
  restriction: PlainRestriction,
): Promise<void> {
  await setDoc(
    doc(restrictionCollection, generateIDFromEntity(restriction)),
    restriction,
    { merge: true },
  )
}

export async function persistRestrictionCollection(
  restrictionsCollection: PlainRestriction[],
): Promise<void> {
  const batch = writeBatch(firestore)
  for (const restriction of restrictionsCollection) {
    batch.set(
      doc(restrictionCollection, generateIDFromEntity(restriction)),
      restriction,
      {
        merge: true,
      },
    )
  }

  await batch.commit()
}
