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

axios.get('/cmdnotes/api/notes', {
  params: {
    xx: 'xxx'
  }
}).then(function (response) {
  // console.log(response);
  ReactDOM.render(<List notes={response.data.notes}/>, document.getElementById('root'));
}).catch(function (error) {
  console.log(error);
}).then(function () {
  // always executed
});




