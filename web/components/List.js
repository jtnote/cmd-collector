import React from 'react'
import ReactDOM from 'react-dom'

import axios from 'axios'
import Edit from './Edit'

class ListItemEdit extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onEditClick(this.props.idEdit);
    }

    render() {
        var text;
        return (
            <button className="button is-link" onClick={this.handleClick}>Edit</button>
        )
    }
}

class List extends React.Component {
    constructor(props) {
        super(props);

        this.handleEdit = this.handleEdit.bind(this);
    }

    handleEdit(id) {
        console.log('id=' + id);
        axios.get('/cmdnotes/api/note', {
            params: {
                id: id
            }
        }).then(function (response) {
            // console.log(response);
            var note = response.data.note;
            ReactDOM.render(<Edit action="update" note={note}/>, document.getElementById('root'));
        }).catch(function (error) {
            console.log(error);
        }).then(function () {
            // always executed
        });
    }

    render() {
        return (
            <div className="note-list">
                <table className="table">
                    <thead>
                        <tr>
                            <th><abbr title="id">#</abbr></th>
                            <th>title</th>
                            <th><abbr title="cmd">cmd</abbr></th>
                            <th><abbr title="url">url</abbr></th>
                            <th></th>
                        </tr>
                    </thead>
                    {
                        this.props.notes.map((note, i) => (
                            <tr>
                                <td>{note.id}</td>
                                <td>{note.title}</td>
                                <td>{note.cmd}</td>
                                <td>{note.url}</td>
                                <td>
                                    <ListItemEdit onEditClick={this.handleEdit} idEdit={note.id} />
                                </td>
                            </tr>
                        ))
                    }
                </table>
            </div>
        )
    }
}

export default List;