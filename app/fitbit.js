const { default: axios } = require('axios')

const dataServerAxios = axios.create({ baseURL: process.env.DATA_SERVER_URL })

const fetchHealthMetric = async (credential, date) => {
  const userId = credential.userId
  const accessToken = credential.accessToken

  const response = await dataServerAxios.get('/', { params: { accessToken, userId, date } })

  return JSON.parse(response.data)
}

module.exports = { fetchHealthMetric }
