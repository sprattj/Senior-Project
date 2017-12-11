import React from 'react';
import StatDisplay from './StatDisplay.jsx';
import { Row, Col } from 'reactstrap';

export default class BioStatDisplay extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <StatDisplay headerText="Packing Stats"
                            statsToDisplay={
                                <Row>
                                    <Col>
                                        <p>Tandems Packed Today: {this.state.tandemsPackedToday}</p>
                                        <p>Tandems Packed This Week: {this.state.tandemsPackedWeek}</p>
                                        <p>Tandems Packed This Month: {this.state.tandemsPackedMonth}</p>
                                        <p>Tandems Packed This Year: {this.state.tandemsPackedYear}</p>
                                    </Col>
                                    <Col>
                                        <p>Students Packed Today: {this.state.studentsPackedToday}</p>
                                        <p>Students Packed This Week: {this.state.studentsPackedWeek}</p>
                                        <p>Students Packed This Month: {this.state.studentsPackedMonth}</p>
                                        <p>Students Packed This Year: {this.state.studentsPackedYear}</p>
                                    </Col>
                                </Row>
                            } />
                    </Col>
                </Row>
            </div>
        );
    }
}