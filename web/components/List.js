import React from 'react'
import ReactDOM from 'react-dom'

import axios from 'axios'
import Edit from './Edit'
import Constants from '../Constants';

import ListItemEdit from './list/ListItemEdit';
import ListItemDelete from './list/ListItemDelete';
import ListPagingBarCTN from '../containers/list/ListPagingBarCTN';


class List extends React.Component {
    constructor(props) {
        super(props);

        // this.state = {
            //do not affect paging bar directly
            // currentPage: this.props.currentPage,
            // totalPages: this.props.totalPages,
            // notes: this.props.notes
        // }

        this.pagingBar = React.createRef();
    }

    handleEdit = (id) => {
        console.log('id=' + id + ", updateComplete=");
        console.log(this.props.updateComplete);
        var me = this;
        axios.get('/cmdnotes/api/note', {
            params: {
                id: id
            }
        }).then(function (response) {
            // console.log(response);
            var note = response.data.note;
            ReactDOM.render(<Edit action="update" note={note} updateComplete={me.props.updateComplete} cancelComplete={me.props.cancelComplete} />, document.getElementById('root'));
        }).catch(function (error) {
            console.log(error);
        }).then(function () {
            // always executed
        });
    }

    handleDelete = (id) => {
        console.log('handleDelete id=' + id);
        var me = this;
        axios.post('/cmdnotes/api/delete_note', {
            id: id
        }).then(function (response) {
            // console.log(response);
            var result = response.data.result;
            if (result == 'ok') {
                console.log('in handleDelete');
                me.props.deleteComplete();
            }
        }).catch(function (error) {
            console.log(error);
        }).then(function () {
            // always executed
        });
    }

    //called by parent
    //actually doing reloading
    changePage = (p, totalPages, notes) => {
        // console.log('in List: changepage, total='+totalPages);
        //placed before rendering of list content?
        this.pagingBar.current.changePage(totalPages, p);

        this.setState({
            currentPage: p,
            notes: notes
        });

    }

    render() {
        const lStyle = {
            textDecoration: 'underline'
        };

        console.log('[List]props.totalPages='+this.props.totalPages+', currP='+this.props.currentPage);

        return (
            <div>
                <table className="table cc-mainlist-table">
                    <thead>
                        <tr>
                            <th><abbr title="id">#</abbr></th>
                            <th>Title</th>
                            <th><abbr title="url">Url</abbr></th>
                            <th><abbr title="cmd">Command</abbr></th>
                            <th></th>
                        </tr>
                    </thead>
                    {
                        this.props.notes.map((note, i) => (
                            <tr>
                                <td>{note.id}</td>
                                <td><div className="cc-mainlist-table-title">{note.title}</div></td>
                                <td><a href={note.url} style={lStyle} target="_blank">Link</a></td>
                                <td><div className="cc-mainlist-table-cmd">{note.cmd}</div></td>
                                <td>
                                    <div class="buttons">
                                        <ListItemEdit onEditClick={this.handleEdit} idEdit={note.id} />
                                        <ListItemDelete onDeleteClick={this.handleDelete} idDelete={note.id} />
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </table>
                <ListPagingBarCTN ref={this.pagingBar} total={this.props.totalPages} currentPage={this.props.currentPage} />
                {/* reloadPage={this.props.reloadPage} */}
            </div>
        )
    }
}

export default List;