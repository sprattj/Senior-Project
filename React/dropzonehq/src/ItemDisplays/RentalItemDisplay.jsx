import React from 'react';
import ItemDisplay from './ItemDisplay.jsx';
import RentButton from '../Buttons/RentButton.jsx';
import { Row, Col } from 'reactstrap';
import { rootURL } from '../restInfo.js';

export default class RentalItemDisplay extends React.Component {
    constructor(props) {
        super(props);
        //since the URL section is not directly related to rendering,
        //it shouldn't be part of state. Save it in a class variable.
        this.URLsection = "/rentalitemdisplay";

        this.setRButton = this.setRButton.bind(this);

        this.state = {
            RButton: null
        }

    }

    setRButton() {
        console.log("RentalItemDisplay: setRButton: this.props.isRented");
        console.log(this.props.isRented);
        if (this.props.isRented) {
            this.setState({
                RButton: "Rented Out"
                //RButton: <RentButton buttonText={"Return"} />
            })
        } else {
            this.setState({
                RButton: "Available"
                //RButton: <RentButton buttonText={"Rent"} />
            })
        }
        console.log(this.state.RButton);
    }

    componentDidMount() {
        console.log("RentalItemDisplay: componentDidMount")
        this.setRButton();
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
                                            <div>
                                                <p> The Item #: {this.props.number} </p>
                                                <p>The Item rowID Is: {this.props.rowID}</p>
                                                <p>The Person Currently Renting This Item Is: {this.props.renterName}</p>
                                            </div>
                                        </Col>
                                        <Col>
                                            <p>Item Description: {this.props.desc}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            {this.state.RButton}
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