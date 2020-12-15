import {generateID, generateIDFromEntity} from 'src/api/subscriptions/common'
import {PlainSubscription} from 'src/api/subscriptions/models'
import {getCountryCodes} from 'src/modules/country-list/country-list-helpers';

export async function persistSubscription(
  subscription: PlainSubscription,
): Promise<void> {
  const {subscriptionCollection} = await import('src/misc/firebase')
  await subscriptionCollection
    .doc(generateIDFromEntity(subscription))
    .set(subscription, {merge: true})
}

export async function persistSubscriptionCollection(
  subscriptionsCollection: PlainSubscription[],
): Promise<void> {
  const {subscriptionCollection, firestore} = await import('src/misc/firebase')
  const batch = firestore.batch()
  for (const subscription of subscriptionsCollection) {
    batch.set(
      subscriptionCollection.doc(generateIDFromEntity(subscription)),
      subscription,
      {
        merge: true,
      },
    )
  }

  await batch.commit()
}

export async function persistOriginSubscription(originCode: string, email: string) {
  const {subscriptionCollection, firestore, firebase} = await import('src/misc/firebase')
  const batch = firestore.batch()
  for (const destinationCode of getCountryCodes()) {
    batch.set(
      subscriptionCollection.doc(generateID(originCode, destinationCode)),
      {
        emails: firebase.firestore.FieldValue.arrayUnion(email) as unknown as string[]
      },
      {
        merge: true,
      },
    )
  }
  await batch.commit()
}
