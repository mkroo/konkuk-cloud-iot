const nodeSchedule = require('node-schedule')
const MessageQueue = require('./messageQueue')
const { fetchLeaderboards } = require('./service')
const { cacheCredential } = require('./session')

const subscriptions = {}

const createSubscription = (credential) => {
  cacheCredential(credential)
  const userId = credential.userId

  if (subscriptions[userId]) return

  const job = nodeSchedule.scheduleJob({ end: credential.expiresAt, rule: '*/5 * * * * *' }, async () => {
    const metrics = await fetchLeaderboards(credential)
      
    MessageQueue.publish(userId, metrics)
  })

  subscriptions[userId] = job
}

const removeSubscription = (credential) => {
const userId = credential.userId

  const job = findSubscription(credential)

  if (job) {
    job.cancel()
    delete subscriptions[userId]
  }
}

module.exports = { createSubscription, removeSubscription }
