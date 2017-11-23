import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Link  } from 'react-router-dom'

export default class NotFoundScreen extends React.Component {

    render() {
        return (
            <Container id="main_body">
                <Row>
                    <Col className="mainscreen_col" xs={{ size: 12 }}>
                        <h1>404 Page Not Found</h1>
                    </Col>
                    <Col className="mainscreen_col" xs={{ size: 12 }}>
                        <img src="http://svgshare.com/i/3vT.svg" class="behind_nav img-responsive img-circle center-block" height="225" width="225" alt="computer with parachute logo"></img>
                    </Col>
                    <Col className="mainscreen_col" xs={{ size: 12 }}>
                        <h3 class="title_color">The page you requested was not found.</h3>
                    </Col>
                </Row>
                <Row>
                    <Col className="mainscreen_col" xs={{ size: 12 }}>
                        <Link to='/main-menu'><Button className="btn_transparent" size="lg">Back to main menu</Button></Link>
                    </Col>
                </Row>
            </Container>
        );
    }
}