import React from 'react';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import axios from 'axios';

import Edit from './components/Edit';
import List from './components/List';
// import Login from './components/Login';
import Constants from './Constants';
import Util from './Util';

import ListCTN from './containers/ListCTN';
import LoginCTN from './containers/LoginCTN';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('[App]props.view=' + this.props.view);
    var viewElement;
    if (this.props.view == Constants.VIEW_LOGIN) {
      viewElement = (
        <div>
          <LoginCTN />
        </div>
      );
    } else if (this.props.view == Constants.VIEW_REGISTER) {
      viewElement = (
        <div>
          register
        </div>
      );
    } else if (this.props.view == Constants.VIEW_LIST) {
      viewElement = (
        <div>
          <ListCTN />
        </div>
      );
    }
    return (
      <div>
        <div>state: {}</div>
        {viewElement}
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  view: state.view
})

export default connect(mapStateToProps)(App);