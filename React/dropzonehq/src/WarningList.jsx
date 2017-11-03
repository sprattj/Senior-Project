import React from 'react';
import { ListGroup, Button } from 'reactstrap';
import LoftList from './LoftList.jsx';


export default class WarningList extends React.Component {

    render() {
        var footerContent = 
        <div>
            <Button color="info">Add To Queue</Button>
            <Button color="danger">Dismiss</Button>
        </div>;
        return (
            <LoftList headerText="Warnings" footerContent={footerContent}>
                {this.props.children}
            </LoftList>
        );
    }
}