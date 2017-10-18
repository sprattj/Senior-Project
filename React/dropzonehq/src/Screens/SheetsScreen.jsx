import React from 'react';
import { Row, Col, Card, CardHeader, CardBlock } from 'reactstrap';
import DropzoneHQNav from '../Navs/DropzoneHQNav.jsx';
import TandemRigsheet from '../Tables/TandemRigsheet.jsx';
import StudentRigsheet from '../Tables/StudentRigsheet.jsx';
import SignoutAlertList from '../Alerts/SignoutAlertList.jsx';
import RigProblemButton from '../ModalButtons/RigProblemButton.jsx';
import PackedWrongRigButton from '../ModalButtons/PackedWrongRigButton.jsx';
import 'bootstrap/dist/css/bootstrap.css';

const marginStyle = {
    marginTop: 25,
    marginBottom: 25

};

/*
    SheetsScreen is a view for seeing the tandem and
    student rigsheets, any errors/reports for rigs that
    instructors and packers should know, signing out rigs,
    reporting rigs as packed, and report rig damage.

    All related features as per the design will also be 
    covered here.
*/
class SheetsScreen extends React.Component {
    render() {
        return (
            <div>
                <Row>
                    <Col lg={{ size: 12 }}>
                        <DropzoneHQNav />
                    </Col>
                </Row>
                <Row style={marginStyle}>
                    <Col lg={{ size: 5, offset: 1 }}>
                        <TandemRigsheet />
                    </Col>
                    <Col lg={{ size: 5 }}>
                         <StudentRigsheet />
                    </Col>
                </Row>
                <Row style={marginStyle}>
                    <Col lg={{ size: 6, offset: 1 }}>
                        <SignoutAlertList />
                    </Col>
                    <Col lg={{ size: 4 }}>
                        <Card>
                            <CardHeader>Report</CardHeader>
                            <CardBlock>
                                <RigProblemButton />
                                <br/>
                                <PackedWrongRigButton />
                            </CardBlock>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
};

export default SheetsScreen;