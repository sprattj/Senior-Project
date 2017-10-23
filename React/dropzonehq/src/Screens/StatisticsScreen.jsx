import React from 'react';
import { Row, Col, Card, CardHeader, CardBlock } from 'reactstrap';
import DropzoneHQNav from '../Navs/DropzoneHQNav.jsx';
import TabGroup from '../TabGroups/TabGroup.jsx';
import VerifyButton from '../ModalButtons/VerifyButton.jsx';
//components

import 'bootstrap/dist/css/bootstrap.css';


const statRoles = ["Rigger Stats", "Loft Employee Stats", "Instructor Stats",
                    "Packer Stats", "Rental Stats", "Random Stats" ];
const statContents = [0, 0, 0, 0, 0, 0]
const marginStyle = {
    marginTop: 25,
    marginBottom: 25

};

class StatisticsScreen extends React.Component {
    
    render () {
        return (
            <div>
                <Row> 
                    <Col lg={{ size: 12 }}>
                        <DropzoneHQNav />
                    </Col>
                </Row>
                <Row style={marginStyle}> 
                    <Col>
                        <TabGroup tabHeaders={statRoles} tabContents={statContents}>  
                        </TabGroup>
                    </Col>
                </Row>
                <Row style={marginStyle}> 
                    <Col>
                        <VerifyButton />
                    </Col>
                </Row>
            </div>
        );
    }
};

export default StatisticsScreen;