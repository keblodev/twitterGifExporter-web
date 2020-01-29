import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

import './style/index.less';

ReactDOM.render(<App />, document.body);

// register ServiceWorker via OfflinePlugin, for prod only:
if (process.env.NODE_ENV==='production') {
    require('./pwa');
}

// in development, set up HMR:
if (module.hot) {
    module.hot.accept('./containers/Root-ENV_TARGET', () => requestAnimationFrame(init) );
}

init();
