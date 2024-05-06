const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const { createSubscription } = require('./app/subscription')
const { cacheCredential } = require('./app/session')
const { fetchHikingMetrics } = require('./app/service')

app.set('port', process.env.PORT || 3000)
app.set('host', process.env.HOST || '0.0.0.0')

app.use(cors())
app.use(express.json({ extended: true }))

app.post('/subscriptions', async (req, res) => {
  const { accessToken } = req.body
  
  const credential = new Credential(accessToken)

  createSubscription(credential)

  res.status(200)
})

app.get('/hiking-metrics', async (req, res) => {
  const { userId, date } = req.query

  const metrics = fetchHikingMetrics(userId, date)

  res.status(200).send(metrics)
})

app.listen(app.get('port'), app.get('host'), () => {
  console.info('Server is running on http://%s:%d', app.get('host'), app.get('port'))
})

// Seed credential setting
require('./seed').getSeedCredentials()

const migrateCredentials = () => {
  const seedCredentials = require('./seed').getSeedCredentials()

  seedCredentials.forEach(cacheCredential)
  seedCredentials.forEach(createSubscription)
}

migrateCredentials()