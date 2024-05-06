const jwt = require('jsonwebtoken')

class InMemoryStorage {
  constructor() {
    this.storage = {}
  }

  get(key) {
    return this.storage[key]
  }

  set(key, value) {
    this.storage[key] = value

    return value
  }

  totalKeys() {
    return Object.keys(this.storage)
  }

  totalValues() {
    return Object.values(this.storage)
  }

  remove(key) {
    const value = this.get(key)
    delete this.storage[key]

    return value
  }
}

class Credential {
  constructor(accessToken) {
    this.accessToken = accessToken
  }

  get userId() {
    return jwt.decode(this.accessToken).sub
  }

  get expiresAt() {
    new Date(jwt.decode(this.accessToken).exp * 1000)
  }

  isExpired() {
    this.expiresAt < new Date()
  }
}

const storage = new InMemoryStorage()

const cacheCredential = (accessToken) => {
  const credential = new Credential(accessToken)

  storage.set(credential.userId, credential.accessToken)

  return credential
}

const getCredential = (userId) => {
  const accessToken = storage.get(userId)

  if (isTokenExpired(accessToken)) {
    storage.remove(userId)
    return { userId, accessToken: null }
  }

  return new Credential(accessToken)
}

const getTotalCredentials = () => {
  return storage.totalValues().map((accessToken) => new Credential(accessToken))
}

module.exports = { cacheCredential, getCredential, getTotalCredentials, Credential }
