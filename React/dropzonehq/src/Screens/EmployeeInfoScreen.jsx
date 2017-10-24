import React from 'react';
import ChangeScreenButton from '../Buttons/ChangeScreenButton.jsx';
import { Row, Col, Card, CardHeader, CardBlock, CardFooter } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.css';

const marginStyle = {
    marginTop: 25,
    marginBottom: 25

};

export default class EmployeeInfoScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>                
                <Row style={marginStyle}>
                    <Col lg={{ size: 10, offset: 1 }}>
                        <Card>
                            <CardHeader>Employee Info</CardHeader>
                            <CardBlock>

                            </CardBlock>
                        </Card>
                    </Col>
                </Row>
                <Row style={marginStyle}>
                    <Col lg={{ size: 10, offset: 1 }}>
                        <ChangeScreenButton screen={<EmployeeInfoScreen />}
                            changeScreen={this.props.changeScreen}
                            buttonText="Change User" /> 
                    </Col>
                </Row>
            </div>
        );
    }
};

