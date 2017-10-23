import React from 'react';
import { Row, Col, Card, CardHeader, CardBlock, CardFooter, Table } from 'reactstrap';
import MainView from './MainView.jsx';
import ToEmployeeButton from '../Buttons/ToEmployeeButton.jsx';
import ToInventoryButton from '../Buttons/ToInventoryButton.jsx';
import ToRigSheetsButton from '../Buttons/ToRigSheetsButton.jsx';
import ToLoftButton from '../Buttons/ToLoftButton.jsx';
import ToRentalsButton from '../Buttons/ToRentalsButton.jsx';
import ToReportsButton from '../Buttons/ToReportsButton.jsx';
import DropzoneHQNav from '../Navs/DropzoneHQNav.jsx';
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
                    <Row>
                        <Col>
                            <ToEmployeeButton/>
                        </Col>
                        <Col>
                            <ToInventoryButton/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ToRigSheetsButton />
                        </Col>
                        <Col>
                            <ToLoftButton/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ToRentalsButton/>
                        </Col>
                        <Col>
                            <ToReportsButton/>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row style={marginStyle}> 
                <Col>
                    
                </Col>
            </Row>
        </div>
        );
    }


};
