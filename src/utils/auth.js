import Cookies from 'js-cookie'

const TokenKey = 'hrsaas-ihrm-token'

const TimeStampKey = 'hrsaas-timestamp-key'

/* Token */
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

/* Time Stamp */
export function getTimeStamp() {
  return Cookies.get(TimeStampKey)
}

export function setTimeStamp() {
  return Cookies.set(TimeStampKey, Date.now())
}
