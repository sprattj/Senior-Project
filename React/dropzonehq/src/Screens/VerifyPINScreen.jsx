import React from 'react';
import { Container, Button, Input, Row, Col, InputGroup, InputGroupAddon, Alert } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import Binder from '../Binder.js';
import RequestHandler from '../RequestHandler.js';


export default class VerifyPINScreen extends React.Component {

    constructor(props) {
        super(props);

        this.updatePIN = this.updatePIN.bind(this);
        this.submit = this.submit.bind(this);
        
        this.state = {
            PIN: "",
            redirect: false
        }
    }

    updatePIN(e) {
        this.setState({
            PIN: e.target.value
        });
    }

    submit() {
        var warning;
        if (this.state.PIN.length !== 6) {
            this.setState({
                warning: <Alert color="danger">Please enter a 6 digit PIN.</Alert>,
                redirect: false
            });
        } else {
            var endpoint = "auth_employee/";
            var self = this;
            var variables = {
              pin: this.state.pin
            };
            var successMsg = "Employee credentials verified.";
            var errorMsg = "Employee authentication failed.";
            var callback = function (responseData) {
                self.setState({
                    warning: "",
                    redirect: true
                });
            };
            //make the request via handler
            var handler = new RequestHandler();
            handler.post(endpoint, variables, successMsg, errorMsg, callback);
        }
    }

    render() {
        console.log(this.props);
        if(this.state.redirect){
            //redirect to the url that was specified in the target part of this url
            return <Redirect to={'/' + this.props.match.params.target}/>
        }
        return (
            <Container id="main_body">
                <Row>
                    <Col className="mainscreen_col" xs={{ size: 12 }}>
                        <img src="http://svgshare.com/i/3vT.svg" className="behind_nav img-responsive img-circle center-block" height="100" width="100" alt="computer with parachute logo"></img>
                    </Col>
                    <Col className="mainscreen_col" xs={{ size: 12, offset: 0 }} sm={{ size: 10, offset: 1 }} md={{ size: 8, offset: 2 }} lg={{ size: 6, offset: 3 }}>
                        <h1>PIN Verification</h1>
                        <InputGroup>
                            <InputGroupAddon>PIN: </InputGroupAddon>
                            <Input type="password" pattern="[0-9]*" maxLength="6" onChange={this.updatePIN} />
                        </InputGroup>
                        <Button className="btn_transparent" size="lg" onClick={this.submit}>Submit</Button>
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