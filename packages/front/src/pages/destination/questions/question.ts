import { OneWayTripCard } from '@/front/src/models/one-way-trip-card'
import { RenderFunction } from '@/shared/src/misc/type-helpers'

export abstract class Question {
  constructor(public readonly trip: OneWayTripCard) {}

  public abstract get id(): string
  public abstract get question(): RenderFunction
  public abstract get answer(): RenderFunction

  public get skip(): boolean {
    return false
  }
}
