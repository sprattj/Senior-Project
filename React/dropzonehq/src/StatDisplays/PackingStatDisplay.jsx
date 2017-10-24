import React from 'react';
import StatDisplay from './StatDisplay.jsx';
import { Row, Col, Card, CardHeader, CardBlock, CardFooter } from 'reactstrap';


export default class BioStatDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tandemsPackedTotal: props.tandemsPackedTotal,
            tandemsPackedToday: props.tandemsPackedToday,
            tandemsPackedWeek: props.tandemsPackedsWeek,
            tandemsPackedMonth: props.tandemsPackedMonth,
            tandemsPackedYear: props.tandemsPackedYear,
            tandemMalfunctionsTotal: props.tandemMalfunctionsTotal,

            studentsPackedTotal: props.studentsPackedTotal,
            studentsPackedToday: props.studentsPackedToday,
            studentsPackedWeek: props.studentsPackedsWeek,
            studentsPackedMonth: props.studentsPackedMonth,
            studentsPackedYear: props.studentsPackedYear,
            studentMalfunctionsTotal: props.studentMalfunctionsTotal,
        }
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
                                        <p>Career Total Tandems Packed: {this.state.tandemsPackedTotal}</p>
                                    </Col>
                                    <Col>
                                        <p>Students Packed Today: {this.state.studentsPackedToday}</p>
                                        <p>Students Packed This Week: {this.state.studentsPackedWeek}</p>
                                        <p>Students Packed This Month: {this.state.studentsPackedMonth}</p>
                                        <p>Students Packed This Year: {this.state.studentsPackedYear}</p>
                                        <p>Career Total Students Packed: {this.state.studentsPackedTotal}</p>
                                    </Col>
                                </Row>
                            } />
                    </Col>
                </Row>
            </div>
        );
    }
}