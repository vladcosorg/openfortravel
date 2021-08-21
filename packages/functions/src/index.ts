import firebase from 'firebase-admin'

import { safetyLevelCalculatorJob } from './cdc-scraper'
import { countryAggregator, countryLastUpdated } from './country-aggregator'
import { emailForwarder } from './email-forwarder'
import { restrictionBuilder } from './restriction-builder'
import { statsAggregatorJob } from './stats-aggregator'
import { translate } from './translator/translator'

firebase.initializeApp()

// eslint-disable-next-line import/no-unused-modules
export {
  translate,
  restrictionBuilder,
  safetyLevelCalculatorJob,
  countryAggregator,
  countryLastUpdated,
  statsAggregatorJob,
  emailForwarder,
}
