import React from 'react';

import { configureStore } from './store/configureStore-ENV_TARGET';
import { history } from './store/configureStore-ENV_TARGET';

const store = configureStore();

import './style/index.less';

let root;
function init() {
    let App = require('./containers/Root-ENV_TARGET').default;
    root = render(
            <App
                store={store}
                history={history}
            />
    , document.body, root);
}

// register ServiceWorker via OfflinePlugin, for prod only:
if (process.env.NODE_ENV==='production') {
    require('./pwa');
}

// in development, set up HMR:
if (module.hot) {
    module.hot.accept('./containers/Root-ENV_TARGET', () => requestAnimationFrame(init) );
}

init();
