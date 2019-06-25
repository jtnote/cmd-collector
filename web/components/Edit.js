import React from 'react'
import ReactDOM from 'react-dom'

class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.addNote = this.addNote.bind(this);
    }

    addNote(){
        alert(1);
    }

    render() {
        return (
            <div className="note-edit">
                <div className="field">
                    <label className="label">Title</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="e.g. pip" />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Url</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="e.g. https://pip.pypa.io/en/stable/installing/" />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Command</label>
                    <div className="control">
                        <textarea className="textarea" placeholder="e.g. python get-pip.py #https://bootstrap.pypa.io/get-pip.py"></textarea>
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