
export interface SubscriptionDocument {
  emails?: string[]
  origin?: string
  destination?: string
}

export type PlainSubscription = Required<SubscriptionDocument>

export const defaults: PlainSubscription = {
  emails: [],
  origin: 'us',
  destination: 'us',
}

export class Subscription implements SubscriptionDocument {
  public readonly origin!: string
  public readonly destination!: string
  public readonly emails!:string[]

  constructor(document: PlainSubscription) {
    Object.assign(this, document)
  }


  public toPlainObject(): PlainSubscription {
    return { ...this }
  }
}
