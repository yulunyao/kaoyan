export default {
  get(key) {
    if (!key) {
      return null
    }
    return localStorage.getItem(key)
  },
  set(key, val) {
    if (!key) {
      return null
    }
    localStorage.setItem(key, val)
  },
  remove(key) {
    if (!key) {
      return null
    }
    localStorage.removeItem(key)
  },
}
