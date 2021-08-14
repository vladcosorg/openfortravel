import firebase from 'firebase-admin'

import { emailForwarder } from '@/functions/src/email-forwarder'

import { api } from './api'
import { safetyLevelCalculatorJob } from './cdc-scraper'
import { countryAggregator, countryLastUpdated } from './country-aggregator'
import { restrictionBuilder } from './restriction-builder'
import { statsAggregatorJob } from './stats-aggregator'
import { translate } from './translator/translator'

firebase.initializeApp()

export {
  translate,
  restrictionBuilder,
  safetyLevelCalculatorJob,
  countryAggregator,
  countryLastUpdated,
  statsAggregatorJob,
  emailForwarder,
  api,
}
