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
  const initialAccessTokens = [
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM1JYUVAiLCJzdWIiOiJCWlBHR0IiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJlY2cgcnNldCByb3h5IHJudXQgcnBybyByc2xlIHJjZiByYWN0IHJyZXMgcmxvYyByd2VpIHJociBydGVtIiwiZXhwIjoxNzE1MDEyMDg3LCJpYXQiOjE3MTQ5ODMyODd9.k7CWvJyhXgvmgh3GVlBWRBfeM7wy6vDjg-Yob441_Kc',
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM1JYRFoiLCJzdWIiOiJCWlBHR0IiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJlY2cgcnNldCByb3h5IHJwcm8gcm51dCByc2xlIHJjZiByYWN0IHJyZXMgcmxvYyByd2VpIHJociBydGVtIiwiZXhwIjoxNzE3MjE0MjYzLCJpYXQiOjE3MTQ2MjIyNjN9.q47M3d28ZEcCGPu1Xr2m4aNPPWVUjse-R3I8xOh9EtQ',
  ]

  const credentials = initialAccessTokens.map(cacheCredential)
  credentials.forEach(createSubscription)
}

migrateCredentials()

app.listen(app.get('port'), app.get('host'), () => {
  console.info('Server is running on http://%s:%d', app.get('host'), app.get('port'))
})
