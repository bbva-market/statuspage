import SettingsStore from 'db/settings'
import { ValidationError } from 'utils/errors'

const settingsKeyServiceName = 'ServiceName'
const settingsKeyStatusPageURL = 'StatusPageURL'
const settingsKeyAdminPageURL = 'AdminPageURL'

// InvocationURL, UserPoolID, ClientID are bootstrap set. Do not store here.

export class Settings {
  constructor () {
    this.store = new SettingsStore()
  }

  validateURL (url) {
    // eslint-disable-next-line no-useless-escape, max-len
    return url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g) !== null
  }

  async getServiceName () {
    return await this.store.get(settingsKeyServiceName)
  }

  async setServiceName (value) {
    return await this.store.set(settingsKeyServiceName, value)
  }

  async getStatusPageURL () {
    return await this.store.get(settingsKeyStatusPageURL)
  }

  async setStatusPageURL (value) {
    if (!this.validateURL(value)) {
      throw new ValidationError('invalid url')
    }
    return await this.store.set(settingsKeyStatusPageURL, value)
  }

  async getAdminPageURL () {
    return await this.store.get(settingsKeyAdminPageURL)
  }

  async setAdminPageURL (value) {
    if (!this.validateURL(value)) {
      throw new ValidationError('invalid url')
    }
    return await this.store.set(settingsKeyAdminPageURL, value)
  }
}
