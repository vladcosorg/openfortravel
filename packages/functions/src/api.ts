import cors from 'cors'
import express from 'express'
import * as functions from 'firebase-functions'

const app = express()
app.use(cors({ origin: true }))
app.get('/', (_req, res) => res.status(200).send('good'))
export const api = functions.https.onRequest(app)
