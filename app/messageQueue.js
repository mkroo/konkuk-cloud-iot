const mqtt = require('mqtt')
const client = mqtt.connect(process.env.MQTT_BROKER_URL)

client.on('connect', () => console.debug('Connected to MQTT broker'))
client.on('error', (err) => console.error('Error occurred:', err))

const publish = async (topic, payload) => {
  console.log('[MessageQueue] Published to topic:', topic)
  console.debug('[MessageQueue] Payload:', payload)

  await client.publishAsync(topic, JSON.stringify(payload))
}

module.exports = { publish }
