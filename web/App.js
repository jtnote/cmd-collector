import React from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios';

import Edit from './components/Edit';
import List from './components/List';
import Login from './components/Login';
import Constants from './Constants';
import globalStates from './GlobalStates';
import Util from './Util';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: this.props.view == null ? Constants.DEFAULT_VIEW : this.props.view
    }

    this.toAddNote = this.toAddNote.bind(this);

    this.updateComplete = this.updateComplete.bind(this);
    this.cancelComplete = this.cancelComplete.bind(this);
    this.deleteComplete = this.deleteComplete.bind(this);

    this.reloadPage = this.reloadPage.bind(this);
    this.noteList = React.createRef();
  }

  //----------------- event listeners ------------------------------------------------------
  // after "New" is clicked
  toAddNote() {
    ReactDOM.render(<Edit action="add" updateComplete={this.updateComplete} cancelComplete={this.cancelComplete} />, document.getElementById('root'));
  }

  // after updating a note in "Edit" dialog
  updateComplete() {
    console.log('in updateComplete');
    initIndex();
  }

  // after cancel in "New" dialog
  cancelComplete() {
    console.log('in cancelComplete');
    initIndex();
  }

  // after deleting a note in list page
  deleteComplete() {
    console.log('in deleteComplete');
    initIndex();
  }

  //----------------- other ------------------------------------------------------
  initList() {
    Util.svcRequest('/cmdnotes/api/notes_paging', {
      page: 1,
      token: globalStates.token
    }, function (resp) {
      var page = Number(resp.data.currentPage);
      var total = Math.ceil(Number(resp.data.total) / Constants.PAGE_SIZE);

      // ReactDOM.render(<App notes={resp.data.notes} totalPages={total} currentPage={page} />, document.getElementById('root'));
    }, function () {
    });
  }

  //when page or n per page change
  reloadPage(p) {
    var me = this;
    // alert('in App reloadPage:'+p);
    axios.post('/cmdnotes/api/notes_paging', {
      // params: {
      token: globalStates.token,
      page: p
      // }
    }).then(function (resp) {
      // alert('paging return');
      console.log(resp);

      var page = Number(resp.data.currentPage);
      var total = Math.ceil(Number(resp.data.total) / Constants.PAGE_SIZE);

      //cache
      // globalStates.notes = resp.data.notes;
      // globalStates.currentPage = page;
      // globalStates.total = total;

      me.noteList.current.changePage(page, total, resp.data.notes);

      // ReactDOM.render(<App notes={resp.data.notes} currentPage={resp.data.currentPage}/>, document.getElementById('root'));

    }).catch(function (error) {
      console.log(error);
    }).then(function () {
    });
  }

  render() {
    // console.log('[App]global state=');
    // console.log(globalStates);
    var viewComponent = null;
    var me = this;

    if (this.state.view == 'login') {
      viewComponent = (
        <div className="container">
          <Login />
        </div>
      );
    } else if (this.state.view == 'list') {
      viewComponent = (
        <div className="container">
          <a className="button is-primary" onClick={me.toAddNote}>New</a>
          <List ref={me.noteList} notes={me.state.notes} totalPages={me.state.totalPages} currentPage={me.state.currentPage} updateComplete={me.updateComplete} cancelComplete={me.cancelComplete} deleteComplete={me.deleteComplete} reloadPage={me.reloadPage} />
        </div>
      );
    }
    return (
      { viewComponent }
    );
  }
}

export default App;