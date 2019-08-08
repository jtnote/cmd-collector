import React from 'react'
import ReactDOM from 'react-dom'

import axios from 'axios'

import Constants from '../Constants'

class Edit extends React.Component {
    constructor(props) {
        super(props);

        // var note = this.props.note;

        this.state = {
            // action: props.action, //actions: 1.'add'; 2.'update' 
            id: props.note == null ? 0 : note.id,
            title: props.note == null ? '' : note.title,
            url: props.note == null ? '' : note.url,
            cmd: props.note == null ? '' : note.cmd
        }
    }

    handeInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })

        console.log(this.state);
    }

    submit = () => {
        var me = this;
        console.log(this.state);
        if (this.props.editAction == Constants.EDIT_ACTION_ADD) {
            axios.post('/cmdnotes/api/create_note', {
                title: this.state.title,
                url: this.state.url,
                cmd: this.state.cmd
            }).then(function (response) {
                var result = response.data.result;
                if (result == 'ok') {
                    //TODO should be add complete
                    me.props.updateComplete();
                } else {
                    //TODO
                    alert('Add error.');
                }
            }).catch(function (error) {
                console.log(error);
            });
        } else if (this.props.editAction == Constants.EDIT_ACTION_EDIT) {
            axios.post('/cmdnotes/api/update_note', {
                id: this.state.id,
                title: this.state.title,
                url: this.state.url,
                cmd: this.state.cmd
            }).then(function (response) {
                var result = response.data.result;
                if (result == 'ok') {
                    me.props.updateComplete();
                } else {
                    //TODO
                    alert('Update error.');
                }

            }).catch(function (error) {
                console.log(error);
            });
        }
    }

    cancel = () => {
        this.props.cancelComplete();
    }

    render() {
        var textSubmit = '';
        if (this.props.editAction == Constants.EDIT_ACTION_ADD) {
            textSubmit = 'Add';
        } else if (this.props.editAction == Constants.EDIT_ACTION_EDIT) {
            textSubmit = 'Save';
        }

        return (
            <div className="container">
                <div className="field">
                    <label className="label">Title</label>
                    <div className="control">
                        <input className="input" type="text" name="title" onChange={this.handeInputChange} placeholder="e.g. pip" value={this.state.title} />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Url</label>
                    <div className="control">
                        <input className="input" type="text" name="url" onChange={this.handeInputChange} placeholder="e.g. https://pip.pypa.io/en/stable/installing/" value={this.state.url} />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Command</label>
                    <div className="control">
                        <textarea className="textarea" name="cmd" onChange={this.handeInputChange} placeholder="e.g. python get-pip.py #https://bootstrap.pypa.io/get-pip.py" value={this.state.cmd}></textarea>
                    </div>
                </div>

                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link" onClick={this.submit}>{textSubmit}</button>
                    </div>
                    <div className="control">
                        <button className="button is-text" onClick={this.cancel}>Cancel</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Edit;