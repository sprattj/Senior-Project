import React from 'react';
import { Container, Button, Input, Row, Col, InputGroup, InputGroupAddon, Alert } from 'reactstrap';
import { Link } from 'react-router-dom';
import Binder from '../Binder.js';

export default class CreateDropzoneScreen extends React.Component {

    constructor(props) {
        super(props);

        //creater a new binder and bind all of the methods in this class
        var binder = new Binder();
        binder.bindAll(this, CreateDropzoneScreen);

        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
            warning: ""
        }

    }

    updateEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    updatePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    updateConfirmPassword(e) {
        this.setState({
            confirmPassword: e.target.value
        })
    }

    submit() {
        var warning;
        if (this.state.password !== this.state.confirmPassword) {
            warning = <Alert color="danger">Password and password confirmation do not match.</Alert>;
        } if (this.state.password === "") {
            warning = <Alert color="danger">Please enter a password.</Alert>;
        } else if (this.state.confirmPassword === "") {
            warning = <Alert color="danger">Please confirm your password.</Alert>;
        } else if (this.state.email === "") {
            warning = <Alert color="danger">Please enter an email.</Alert>;
        } else {
            warning = <div></div>
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
                        <h1>Create New Dropzone</h1>
                        <InputGroup>
                            <InputGroupAddon>Dropzone Email: </InputGroupAddon>
                            <Input type='email' onChange={this.updateEmail} />
                        </InputGroup>
                        <InputGroup>
                            <InputGroupAddon>Password: </InputGroupAddon>
                            <Input type='password' onChange={this.updatePassword} />
                        </InputGroup>
                        <InputGroup>
                            <InputGroupAddon>Confirm Password: </InputGroupAddon>
                            <Input type='password' onChange={this.updateConfirmPassword} />
                        </InputGroup>
                        <Button className="btn_transparent" size="lg" onClick={this.submit}>Create</Button>
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