import { generateIDFromEntity } from '@/shared/src/api/restrictions/common'
import { PlainRestriction } from '@/shared/src/api/restrictions/models'
import { importFirebase } from '@/shared/src/misc/misc'

export async function persistRestriction(restriction: PlainRestriction): Promise<void> {
  const { restrictionCollection } = await importFirebase()
  await restrictionCollection
    .doc(generateIDFromEntity(restriction))
    .set(restriction, { merge: true })
}

export async function persistRestrictionCollection(
  restrictionsCollection: PlainRestriction[],
): Promise<void> {
  const { restrictionCollection, firestore } = await importFirebase()
  const batch = firestore.batch()
  for (const restriction of restrictionsCollection) {
    batch.set(restrictionCollection.doc(generateIDFromEntity(restriction)), restriction, {
      merge: true,
    })
  }

  await batch.commit()
}
