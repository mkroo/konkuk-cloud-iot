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

const cacheCredential = (credential) => {
  storage.set(credential.userId, credential.accessToken)

  return credential
}

const getTotalCredentials = () => {
  return storage.totalValues().map((accessToken) => new Credential(accessToken))
}

module.exports = { cacheCredential, getTotalCredentials, Credential }
