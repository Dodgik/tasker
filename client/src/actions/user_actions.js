
export const LOGIN_SEND = 'LOGIN_SEND'
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_DONE = 'LOGIN_DONE'
export const LOGIN_FAIL = 'LOGIN_FAIL'

export const LOGOUT_SEND = 'LOGOUT_SEND'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_DONE = 'LOGOUT_DONE'
export const LOGOUT_FAIL = 'LOGOUT_FAIL'


export const loginSend = (user) => ({ type: LOGIN_SEND, user })
export const loginRequest = (user) => ({ type: LOGIN_REQUEST, user })
export const receiveLoginDone = (user) => ({ type: LOGIN_DONE, user })
export const receiveLoginFail = (error) => ({ type: LOGIN_FAIL, error })

export const logoutSend = (user) => ({ type: LOGOUT_SEND, user })
export const logoutRequest = (user) => ({ type: LOGOUT_REQUEST, user })
export const receiveLogoutDone = (user) => ({ type: LOGOUT_DONE, user })
export const receiveLogoutFail = (error) => ({ type: LOGOUT_FAIL, error })
