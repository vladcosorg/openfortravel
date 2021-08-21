import { Restriction } from '@/front/src/models/restriction'
import type { Destination } from '@/shared/src/api/destinations/models'

export type Badge = { label: string; color: string }
export abstract class SummaryItem {
  constructor(
    protected readonly restriction: Restriction,
    protected readonly destination: Destination,
  ) {}

  public abstract get label(): string

  public get valueOrEmpty(): string {
    return this.disabled ? '-' : this.value
  }
  public abstract get value(): string

  public abstract get caption(): string
  public abstract get icon(): string
  public get valueClasses(): string {
    return ''
  }
  public get badges(): Badge[] {
    return []
  }

  public get disabled(): boolean {
    return this.restriction.isForbidden
  }
}
