import React from 'react';
import { Card, CardHeader, CardBlock } from 'reactstrap';

export default class AlertList extends React.Component {
    render() {
        return (
            <Card>
                <CardHeader>{this.props.headerText}</CardHeader>
                <CardBlock>
                    {this.props.children}
                </CardBlock>
            </Card>
        );
    }
}