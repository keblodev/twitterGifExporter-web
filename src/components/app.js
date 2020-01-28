import React from 'react';
// import { Router } from 'preact-router';
// import Async from 'react-code-splitting';
import Header from './header';

import style from './style.less';



// const Header = ({...rest}) => <Async
//     load={import('./header')}
//     componentProps={{...rest}}
// />;

// const About = ({...rest}) => <Async
//   load={import('./shared/statics/about')}
//   componentProps={{...rest}}
// />;

import Home from './home';

export default function({history}) {

    // handleRoute = e => {
    //   this.currentUrl = e.url;
    // };

    return (
      <div id="app">
        <div className={[
            style.appContainer,
        ].join(' ')}>
          <Header />
          {/* <Router
            history={history}
            onChange={this.handleRoute}> */}
            <Home path="/" />
          {/* </Router> */}
        </div>
      </div>
    );
  }
