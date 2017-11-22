import React from 'react';
import ItemDisplay from './ItemDisplay.jsx';
import { Row, Col } from 'reactstrap';
import { rootURL } from '../restInfo.js';

export default class RentalDisplayContainer extends React.Component {

    constructor(props) {
        super(props);
        //since the URL section is not directly related to rendering,
        //it shouldn't be part of state. Save it in a class variable.
        this.URLsection = "/rentaldisplaycontainer";
        var currentRenter = this.props.renter_name;
    }

    render() {

        return (
            <div>
                <Row>
                    <Col>
                        <ItemDisplay headerText="Rental Item Details"
                            statsToDisplay={
                                <div>
                                    <Row>
                                        <p>Rental Status: {this.props.is_available ? "Available" : "Rented by " + this.props.renter_name}</p>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <p>Container: {this.props.brand}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <p>{this.props.description}</p>
                                    </Row>
                                    <Row>
                                        {this.props.button}
                                    </Row>
                                </div>
                            } />
                    </Col>
                </Row>
            </div>
        );
    }
};