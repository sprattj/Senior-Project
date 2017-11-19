import React from 'react';
import ItemDisplay from './ItemDisplay.jsx';
import RentButton from '../Buttons/RentButton.jsx';
import { Row, Col } from 'reactstrap';
import { rootURL } from '../restInfo.js';

//This is an initial place holder for the RentalItemDetails section of
//the rentals screen so that that section isnt blank but doesnt need data.
export default class RentalItemDisplay extends React.Component {
    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <ItemDisplay headerText="Rental Item Details"
                            statsToDisplay="Please select an Item to view more details" />
                    </Col>
                </Row>
            </div>
        );
    }
};