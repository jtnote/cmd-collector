import React from 'react';
import ReactDOM from 'react-dom';

class ListItemDelete extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick = () => {
        this.props.onDeleteClick(this.props.idDelete);
    }

    render() {
        var text;
        return (
            <button className="button is-danger" onClick={this.handleClick}>Delete</button>
        )
    }
}

export default ListItemDelete;