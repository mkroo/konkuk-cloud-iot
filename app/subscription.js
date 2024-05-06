const nodeSchedule = require('node-schedule')
const MessageQueue = require('./messageQueue')
const { fetchLeaderboards } = require('./service')

const subscriptions = {}

const createSubscription = (credential) => {
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

  const job = subscriptions[userId]

  if (job) {
    job.cancel()
    delete subscriptions[userId]
  }
}

module.exports = { createSubscription, removeSubscription }
