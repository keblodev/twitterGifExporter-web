import {
    createStore,
    compose,
    combineReducers,
    applyMiddleware,
}                               from 'redux';
// import {
//     routerReducer,
// }                               from 'preact-router-redux'
import persistState             from 'redux-localstorage'
import thunk                    from 'redux-thunk';
// import createBrowserHistory     from 'history/createBrowserHistory'

import rootReducer              from '../reducers';
import middleware               from '../middleware';
import { LOCAL_STORE_KEY } from '../statics/config';

// Create a history of your choosing (we're using a browser history in this case)
// export const history = createBrowserHistory();

const composeEnhancers = (typeof window !== `undefined` && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const enhancer = composeEnhancers(
    //todo: it lifts the state
    //and currently we monitor entire app state
    persistState(
        'twitterAppRoot',
        {
            key: LOCAL_STORE_KEY
        }
    ),
    applyMiddleware(
        thunk,
        ...middleware,
    )
);

export function configureStore(initialState) {
    const store = createStore(
        combineReducers({
            twitterAppRoot: rootReducer,
            // routing: routerReducer
        }),
        initialState,
        enhancer
    );

    if (module.hot) {
        module.hot.accept('../reducers', () =>
            store.replaceReducer(require('../reducers').default)
        );
    }

    return store;
}