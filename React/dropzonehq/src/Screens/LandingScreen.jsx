import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import DropzoneHQNav from '../Navs/DropzoneHQNav.jsx';
import { Link } from 'react-router-dom';

export default class LandingScreen extends React.Component {

    render() {
        return (
            <div>
                <DropzoneHQNav />
                <Container id="main_body">
                    <Row>
                        <Col className="mainscreen_col" xs={{ size: 12 }}>
                            <img src="http://svgshare.com/i/3vT.svg" className="behind_nav img-responsive img-circle center-block" height="100" width="100" alt=""></img>
                        </Col>
                        <Col className="mainscreen_col" xs={{ size: 12 }}>
                            <h1>Areas</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="mainscreen_col" xs={{ size: 12 }}>
                            <Link to='/employee-info'><Button className="btn_transparent" size="lg">Employee Info</Button></Link>
                            <Link to='/employee-management'><Button className="btn_transparent" size="lg">Employee Management</Button></Link>
                            <Link to='/rental-menu'><Button className="btn_transparent" size="lg">Rentals</Button></Link>
                            <Link to='/rig-sheets'><Button className="btn_transparent" size="lg">Rigsheets</Button></Link>
                            <Link to='/inventory-menu'><Button className="btn_transparent" size="lg">Inventory</Button></Link>
                            <Link to='/loft-menu'><Button className="btn_transparent" size="lg">Loft</Button></Link>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}