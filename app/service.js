const { fetchHealthMetric } = require('./fitbit')
const { getTotalCredentials } = require('./session')
const { aggregateHikingMetrics }  = require('./aggregate')

const fetchLeaderboards = async () => {
  const credentials = getTotalCredentials()

  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
  const metrics = await Promise.all(
    credentials.map(async (credential) => {
      return {
        userId: credential.userId,
        date: yesterday,
        metrics: await fetchHealthMetric(credential, yesterday)
      }
    })
  )

  return metrics.map((metric) => aggregateHikingMetrics(metric.userId, metric.date, metric.metrics))
}

const fetchHikingMetrics = async (userId, date) => {
  const totalMetrics = await fetchLeaderboards()

  let pipeline = JSON.parse(JSON.stringify(totalMetrics))
  
  if (userId) pipeline = pipeline.filter((metric) => metric.userId === userId)
  if (date) pipeline = pipeline.filter((metric) => metric.date === date)

  return pipeline
}

module.exports = { fetchLeaderboards, fetchHikingMetrics }
