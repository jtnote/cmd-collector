import React from 'react';
import ReactDOM from 'react-dom';

import Edit from './components/Edit'
import List from './components/List'

const App = () => (
  <div>
     <Edit />
  </div>
)
ReactDOM.render(<App/>, document.getElementById('root'));