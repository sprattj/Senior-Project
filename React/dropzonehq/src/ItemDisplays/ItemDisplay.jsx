import React from 'react';
import { Row, Col, Card, CardHeader, CardBlock, CardFooter } from 'reactstrap';

export default class ItemDisplay extends React.Component {

    render() {
        return (
            <Card >
                <CardHeader>{this.props.headerText}</CardHeader>
                <CardBlock>
                    {this.props.statsToDisplay}
                </CardBlock>
                <CardFooter> {this.props.footerText} </CardFooter>
            </Card>
        );
    }
}