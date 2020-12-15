import type firebase from 'firebase/app'
import pick from 'lodash/pick'

import {
  PlainSubscription,
  Subscription,
  defaults,
  SubscriptionDocument,
} from 'src/api/subscriptions/models'

export function generateIDFromEntity(subscription: PlainSubscription): string {
  return generateID(subscription.origin, subscription.destination)
}

export function generateID(
  originCode: string,
  destinationCode: string,
): string {
  return `${originCode}${destinationCode}`
}

export const dataConverter: firebase.firestore.FirestoreDataConverter<PlainSubscription> = {
  toFirestore(subscription: PlainSubscription): SubscriptionDocument {
    if (subscription instanceof Subscription) {
      subscription = subscription.toPlainObject()
    }
    return subscription
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot<SubscriptionDocument>,
    options: firebase.firestore.SnapshotOptions,
  ): PlainSubscription {
    return Object.assign(
      {},
      defaults,
      pick(snapshot.data(options), Object.keys(defaults)),
    )
  },
}
