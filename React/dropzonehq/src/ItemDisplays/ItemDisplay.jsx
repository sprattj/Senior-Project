import React from 'react';
import { Row, Col, Card, CardHeader, CardBlock } from 'reactstrap';

export default class ItemDisplay extends React.Component {
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
                            <CardHeader>{this.props.headerText}</CardHeader>
                            <CardBlock>
                                {this.props.statsToDisplay}
                            </CardBlock>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}