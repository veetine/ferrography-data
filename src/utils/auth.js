import Cookies from 'js-cookie'
import localStore from '@/utils/localStore'
console.log(localStore)
const TokenKey = 'access_token'

export function getToken() {
  return localStore.get_token(TokenKey)
}

export function setToken(token) {
  localStore.set_token(token)
}

export function removeToken() {
  return localStore.set_token(null)
}
