import React from 'react';
import ItemDisplay from './ItemDisplay.jsx';
import { Row, Col } from 'reactstrap';

//This is an initial place holder for the ItemDetails section of
//the rental and inventory screen so that that section isnt blank but doesnt need data.
export default class BlankItemDisplay extends React.Component {
    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <ItemDisplay headerText={this.props.headerText}
                            statsToDisplay="Please select an Item to view more details" />
                    </Col>
                </Row>
            </div>
        );
    }
};