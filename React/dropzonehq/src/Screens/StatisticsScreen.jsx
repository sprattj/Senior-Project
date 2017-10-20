import React from 'react';
import { Row, Col, Card, CardHeader, CardBlock } from 'reactstrap';
import DropzoneHQNav from '../Navs/DropzoneHQNav.jsx';
import TabGroup from '../TabGroups/TabGroup.jsx'
//components
import 'bootstrap/dist/css/bootstrap.css';


var statRoles = ["Rigger Stats", "Loft Employee Stats", "Instructor Stats",
                    "Packer Stats", "Rental Stats", "Random Stats" ];
var statContents = [0, 0, 0, 0, 0, 0]
class StatisticsScreen extends React.Component {
    
    render () {
        return (
            <div>
                <Row> 
                    <Col lg={{ size: 12 }}>
                        <DropzoneHQNav />
                    </Col>
                </Row>
                <Row> 
                    <TabGroup tabHeaders={statRoles} tabContents={statContents}>  
                    </TabGroup>
                </Row>
                <Row> 
                    
                </Row>
            </div>
        );
    }
};

export default StatisticsScreen;