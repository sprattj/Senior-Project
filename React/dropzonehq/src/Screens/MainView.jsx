import React from 'react';
import { Row, Col, Card, CardHeader, CardBlock, CardFooter, Table } from 'reactstrap';
import MainScreen from './MainScreen.jsx';
import DropzoneHQNav from '../Navs/DropzoneHQNav.jsx';
import 'bootstrap/dist/css/bootstrap.css';

const marginStyle = {
    marginTop: 25,
    marginBottom: 25
};

export default class MainView extends React.Component {
    constructor(props) {
        super(props);
        this.changeScreen = this.changeScreen.bind(this);
        this.state = {
            currentScreen: <MainScreen changeScreen={this.changeScreen} />
        };
    }

    changeScreen(newScreen) {
        this.setState({
            currentScreen: newScreen
        })
    }

    render() {
        return (
            <div>
                <Row>
                    <Col lg={{ size:12 }}>
                        <DropzoneHQNav />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.state.currentScreen}
                    </Col>
                </Row>
            </div>
        );
    }

}