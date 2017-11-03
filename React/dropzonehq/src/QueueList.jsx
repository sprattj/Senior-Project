import React from 'react';
import { ListGroup, Button } from 'reactstrap';
import LoftList from './LoftList.jsx';

export default class QueueList extends React.Component {

    render() {
        var footerContent = 
        <div>
            <Button color="info">Add New</Button>
            <Button color="danger">Dismiss</Button>
        </div>;
        return (
            <LoftList headerText="Queue" footerContent={footerContent}>
                {this.props.children}
            </LoftList>
        );
    }
}