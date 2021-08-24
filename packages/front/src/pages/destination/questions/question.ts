import { CountryFactsheet } from '@/shared/src/api/destinations/country-factsheet'
import { RenderFunction } from '@/shared/src/misc/type-helpers'
import { RestrictionGroupCollection } from '@/shared/src/restriction-tree/restriction-group'

export abstract class Question {
  public readonly optimalRestrictionGroup
  constructor(
    public readonly originFactsheet: CountryFactsheet,
    public readonly destinationFactsheet: CountryFactsheet,
    public readonly restrictions: RestrictionGroupCollection,
    public readonly returning: boolean = false,
  ) {
    this.optimalRestrictionGroup = restrictions.getBestGroup()
  }

  public abstract get id(): string
  public abstract get question(): RenderFunction
  public abstract get answer(): RenderFunction

  public get skip(): boolean {
    return false
  }
}
