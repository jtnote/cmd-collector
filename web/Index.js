import React from 'react';
import ReactDOM from 'react-dom';

import Edit from './components/Edit'
import List from './components/List'

import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.toAddNote = this.toAddNote.bind(this);

    this.updateComplete = this.updateComplete.bind(this);
    this.cancelComplete = this.cancelComplete.bind(this);
    this.deleteComplete = this.deleteComplete.bind(this);

    this.changePage = this.changePage.bind(this);
  }

  //----------------- event listeners ------------------------------------------------------
  // after "New" is clicked
  toAddNote(){
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
  changePage(p) {
    // alert('in App changepage:'+p);
    axios.get('/cmdnotes/api/notes_paging', {
      params: {
        page: p
      }
    }).then(function (resp) {
      alert('paging return');
      console.log(resp);

      ReactDOM.render(<App notes={resp.data.notes} currentPage={resp.data.currentPage}/>, document.getElementById('root'));

    }).catch(function (error) {
      console.log(error);
    }).then(function () {
    });
  }

  render() {
    return (
      <div className="container">
        <a className="button is-primary" onClick={this.toAddNote}>New</a>
        <List notes={this.props.notes} currentPage={this.props.currentPage} updateComplete={this.updateComplete} cancelComplete={this.cancelComplete} deleteComplete={this.deleteComplete} changePage={this.changePage}/>
      </div>
    );
  }
}

function initIndex() {
  axios.get('/cmdnotes/api/notes', {
    params: {
      xx: 'xxx'
    }
  }).then(function (response) {
    // console.log(response);
    ReactDOM.render(<App notes={response.data.notes} currentPage={response.data.currentPage}/>, document.getElementById('root'));
  }).catch(function (error) {
    console.log(error);
  }).then(function () {
    // always executed
  });
}

initIndex();