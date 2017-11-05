import React from 'react';
import { Row, Col, Card, CardBlock, CardHeader } from 'reactstrap';
import RentButton from '../Buttons/RentButton.jsx';
import RentalTable from '../Tables/RentalTable.jsx';
import RentalItemDisplay from '../ItemDisplays/RentalItemDisplay.jsx';
import 'bootstrap/dist/css/bootstrap.css';

const marginStyle = {
    marginTop: 25,
    marginBottom: 25
};

class RentalScreen extends React.Component {

    constructor(props) {
        super(props);

        this.displayChange = this.displayChange.bind(this);

        this.state = {
            currentItem: null
        }
    }

    //changes the display of the right side of the screen by
    //taking in a RentalItemDisplay and setting it in the currentItem state
    displayChange(itemDisplay, rowID) {
        if (itemDisplay) { 
            console.log("Rental Screen: displayChange: rowID: " + rowID);           
            this.setState({
                currentItem: itemDisplay
            })
        } else {

        }

    }

    render() {
        return (
            <div>
                <Row style={marginStyle}>
                    <Col lg={{ size: 5, offset: 1 }}>
                        <RentalTable displayChange={this.displayChange} />
                    </Col>
                    <Col lg={{ size: 7, offset: 1 }}>
                        <Card body>
                            {this.state.currentItem}
                        </Card>
                    </Col>

                </Row>
            </div>
        );
    }
};

//<RentButton buttonText="Rent" disabled={true} />

export default RentalScreen;