import firebase from 'firebase-admin'

firebase.initializeApp()
import { api } from './api/api'
import { safetyLevelCalculatorJob } from './cdc-scraper'
import { countryAggregator, countryLastUpdated } from './country-aggregator'
import { emailForwarder } from './email-forwarder'
import { restrictionBuilder } from './restriction-builder'
import { statsAggregatorJob } from './stats-aggregator'
import { translate } from './translator/translator'
import { warmer, warmerPubsub } from './warmer'

// eslint-disable-next-line import/no-unused-modules
export {
  warmer,
  warmerPubsub,
  api,
  translate,
  restrictionBuilder,
  safetyLevelCalculatorJob,
  countryAggregator,
  countryLastUpdated,
  statsAggregatorJob,
  emailForwarder,
}
