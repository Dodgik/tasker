/* eslint-disable no-constant-condition */

import { take, put, call, fork, select, takeEvery } from 'redux-saga/effects'
import * as user_actions from '../actions/user_actions'

import api from '../api'


export function* userLogin(data) {
  yield put(user_actions.loginRequest(data.user))
  try {
    const { response, error } = yield call(api.user.login, data.user)
    if (response) {
      yield put(user_actions.receiveLoginDone(response))
    } else {
      yield put(user_actions.receiveLoginFail(error))
    }
  } catch (e) {
    yield put(user_actions.receiveLoginFail(e))
  }
}

export function* watchUserLogin() {
  yield takeEvery(user_actions.LOGIN_SEND, userLogin);
}


export function* userLogout(data) {
  yield put(user_actions.logoutRequest(data.user))
  try {
    const { response, error } = yield call(api.user.logout, data.user)
    if (response) {
      yield put(user_actions.receiveLogoutDone(response))
    } else {
      yield put(user_actions.receiveLogoutFail(error))
    }
  } catch (e) {
    yield put(user_actions.receiveLogoutFail(e))
  }
}

export function* watchUserLogout() {
  yield takeEvery(user_actions.LOGOUT_SEND, userLogout);
}


export default function* root() {
  yield fork(watchUserLogin)
  yield fork(watchUserLogout)
}
