import React from 'react';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import axios from 'axios';

import List from './components/List';
import Constants from './Constants';
import Util from './Util';
import { changeView } from './actions/Index';

import ListCTN from './containers/ListCTN';
import LoginCTN from './containers/LoginCTN';
import EditCTN from './containers/EditCTN';
import NavBarCTN from './containers/NavBarCTN'

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  toAdd = () => {
    this.props.changeView(Constants.VIEW_ADD);
  }

  render() {
    var me = this;

    console.log('[App]props.view=' + this.props.view);
    var viewElement;
    if (this.props.view == Constants.VIEW_LOGIN) {
      viewElement = (
        <div className="container">
          <LoginCTN />
        </div>
      );
    } else if (this.props.view == Constants.VIEW_REGISTER) {
      viewElement = (
        <div className="container">
          register
        </div>
      );
    } else if (this.props.view == Constants.VIEW_ADD) {
      viewElement = (
        <div className="container">
          <EditCTN />
        </div>
      );
    } else if (this.props.view == Constants.VIEW_EDIT) {
      viewElement = (
        <div className="container">
          <EditCTN />
        </div>
      );
    } else if (this.props.view == Constants.VIEW_LIST) {
      viewElement = (
        <div className="container">
          <NavBarCTN />
          <ListCTN />
        </div>
      );
    }
    return (
      <div>
        {/* <div>state: {}</div> */}
        {viewElement}
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  view: state.view
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  changeView: (view) => dispatch(changeView(view))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);