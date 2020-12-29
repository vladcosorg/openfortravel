import * as functions from 'firebase-functions'

import { runScraper } from '@/functions/src/cdc-scraper'

export const safetyLevelCalculatorJob = functions.pubsub
  .schedule('every 48 hours')
  .onRun(async () => {
    await runScraper()
    return
  })
