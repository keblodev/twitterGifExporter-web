import React from 'react';
import Header from './header';

import style from './style.less';

import Home from './home';

export default function({locale}) {
    return (
      <div id="app">
        <div className={[
            style.appContainer,
        ].join(' ')}>
          <Header locale={locale} />
          <Home locale={locale} />
        </div>
      </div>
    );
  }
