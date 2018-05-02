
export const FETCH_TASKS = 'FETCH_TASKS'
export const REQUEST_TASKS = 'REQUEST_TASKS'
export const RECEIVE_TASKS = 'RECEIVE_TASKS'
export const RECEIVE_FAIL_TASKS = 'RECEIVE_FAIL_TASKS'

export const TASK_ADD = 'TASK_ADD'
export const TASK_ADD_REQUEST = 'TASK_ADD_REQUEST'
export const TASK_ADD_DONE = 'TASK_ADD_DONE'
export const TASK_ADD_FAIL = 'TASK_ADD_FAIL'

export const TASK_EDIT = 'TASK_EDIT'
export const TASK_EDIT_REQUEST = 'TASK_EDIT_REQUEST'
export const TASK_EDIT_DONE = 'TASK_EDIT_DONE'
export const TASK_EDIT_FAIL = 'TASK_EDIT_FAIL'

export const TASK_PREVIEW = 'TASK_PREVIEW'


export const fetchTasks = (params) => ({ type: FETCH_TASKS, params })

export const requestTasks = () => ({ type: REQUEST_TASKS })

export const receiveTasks = (data) => ({ type: RECEIVE_TASKS, ...data, receivedAt: Date.now(), })

export const receiveFailTasks = (error) => ({ type: RECEIVE_FAIL_TASKS, error, })


export const addTask = (task) => ({ type: TASK_ADD, task, })

export const requestAddTask = (task) => ({ type: TASK_ADD_REQUEST, task, })

export const receiveAddTask = (task) => ({ type: TASK_ADD_DONE, task, })

export const receiveFailAddTask = (error) => ({ type: TASK_ADD_FAIL, error, })


export const setTask = (task) => ({ type: TASK_EDIT, task, })

export const requestSetTask = (task) => ({ type: TASK_EDIT_REQUEST, task, })

export const receiveSetTask = (task) => ({ type: TASK_EDIT_DONE, task, })

export const receiveFailSetTask = (error) => ({ type: TASK_EDIT_FAIL, error, })

export const previewTask = (task) => ({ type: TASK_PREVIEW, task, })
