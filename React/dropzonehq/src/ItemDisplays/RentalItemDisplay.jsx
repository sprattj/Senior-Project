import React from 'react';
import ItemDisplay from './ItemDisplay.jsx';
import RentButton from '../Buttons/RentButton.jsx';
import { Row, Col } from 'reactstrap';
import { rootURL } from '../restInfo.js';

export default class RiggingItemDisplay extends React.Component {
    constructor(props) {
        super(props);
        //since the URL section is not directly related to rendering,
        //it shouldn't be part of state. Save it in a class variable.
        this.URLsection = "/itemdisplay";

        this.state = {
            var1: this.props.var1,
            var2: this.props.var2
        }
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
                                        <Col>
                                            <p>{this.state.var1}</p>
                                        </Col>
                                        <Col>
                                            <p>{this.state.var2}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <RentButton buttonText="Rent" />
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