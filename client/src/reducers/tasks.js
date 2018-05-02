import * as actions from '../actions/tasks_actions'


const defaultState = {
  actionTask: {},
  preview: null,
  isFetching: false,  
  isUpdating: false,
  list: [],
  page: 1,
  sort_field: '',
  sort_direction: '',
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actions.FETCH_TASKS:
      return {
        ...state,
        ...action.params,
      };
    case actions.REQUEST_TASKS:
      return { ...state, isFetching: true };
    case actions.RECEIVE_TASKS:
      const { tasks, total_task_count } = action;
      const pageCount = Math.ceil(total_task_count / 3);
      return {
        ...state,
        isFetching: false,
        list: tasks,
        totalCount: total_task_count,
        pageCount,
        lastUpdated: action.receivedAt,
      };
    case actions.RECEIVE_FAIL_TASKS:
      return { ...state, isFetching: false };


    case actions.TASK_ADD:
      return {
        ...state,
        actionTask: { sending: true, error: false },
      };
    case actions.TASK_ADD_DONE:
      state.actionTask = { sending: false };
      state.preview = null;
      return { ...state };
    case actions.TASK_ADD_FAIL:
      state.actionTask = {
        error: action.error,
        sending: false,
      };
      return { ...state };


    case actions.TASK_EDIT:
      return {
        ...state,
        actionTask: { id: action.task.id, sending: true, error: false },
      };
    case actions.TASK_EDIT_DONE:
      state.actionTask.sending = false;
      state.list = state.list.map(function (task) {
        return task.id == action.task.id ? action.task : task;
      });
      return { ...state };
    case actions.TASK_EDIT_FAIL:
      state.actionTask = {
        id: state.actionTask.id || state.error.id,
        error: action.error,
        sending: false,
      };
      return { ...state };
      
    case actions.TASK_PREVIEW:
      return {
        ...state,
        preview: action.task,
      };

    default:
      return state;
  }
};