import React from 'react';
import { Row, Col, Card, CardHeader, CardBlock, CardFooter } from 'reactstrap';

export default class ItemDisplay extends React.Component {    

    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <Card >
                            <CardHeader>{this.props.headerText}</CardHeader>
                            <CardBlock>
                                {this.props.statsToDisplay}
                            </CardBlock>
                            <CardFooter> {this.props.footerText} </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}