import React from 'react';
import ItemDisplay from './ItemDisplay.jsx';
import RentButton from '../Buttons/RentButton.jsx';
import { Row, Col } from 'reactstrap';
import { rootURL } from '../restInfo.js';

export default class RentalDisplayRig extends React.Component {

    constructor(props) {
        super(props);
        //since the URL section is not directly related to rendering,
        //it shouldn't be part of state. Save it in a class variable.
        this.URLsection = "/rentaldisplayrig"; 
    }
    
    //love that fat Inline If-Else on the rental status
    render() {        
        return (
            <div>
                <Row>
                    <Col>
                        <ItemDisplay headerText="Rental Item Details"
                            statsToDisplay={
                                <div>
                                    <Row>
                                        <p>Rental Status: {this.props.isRented ? "Rented by " + this.props.renterName : "Available" }</p>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <p>Main Canopy: {this.props.mainBrand} {this.props.mainSize}</p>
                                            <p>Container: {this.props.containerBrand}</p>
                                        </Col>
                                        <Col>
                                            <p>Reserve Canopy: {this.props.reserveBrand} {this.props.reserveSize}</p>
                                            <p>AAD expiration date: {this.props.aadExp}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <p>{this.props.desc}</p>
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