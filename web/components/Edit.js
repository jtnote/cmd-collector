import React from 'react'
import ReactDOM from 'react-dom'

import axios from 'axios'

class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.addNote = this.addNote.bind(this);
        this.handeInputChange = this.handeInputChange.bind(this);

        this.state = {
            title: '',
            url: '',
            cmd: ''
        }
    }

    handeInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })

        console.log(this.state);
    }

    addNote() {
        console.log(this.state);
        axios.post('/cmdnotes/api/create_note', {
            title: this.state.title,
            url: this.state.url,
            cmd: this.state.cmd
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
            <div className="note-edit">
                <div className="field">
                    <label className="label">Title</label>
                    <div className="control">
                        <input className="input" type="text" name="title" onChange={this.handeInputChange} placeholder="e.g. pip" />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Url</label>
                    <div className="control">
                        <input className="input" type="text" name="url" onChange={this.handeInputChange} placeholder="e.g. https://pip.pypa.io/en/stable/installing/" />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Command</label>
                    <div className="control">
                        <textarea className="textarea" name="cmd" onChange={this.handeInputChange} placeholder="e.g. python get-pip.py #https://bootstrap.pypa.io/get-pip.py"></textarea>
                    </div>
                </div>

                <div className="field is-grouped">
                    <div className="control" onClick={this.addNote}>
                        <button className="button is-link">Submit</button>
                    </div>
                    <div className="control">
                        <button className="button is-text">Cancel</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Edit;