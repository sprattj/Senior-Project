import React from 'react';
import StatDisplay from './StatDisplay.jsx';
import { Row, Col } from 'reactstrap';

export default class RentalStatDisplay extends React.Component {
    constructor(props) {
        super(props);
        
    }  

    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <StatDisplay headerText="Rental Stats"
                            statsToDisplay={
                                <Row>
                                    <Col>
                                        <p>You Rented Out {this.state.RentalsToday} Rigs Today </p>
                                        <p>You Rented Out {this.state.RentalsWeek} Rigs This Week </p>
                                        <p>You Rented Out {this.state.RentalsMonth} Rigs This Month </p>
                                        <p>You Rented Out {this.state.RentalsYear} Rigs This Year </p>
                                        <p>You Rented Out {this.state.RentalsTotal} Rigs In Total</p>
                                    </Col>
                                    <Col>
                                        <p>You Returned {this.state.ReturnsToday} Rigs Today </p>
                                        <p>You Returned {this.state.ReturnsWeek} Rigs This Week </p>
                                        <p>You Returned {this.state.ReturnsMonth} Rigs This Month </p>
                                        <p>You Returned {this.state.ReturnsYear} Rigs This Year </p>
                                        <p>You Returned {this.state.ReturnsTotal} Rigs In Total</p>
                                    </Col>
                                </Row>
                            } />
                    </Col>
                </Row>
            </div>
        );
    }
};

