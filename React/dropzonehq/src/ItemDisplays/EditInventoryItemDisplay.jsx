import React from 'react';
import ItemDisplay from './ItemDisplay.jsx';
import RentButton from '../Buttons/RentButton.jsx';
import { Row, Col } from 'reactstrap';
import { rootURL } from '../restInfo.js';

export default class EditInventoryItemDisplay extends React.Component 
{
    constructor(props) 
    {
        super(props);
        //since the URL section is not directly related to rendering,
        //it shouldn't be part of state. Save it in a class variable.
        this.URLsection = "/editInventoryItemDisplay";
    }

    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <ItemDisplay headerText="Inventory Item Details"
                            statsToDisplay={
                                <div>
                                    <Row>
                                        <Col>
                                            <div>
                                                <p> The Item #: {this.props.number} </p>
                                                <p>The Person Currently Renting This Item Is: {this.props.renterName}</p>
                                                <input type='textbox' value= {this.props.number} disabled={true} />
                                            </div>
                                        </Col>
                                        <Col>
                                            <div>
                                            <p>Item Description: {this.props.desc}</p>
                                            <p>Item Type: {this.props.type}</p>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            {this.props.button}
                                        </Col>
                                    </Row>
                                </div>
                            } />
                    </Col>
                </Row>
            </div>
        );
    }
};