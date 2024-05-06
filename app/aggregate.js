const distanceActivities = new Set([
  'total',
  'veryActive',
  'moderatelyActive',
  'lightlyActive',
  'sedentaryActive',
])

const sumOfElements = (arr, key)  => arr.reduce((acc, elem) => acc + elem[key], 0)

const aggregateHikingMetrics = (userId, date, metrics) => {
  const hikingActivities = metrics.activities || []

  const totalCalories = sumOfElements(hikingActivities, 'calories')
  const totalSteps = sumOfElements(hikingActivities, 'steps')
  const totalDuration = sumOfElements(hikingActivities, 'duration')

  const distances = metrics.summary?.distances || []
  const targetDistances = distances.filter((distanceMetric) => distanceActivities.has(distanceMetric.activity))
  const distance = targetDistances.reduce((acc, distanceMetric) => {
    acc[distanceMetric.activity] = distanceMetric.distance

    return acc
  }, {})

  return {
    userId,
    date,
    calories: { total: totalCalories },
    steps: { total: totalSteps },
    duration: { total: totalDuration },
    distance,
  }
}

module.exports = { aggregateHikingMetrics }
