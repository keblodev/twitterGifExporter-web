import { h, Component } from 'preact';
import { Router } from 'preact-router';
import Async from 'react-code-splitting';

import { connect }              from 'react-redux';
import { bindActionCreators }   from 'redux';
import AppActions               from 'actions';

import style from './style.less';

const Header = ({...rest}) => <Async
    load={import('./header')}
    componentProps={{...rest}}
/>;

// const About = ({...rest}) => <Async
//   load={import('./shared/statics/about')}
//   componentProps={{...rest}}
// />;

import Home from './home';

class App extends Component {

  componentWillMount() {
    // TODO:
    // this.props.actions.appInit()
  }

  handleRoute = e => {
    this.currentUrl = e.url;
  };

  render({history}) {
    return (
      <div id="app">
        <div class={[
            style.appContainer,
        ].join(' ')}>
          <Header />
          <Router
            history={history}
            onChange={this.handleRoute}>
            <Home path="/" />
          </Router>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  // TODO
  // modalActive:    state.app.ui.modal.active,
});

const mapDispatch = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch)
});

export default
  connect(mapState, mapDispatch)(App);