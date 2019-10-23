import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

import Edit from './Edit';
import ListItemEdit from './list/ListItemEdit';
import ListItemDelete from './list/ListItemDelete';
import ListPagingBarCTN from '../containers/list/ListPagingBarCTN';
import Constants from '../Constants';
import Util from '../Util';


class List extends React.Component {
    constructor(props) {
        super(props);

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
            var noteEdit = response.data.note;
            me.props.toEdit(noteEdit);

            // ReactDOM.render(<Edit action="update" note={note} updateComplete={me.props.updateComplete} cancelComplete={me.props.cancelComplete} />, document.getElementById('root'));
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
                var currentPage;
                if (me.props.notes.length == 1) {
                    //current page is last page
                    if (me.props.totalPages == 1) {
                        currentPage = 1;//TODO: empty list?
                    } else {
                        currentPage = me.props.currentPage - 1;
                    }
                } else {
                    currentPage = me.props.currentPage;
                }
                // me.props.changeView(Constants.VIEW_LIST);
                Util.loadPage(currentPage, me.props.token, function (notes, total, currentPage, totalPages) {
                    me.props.changeView(Constants.VIEW_LIST);
                });
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

        console.log('[List]props.totalPages=' + this.props.totalPages + ', currP=' + this.props.currentPage);

        return (
            <div>
                <div className="cc-ml-tblcon">
                <table className="table cc-ml-tbl">
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
                                <td><div className="cc-ml-tbl-title">{note.title}</div></td>
                                <td><a href={note.url} style={lStyle} target="_blank">Link</a></td>
                                <td><div className="cc-ml-tbl-cmd">{note.cmd}</div></td>
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
                </div>
                <ListPagingBarCTN ref={this.pagingBar} total={this.props.totalPages} currentPage={this.props.currentPage} />
            </div>
        )
    }
}

export default List;