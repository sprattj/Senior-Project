import React from 'react';
import { Row, Col, Card, CardBlock } from 'reactstrap';
import ChangeScreenButton from '../Buttons/ChangeScreenButton.jsx';
import EmployeeAdminScreen from '../Screens/EmployeeAdminScreen.jsx';
import RentalScreen from '../Screens/RentalScreen.jsx';
import SheetsScreen from '../Screens/SheetsScreen.jsx';
import EmployeeInfoScreen from '../Screens/EmployeeInfoScreen.jsx';
import InventoryScreen from '../Screens/InventoryScreen.jsx';
import LoftScreen from '../Screens/LoftScreen.jsx';
import TestScreen from '../Screens/TestScreen.jsx';
import 'bootstrap/dist/css/bootstrap.css';

const marginStyle = {
    marginTop: 15,
    marginBottom: 15
};

export default class MainScreen extends React.Component {

    render() {
        return (
            <div>
                <Card>
                    <CardBlock>
                        <Row style={marginStyle}>
                            <Col>
                                <ChangeScreenButton screen={<EmployeeInfoScreen />}
                                    changeScreen={this.props.changeScreen}
                                    buttonText="Employee Information" />
                            </Col>
                            <Col>
                                <ChangeScreenButton screen={<EmployeeAdminScreen />}
                                    changeScreen={this.props.changeScreen}
                                    buttonText="Employee Management" />
                            </Col>
                        </Row>
                        <Row style={marginStyle}>
                            <Col>
                                <ChangeScreenButton screen={<RentalScreen />}
                                    changeScreen={this.props.changeScreen}
                                    buttonText="Rentals" />
                            </Col>
                            <Col>
                                <ChangeScreenButton screen={<SheetsScreen />}
                                    changeScreen={this.props.changeScreen}
                                    buttonText="Rig Sheets" />
                            </Col>
                        </Row>
                        <Row style={marginStyle}>
                            <Col>
                                <ChangeScreenButton screen={<InventoryScreen />}
                                    changeScreen={this.props.changeScreen}
                                    buttonText="Inventory Sheets" />
                            </Col>
                            <Col>
                                <ChangeScreenButton screen={<LoftScreen />}
                                    changeScreen={this.props.changeScreen}
                                    buttonText="Loft" />
                            </Col>
                        </Row>
                        <Row style={marginStyle}>
                            <Col>
                                <ChangeScreenButton screen={<TestScreen />}
                                    changeScreen={this.props.changeScreen}
                                    buttonText="FETCH CALL TEST SCREEN" />
                            </Col>
                        </Row>
                    </CardBlock>
                </Card>

            </div>
        );
    }


}