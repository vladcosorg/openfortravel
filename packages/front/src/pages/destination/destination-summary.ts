import { DeclarationSummary } from '@/front/src/pages/destination/summary-items/declaration-summary'
import { InsuranceSummary } from '@/front/src/pages/destination/summary-items/insurance-summary'
import { IsolationSummary } from '@/front/src/pages/destination/summary-items/isolation-summary'
import { StatusSummary } from '@/front/src/pages/destination/summary-items/status-summary'
import { SummaryItem } from '@/front/src/pages/destination/summary-items/summary-item'
import { TestingSummary } from '@/front/src/pages/destination/summary-items/testing-summary'
import { Destination } from '@/shared/src/api/destinations/models'
import { Restriction } from '@/shared/src/api/restrictions/models'

export function getSummaryItems(
  restriction: Restriction,
  destination: Destination,
): SummaryItem[] {
  return [
    StatusSummary,
    TestingSummary,
    IsolationSummary,
    InsuranceSummary,
    DeclarationSummary,
  ].map((item) => new item(restriction, destination))
}
