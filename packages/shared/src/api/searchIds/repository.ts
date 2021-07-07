import { getDoc, doc, query, where, getDocs, addDoc } from 'firebase/firestore'

import { searchIdCollection } from '@/shared/src/misc/firebase'
import { VisitorProfile } from '@/shared/src/restriction-tree/visitor-profile'

export async function getContextBySearchId(
  id: string,
): Promise<Partial<VisitorProfile>> {
  const snapshot = await getDoc(doc(searchIdCollection, id))
  if (!snapshot.exists()) {
    throw new Error(`Search id ${id} does not exist`)
  }
  return snapshot.data().context
}

export async function findIdByData(
  context: Partial<VisitorProfile>,
): Promise<string | undefined> {
  const q = query(searchIdCollection, where('context', '==', context))
  const result = await getDocs(q)
  return result.docs.shift()?.id
}

export async function createSearchIdWithData(
  context: Partial<VisitorProfile>,
): Promise<string> {
  const docRef = await addDoc(searchIdCollection, { context })
  return docRef.id
}

export async function getOrCreateSearchId(
  context: Partial<VisitorProfile>,
): Promise<string> {
  return (
    (await findIdByData(context)) ?? (await createSearchIdWithData(context))
  )
}
