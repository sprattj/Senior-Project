import React from 'react';
import ItemDisplay from './ItemDisplay.jsx';
import RentButton from '../Buttons/RentButton.jsx';
import { Row, Col } from 'reactstrap';
import { rootURL } from '../restInfo.js';

export default class RentalDisplayCanopy extends React.Component {

    constructor(props) {
        super(props);
        //since the URL section is not directly related to rendering,
        //it shouldn't be part of state. Save it in a class variable.
        this.URLsection = "/rentaldisplaycanopy";

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
                                        <p>Rental Status: {this.props.isRented ? "Rented by " + this.props.renterName : "Available"}</p>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <p>Canopy Brand: {this.props.brand}</p>
                                        </Col>
                                        <Col>
                                            <p>Canopy Size: {this.props.size}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <div>
                                            <p>Description:</p>
                                            <p>{this.props.desc}</p>
                                        </div>
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