import type { Destination } from '@/shared/src/api/destinations/models'
import type { Restriction } from '@/shared/src/api/restrictions/models'

export abstract class Question {
  constructor(
    protected readonly restriction: Restriction,
    protected readonly destination: Destination,
  ) {}

  public abstract get id(): string
  public abstract get question(): string
  public abstract get answer(): string

  public get skip(): boolean {
    return false
  }
}
