import { h, Component }             from 'preact';
import { Provider }                 from 'preact-redux';
import { Router, Route }            from 'preact-router'
import {
    syncHistoryWithStore,
    routerReducer
}                                   from 'preact-router-redux'
import App                          from '../components/app';

export default class Root extends Component {
  render() {
    const { store, history } = this.props;
    const preactHistory = syncHistoryWithStore(history, store)
    return (
        <Provider store={store}>
            <App history={preactHistory}/>
        </Provider>
    );
  }
}
