import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import createSagaMiddleware from 'redux-saga'
import { AppContainer } from 'react-hot-loader';

import reducers from './reducers/index';
import App from './app';
import rootSaga from './sagas'


const initialState = window.__INITIAL_STATE__; // eslint-disable-line

const sagaMiddleware = createSagaMiddleware();
const store = {
  ...createStore(reducers, initialState, applyMiddleware(sagaMiddleware)),
  runSaga: sagaMiddleware.run,
};
store.runSaga(rootSaga);
window.store = store;


const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <BrowserRouter>
          <Component/>
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('body-wrap'),
  );
};

render(App);
