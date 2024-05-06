const { default: axios } = require('axios')

const dataServerAxios = axios.create({ baseURL: process.env.DATA_SERVER_URL })

const fetchHealthMetric = async (credential) => {
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
  const userId = credential.userId
  const accessToken = credential.accessToken

  const response = await dataServerAxios.get('/', { params: { accessToken, userId, date: yesterday } })

  return JSON.parse(response.data)
}

module.exports = { fetchHealthMetric }
