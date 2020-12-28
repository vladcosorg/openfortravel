import * as functions from 'firebase-functions'

import { recalculateSafetyLevels } from '@/functions/src/safety-level-calculator'

export const safetyLevelCalculatorJob = functions.pubsub
  .schedule('every 48 hours')
  .onRun(async () => {
    await recalculateSafetyLevels()
    return
  })
