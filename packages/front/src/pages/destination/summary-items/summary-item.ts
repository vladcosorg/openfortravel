import { Destination } from '@/shared/src/api/destinations/models'
import { Restriction } from '@/shared/src/api/restrictions/models'

export type Badge = { label: string; color: string }
export abstract class SummaryItem {
  constructor(
    protected readonly restriction: Restriction,
    protected readonly destination: Destination,
  ) {}

  public abstract get label(): string
  public abstract get value(): string
  public abstract get caption(): string
  public abstract get icon(): string
  public get valueClasses(): string {
    return ''
  }
  public get badges(): Badge[] {
    return []
  }
}
