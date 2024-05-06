const { default: axios } = require('axios')

const dataServerAxios = axios.create({ baseURL: process.env.DATA_SERVER_URL })

const fetchHealthMetric = async (credential) => {
  // const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
  // const userId = credential.userId
  // const accessToken = credential.accessToken

  // const response = await dataServerAxios.post('/friends', { accessToken, userId, date: yesterday })

  // return JSON.parse(response.data)

  return { userId: 1, date: '2024-10-15', metrics: {} }
}

module.exports = { fetchHealthMetric }
