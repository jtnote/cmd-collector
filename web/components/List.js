import React from 'react'
import ReactDOM from 'react-dom'

// import Similarity from './tabs/Similarity';
// import Settings from './tabs/Settings';
// import Tab2 from './tabs/Tab2';

class List extends React.Component {
    constructor(props) {
        super(props);
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
                        </tr>
                    </thead>
                    {
                        this.props.notes.map((note, i) => (
                            <tr>
                                <td>{note.id}</td>
                                <td>{note.title}</td>
                                <td>{note.cmd}</td>
                                <td>{note.url}</td>
                            </tr>
                        ))
                    }
                </table>
            </div>
        )
    }
}

export default List;