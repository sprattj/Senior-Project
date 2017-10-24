import React from 'react';
import ChangeScreenButton from '../Buttons/ChangeScreenButton.jsx';
import BioStatDisplay from '../StatDisplays/BioStatDisplay.jsx';
import RiggingStatDisplay from '../StatDisplays/RiggingStatDisplay.jsx';
import TandemInstructorStatDisplay from '../StatDisplays/TandemInstructorStatDisplay.jsx';
import AFPInstructorStatDisplay from '../StatDisplays/AFPInstructorStatDisplay.jsx';
import PackingStatDisplay from '../StatDisplays/PackingStatDisplay.jsx';
import RentalStatDisplay from '../StatDisplays/RentalStatDisplay.jsx';
import { Row, Col, Card, CardHeader, CardBlock, CardFooter } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.css';

const marginStyle = {
    marginTop: 25,
    marginBottom: 25

};

export default class EmployeeInfoScreen extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <Row style={marginStyle}>
                    <Col lg={{ size: 10, offset: 1 }}>
                        <Card>
                            <CardHeader>Employee Info</CardHeader>
                            <CardBlock>
                                <BioStatDisplay />

                                <RiggingStatDisplay
                                    reservesPackedToday={0}
                                    reservesPackedWeek={3}
                                    reservesPackedMonth={12}
                                    reservesPackedYear={24}
                                    reservesPackedTotal={45}
                                    reserveSaves={3} />

                                <TandemInstructorStatDisplay />

                                <AFPInstructorStatDisplay />

                                <PackingStatDisplay />

                                <RentalStatDisplay />
                            </CardBlock>
                        </Card>
                    </Col>
                </Row>
                <Row style={marginStyle}>
                    <Col lg={{ size: 10, offset: 1 }}>
                        <ChangeScreenButton screen={<EmployeeInfoScreen />}
                            changeScreen={this.props.changeScreen}
                            buttonText="Change User" />
                    </Col>
                </Row>
            </div>
        );
    }
};

