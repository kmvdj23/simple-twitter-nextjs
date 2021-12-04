import nookies from "nookies"

class customStorage {
  constructor() {}
  static getItem(name) {
    return nookies.get(null)[name]
  }
  static setItem(name, value) {
    nookies.set(null, name, value)
  }
  static removeItem(name) {
    return nookies.destroy(null, name)
  }
}

export default customStorage
