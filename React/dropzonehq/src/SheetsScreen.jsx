import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import TandemRigsheet from './TandemRigsheet.jsx';
import StudentRigsheet from './StudentRigsheet.jsx';
import SignoutAlertList from './SignoutAlertList.jsx';
import 'bootstrap/dist/css/bootstrap.css';

class SheetsScreen extends Component {
  render() {
    return (
        <div>
            <Row>
                <Col md={{size: 12}}>
                <h1> Dropzone HQ </h1>
                </Col>
            </Row>
            <Row>
                <Col md={{size: 5, offset: 1}}>
                    <TandemRigsheet/>
                </Col>
                <Col md={{size: 5}}>
                    <StudentRigsheet/>
                </Col>
            </Row>
            <Row>
                <Col md={{size: 10, offset:1}}>
                    <SignoutAlertList/>
                </Col>
            </Row>
        </div>
    );
  }
}

export default SheetsScreen;