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
    ReactDOM.render(<Edit action="add" updateComplete={this.props.updateComplete} cancelComplete={this.props.cancelComplete}/>, document.getElementById('root'));
  }

  render() {
    return (
      <div>
        <a className="button is-primary" onClick={this.addNote}>New</a>
        <List notes={this.props.notes} updateComplete={this.props.updateComplete} cancelComplete={this.props.cancelComplete}/>
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.updateComplete = this.updateComplete.bind(this);
    this.cancelComplete = this.cancelComplete.bind(this);
  }

  updateComplete() {
    console.log('in updateComplete');
    initIndex();
  }

  cancelComplete(){
    console.log('in cancelComplete');
    initIndex();
  }

  render() {
    return (
      <Index notes={this.props.notes} updateComplete={this.updateComplete} cancelComplete={this.cancelComplete}/>
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
    ReactDOM.render(<App notes={response.data.notes} />, document.getElementById('root'));
  }).catch(function (error) {
    console.log(error);
  }).then(function () {
    // always executed
  });
}

initIndex();