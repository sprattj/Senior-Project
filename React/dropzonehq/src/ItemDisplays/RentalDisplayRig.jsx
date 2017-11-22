import React from 'react';
import ItemDisplay from './ItemDisplay.jsx';
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
                                        <p>Rental Status: {this.props.is_available ? "Available" : "Rented by " + this.props.renter_name}</p>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <p>Main Canopy: {this.props.main_canopy_brand} {this.props.main_canopy_size}</p>
                                            <p>Container: {this.props.container_brand}</p>
                                        </Col>
                                        <Col>
                                            <p>Reserve Canopy: {this.props.reserve_canopy_brand} {this.props.reserve_canopy_size}</p>
                                            <p>AAD Lifespan: {this.props.aad_lifespan}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <p>Description: {this.props.description}</p>
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