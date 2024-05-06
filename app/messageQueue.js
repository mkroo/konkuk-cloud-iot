const mqtt = require('mqtt')
const client = mqtt.connect(process.env.MQTT_BROKER_URL)

client.on('connect', () => console.debug('Connected to MQTT broker'))
client.on('error', (err) => console.error('Error occurred:', err))

const messageQueueLogger = {
  log: (...arguments) => console.log(`[${new Date().toISOString()}]`, '[MessageQueue]', ...arguments),
  debug: (...arguments) => console.debug(`[${new Date().toISOString()}]`, '[MessageQueue]', ...arguments),
}

const publish = async (topic, payload) => {
  messageQueueLogger.log('Publishing to topic:', topic)
  messageQueueLogger.debug('Payload:', JSON.stringify(payload))
  
  await client.publishAsync(topic, JSON.stringify(payload))
}

module.exports = { publish }
