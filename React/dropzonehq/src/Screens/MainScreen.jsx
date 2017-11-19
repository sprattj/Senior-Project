import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { Switch, Route } from 'react-router-dom'
import DropzoneHQNav from '../Navs/DropzoneHQNav.jsx';
import { Link } from 'react-router-dom';
const marginStyle = {
    marginTop: 15,
    marginBottom: 15
};

export default class MainScreen extends React.Component {

    render() {
        return (
            <Container id="main_body">
                <Row>
                    <Col className="mainscreen_col" xs={{ size: 12 }}>
                        <h1>Dropzone HQ</h1>
                    </Col>
                    <Col className="mainscreen_col" xs={{ size: 12 }}>
                        <img src="http://svgshare.com/i/3vT.svg" class="behind_nav img-responsive img-circle center-block" height="225" width="225"></img>
                    </Col>
                    <Col className="mainscreen_col" xs={{ size: 12 }}>
                        <h3 class="title_color">A web-based solution for skydiving dropzone management.</h3>
                    </Col>
                </Row>
                <Row>
                    <Col className="mainscreen_col" xs={{ size: 12 }}>
                    <Link to='/dropzone-home'><Button className="btn_transparent" size="lg">Ya gotta log in to use this screen but it's going to be here for test purposes so click me to get thru to the rest of the application</Button></Link>

                        <Link to='/create-dropzone'><Button className="btn_transparent" size="lg">New Dropzone</Button></Link>
                        <Link to='/login'><Button className="btn_transparent" size="lg">Login</Button></Link>
                        <Link to='/reset'><Button className="btn_transparent" size="lg">Password Reset</Button></Link>
                    </Col>
                </Row>
            </Container>
        );
    }
}