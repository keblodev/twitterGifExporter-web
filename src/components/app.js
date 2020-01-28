import React from 'react';
import Header from './header';

import style from './style.less';

import Home from './home';

export default function({history}) {
    return (
      <div id="app">
        <div className={[
            style.appContainer,
        ].join(' ')}>
          <Header />
          <Home path="/" />
        </div>
      </div>
    );
  }
