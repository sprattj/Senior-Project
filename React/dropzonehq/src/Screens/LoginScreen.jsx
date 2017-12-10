import React from 'react';
import { Modal, ModalHeader, ModalBody, Container, Button, Input, Row, Col, InputGroup, InputGroupAddon, Alert } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import Binder from '../Binder.js';
import RequestHandler from '../RequestHandler.js';

export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        //creater a new binder and bind all of the methods in this class
        var binder = new Binder();
        binder.bindAll(this, LoginScreen);

        this.state = {
            username: "",
            password: "",
            warning: ""
        }
    }

    updateUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    updatePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    submit() {
        var warning;
        if (this.state.password === "") {
            warning = <Alert color="danger">Please enter a password.</Alert>;
        } else if (this.state.username === "") {
            warning = <Alert color="danger">Please enter a valid username.</Alert>;
        } else {
            warning = ""
        }
        this.setState({
            warning: warning
        });

        var endpoint = "login/";
        var self = this;
        var variables = {
            username: this.state.username,
            password: this.state.password
        };
        var onResponse = function(response) {
            if (response.status > 400) {
                toast.error("Error signing in.");
            } else if (response.status === 202) {
                self.setState({
                    redirect: true
                });
            }
        }

        var handler = new RequestHandler();
        handler.postNoToast(endpoint, onResponse);
    }


    render() {
        //redirect to the url that was specified in the target part of this url
        if (this.state.redirect) {
            if(this.props.match.params.target !== ""){
                return <Redirect to={'/' + this.props.match.params.target} />
            }else{
                return <Redirect to={'/dropzone-home'} />                
            }
        }
        return (
            <Container id="main_body">
                <Row>
                    <Col className="mainscreen_col" xs={{ size: 12 }}>
                        <img src="http://svgshare.com/i/3vT.svg" class="behind_nav img-responsive img-circle center-block" height="100" width="100" alt="computer with parachute logo"></img>
                    </Col>
                    <Col className="mainscreen_col" xs={{ size: 12, offset: 0 }} sm={{ size: 10, offset: 1 }} md={{ size: 8, offset: 2 }} lg={{ size: 6, offset: 3 }}>
                        <h1>Dropzone Login</h1>
                        <InputGroup>
                            <InputGroupAddon>Dropzone Username: </InputGroupAddon>
                            <Input type='text' onChange={this.updateUsername} />
                        </InputGroup>
                        <InputGroup>
                            <InputGroupAddon>Dropzone Password: </InputGroupAddon>
                            <Input type='password' onChange={this.updatePassword} />
                        </InputGroup>
                        <Button className="btn_transparent" size="lg" onClick={this.submit}>Login</Button>
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