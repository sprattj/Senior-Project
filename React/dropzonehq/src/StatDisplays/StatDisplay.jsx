import React from 'react';
import { Row, Col, Card, CardHeader, CardBody, CardFooter } from 'reactstrap';

export default class StatDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {            
            headerText: this.props.headerText,
            statsToDisplay: this.props.statsToDisplay
        }
    }

    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <Card >
                            <CardHeader>{this.state.headerText}</CardHeader>
                            <CardBody>
                                {this.state.statsToDisplay}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}