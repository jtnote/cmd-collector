import React from 'react';
import ReactDOM from 'react-dom';

import Edit from './components/Edit'
import List from './components/List'

import axios from 'axios'

// const App = () => (
//   <div>
//     <List />
//   </div>
// )


class App extends React.Component {
  constructor(props) {
    super(props);

    this.addNote = this.addNote.bind(this);
  }

  addNote() {
    ReactDOM.render(<Edit action="add"/>, document.getElementById('root'));
  }

  render() {
    return (
      <div>
        <a className="button is-primary" onClick={this.addNote}>New</a>
        <List notes={this.props.notes} />
      </div>
    )
  }
}

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




