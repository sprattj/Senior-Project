import React from 'react';
import { Row, Col, Card, CardHeader, CardBlock, CardFooter, Table } from 'reactstrap';
import ChangeScreenButton from '../Buttons/ChangeScreenButton.jsx';
import EmployeeAdminScreen from '../Screens/EmployeeAdminScreen.jsx';
import RentalScreen from '../Screens/RentalScreen.jsx';
import SheetsScreen from '../Screens/SheetsScreen.jsx';
import EmployeeInfoScreen from '../Screens/EmployeeInfoScreen.jsx';

import 'bootstrap/dist/css/bootstrap.css';

const marginStyle = {
    marginTop: 25,
    marginBottom: 25
};

export default class MainScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
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
            </div>
        );
    }


}