import React, { Component }             from 'react';
import { Provider }                 from 'react-redux';
// import { Router, Route }            from 'preact-router'
// import {
//     syncHistoryWithStore,
//     routerReducer
// }                                   from 'preact-router-redux'
import App                          from './components/app';

import { configureStore } from './store/configureStore-ENV_TARGET';

const store = configureStore();

export default class Root extends Component {
  render() {

    // const { store, history } = this.props;
    // const preactHistory = syncHistoryWithStore(history, store)
    return (
        <Provider store={store}>
            <App
              // history={preactHistory}
            />
        </Provider>
    );
  }
}
