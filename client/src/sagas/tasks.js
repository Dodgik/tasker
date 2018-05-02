/* eslint-disable no-constant-condition */
import { take, put, call, fork, select, takeEvery } from 'redux-saga/effects'
import * as actions from '../actions/tasks_actions'

import api from '../api'


export function* fetchTasks(data) {
  yield put(actions.requestTasks())
  try {
    const { response, error } = yield call(api.tasks.all, data.params)
    if (response) {
      yield put(actions.receiveTasks(response))
    } else {
      yield put(actions.receiveFailTasks(error))
    }
  } catch (e) {
    yield put(actions.receiveFailTasks(e))
  }
}

export function* watchFetchTask() {
  yield takeEvery(actions.FETCH_TASKS, fetchTasks);
}



export function* addTask(data) {
  yield put(actions.requestAddTask(data.task))
  try {
    const { response, error } = yield call(api.tasks.add, data.task)
    if (response) {
      yield put(actions.receiveAddTask(response))
    } else {
      yield put(actions.receiveFailAddTask(error))
    }
  } catch (e) {
    yield put(actions.receiveFailAddTask(e))
  }
}

export function* watchAddTask() {
  yield takeEvery(actions.TASK_ADD, addTask);
}


export function* setTask(data) {
  yield put(actions.requestSetTask(data.task))
  try {
    const { response, error } = yield call(api.tasks.set, data.task)
    if (response) {
      yield put(actions.receiveSetTask(response))
    } else {
      yield put(actions.receiveFailSetTask(error))
    }
  } catch (e) {
    yield put(actions.receiveFailSetTask(e))
  }
}

export function* watchSetTask() {
  yield takeEvery(actions.TASK_EDIT, setTask);
}



export function* startup() {
  yield fork(fetchTasks, {})
}

export default function* root() {
  yield fork(startup)

  yield fork(watchFetchTask)
  yield fork(watchAddTask)
  yield fork(watchSetTask)
}
