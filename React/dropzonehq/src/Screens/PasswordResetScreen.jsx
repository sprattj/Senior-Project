import React from 'react';
import { Container, Button, Input, Row, Col, InputGroup, InputGroupAddon, Alert } from 'reactstrap';
import { Link } from 'react-router-dom';
import Binder from '../Binder.js';

export default class PasswordResetScreen extends React.Component {

    constructor(props) {
        super(props);

        //creater a new binder and bind all of the methods in this class
        var binder = new Binder();
        binder.bindAll(this, PasswordResetScreen);

        this.state = {
            email: "",
            warning: ""
        }
    }

    updateEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    submit() {
        var warning;
        if (this.state.email === "") {
            warning = <Alert color="danger">Please enter a valid email.</Alert>;
        } else {
            warning = ""
        }
        this.setState({
            warning: warning
        })
    }

    render() {
        return (
            <Container id="main_body">
                <Row>
                    <Col className="mainscreen_col" xs={{ size: 12 }}>
                        <img src="http://svgshare.com/i/3vT.svg" className="behind_nav img-responsive img-circle center-block" height="100" width="100" alt="computer with parachute logo"></img>
                    </Col>
                    <Col className="mainscreen_col" xs={{ size: 12, offset: 0 }} sm={{ size: 10, offset: 1 }} md={{ size: 8, offset: 2 }} lg={{ size: 6, offset: 3 }}>
                        <InputGroup>
                            <InputGroupAddon>Dropzone Email: </InputGroupAddon>
                            <Input type='email' />
                        </InputGroup>
                        <Button className="btn_transparent" size="lg" onClick={this.submit} >Send Reset Email</Button>
                        <Link to='/main-menu'><Button className="btn_transparent" size="lg">Back to Main</Button></Link>
                    </Col>
                    <Col className="mainscreen_col" xs={{ size: 12, offset: 0 }} sm={{ size: 10, offset: 1 }} md={{ size: 8, offset: 2 }} lg={{ size: 6, offset: 3 }}>
                        {this.state.warning}
                    </Col>
                </Row>
            </Container>
        );
    }
}