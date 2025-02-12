import Cookies from 'js-cookie'
const TokenKey = 'authToken'
// var inFifteenMinutes = new Date(new Date().getTime() + 120 * 60 * 1000);
export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token, { expires: 1 })
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}
