/* eslint-disable no-constant-condition */

import { fork } from 'redux-saga/effects'

import taskSaga from './tasks'
import userSaga from './user'


export default function* root() {
  yield fork(userSaga)
  yield fork(taskSaga)
}
