import React from 'react';
import { ListGroupItem } from 'reactstrap';

export default class QueueListItem extends React.Component {

    render() {
        return (
            <ListGroupItem>
                <ul>
                    <li>Priority: {this.props.priority}</li>
                    <li>Name: {this.props.name}</li>
                    <li>Service: {this.props.service}</li>
                </ul>
            </ListGroupItem>
        );
    }
}