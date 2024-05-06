const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const { createSubscription } = require('./app/subscription')
const { cacheCredential } = require('./app/session')

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

const migrateCredentials = () => {
  const initialAccessTokens = []

  const credentials = initialAccessTokens.map(cacheCredential)
  credentials.forEach(createSubscription)
}

migrateCredentials()

app.listen(app.get('port'), app.get('host'), () => {
  console.info('Server is running on http://%s:%d', app.get('host'), app.get('port'))
})
