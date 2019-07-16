import React from 'react';
import ReactDOM from 'react-dom';

import Edit from './components/Edit'
import List from './components/List'

import axios from 'axios'

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.addNote = this.addNote.bind(this);
  }

  addNote() {
    ReactDOM.render(<Edit action="add" updateComplete={this.props.updateComplete} cancelComplete={this.props.cancelComplete} />, document.getElementById('root'));
  }

  render() {
    return (
      <div className="container">
        <a className="button is-primary" onClick={this.addNote}>New</a>
        <List notes={this.props.notes} currentPage={this.props.currentPage} updateComplete={this.props.updateComplete} cancelComplete={this.props.cancelComplete} deleteComplete={this.props.deleteComplete} changePage={this.props.changePage}/>
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.updateComplete = this.updateComplete.bind(this);
    this.cancelComplete = this.cancelComplete.bind(this);
    this.deleteComplete = this.deleteComplete.bind(this);

    this.changePage = this.changePage.bind(this);
  }

  updateComplete() {
    console.log('in updateComplete');
    initIndex();
  }

  cancelComplete() {
    console.log('in cancelComplete');
    initIndex();
  }

  deleteComplete() {
    console.log('in deleteComplete');
    initIndex();
  }

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
      <Index notes={this.props.notes} currentPage={this.props.currentPage} updateComplete={this.updateComplete} cancelComplete={this.cancelComplete} deleteComplete={this.deleteComplete} changePage={this.changePage}/>
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