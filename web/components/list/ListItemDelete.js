import React from 'react';
import ReactDOM from 'react-dom';

class ListItemDelete extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick = (e) => {
        e.stopPropagation();
        this.props.onDeleteClick(this.props.idDelete);
    }

    render() {
        var text;
        return (
            <button className="button is-danger is-outlined is-small" onClick={this.handleClick}>Delete</button>
        )
    }
}

export default ListItemDelete;