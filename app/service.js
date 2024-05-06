const { fetchHealthMetric } = require('./fitbit')
const { getTotalCredentials } = require('./session')
const { aggregateHikingMetrics }  = require('./aggregate')

const fetchLeaderboards = async () => {
  const credentials = getTotalCredentials()

  const metrics = await Promise.all(credentials.map((credential) => fetchHealthMetric(credential)))

  return metrics.map((metric) => aggregateHikingMetrics(metric.userId, metric.date, metric.metrics))
}

module.exports = { fetchLeaderboards }
