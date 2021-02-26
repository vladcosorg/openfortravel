import { DestinationObject } from '@/front/src/pages/destination/destination-object'
import { Destination } from '@/shared/src/api/destinations/models'
import { Restriction } from '@/shared/src/api/restrictions/models'

export abstract class Question {
  constructor(
    protected readonly restriction: Restriction,
    protected readonly destination: Destination,
    protected readonly destinationObject: DestinationObject,
  ) {}

  public get id(): string | undefined {
    return
  }
  public abstract get question(): string
  public abstract get answer(): string
}
