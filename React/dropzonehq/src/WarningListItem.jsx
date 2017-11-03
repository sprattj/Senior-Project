import React from 'react';
import { ListGroupItem } from 'reactstrap';

export default class WarningListItem extends React.Component {

    render() {

        return (
            <ListGroupItem>
                <ul>
                    <h6>Rig: {this.props.rig}</h6>
                    <h6>Problem: {this.props.problem}</h6>
                </ul>
            </ListGroupItem>
        );
    }
}


