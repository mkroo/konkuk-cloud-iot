const { readFileSync, existsSync } = require('fs')
const { Credential } = require('./app/session')
const SEED_FILE_PATH = './seed.json'

const getSeedCredentials = (filePath = SEED_FILE_PATH) => {
  if (!existsSync(filePath)) return []

  const seedAccessTokens = JSON.parse(readFileSync(filePath, 'utf8'))
  return seedAccessTokens.map(accessToken => new Credential(accessToken))
}

module.exports = { getSeedCredentials }
