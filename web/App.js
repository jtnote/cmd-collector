import React from 'react';
import ReactDOM from 'react-dom'

import Edit from './components/Edit';
import List from './components/List';
import Login from './components/Login';
import Constants from './Constants';

import axios from 'axios';

class App extends React.Component {
    constructor(props) {
      super(props);
  
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
    //when page or n per page change
    reloadPage(p) {
      var me = this;
      // alert('in App reloadPage:'+p);
      axios.get('/cmdnotes/api/notes_paging', {
        params: {
          page: p
        }
      }).then(function (resp) {
        // alert('paging return');
        console.log(resp);
  
        var page = Number(resp.data.currentPage);
        var total = Math.ceil(Number(resp.data.total) / Constants.PAGE_SIZE);
  
        me.noteList.current.changePage(page, total, resp.data.notes);
  
        // ReactDOM.render(<App notes={resp.data.notes} currentPage={resp.data.currentPage}/>, document.getElementById('root'));
  
      }).catch(function (error) {
        console.log(error);
      }).then(function () {
      });
    }
  
    render() {
      // alert('render' + Constants.PAGE_SIZE);
      return (
        <div className="container">
          <a className="button is-primary" onClick={this.toAddNote}>New</a>
          <List ref={this.noteList} notes={this.props.notes} totalPages={this.props.totalPages} currentPage={this.props.currentPage} updateComplete={this.updateComplete} cancelComplete={this.cancelComplete} deleteComplete={this.deleteComplete} reloadPage={this.reloadPage} />
        </div>
      );
    }
  }

  export default App;