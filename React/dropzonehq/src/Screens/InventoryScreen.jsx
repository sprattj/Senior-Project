import React from 'react';
import { Row, Col, Card, CardBlock, CardHeader } from 'reactstrap';
import RentButton from '../Buttons/RentButton.jsx';
import InventoryTable from '../Tables/InventoryTable.jsx';
import EditInventoryItemDisplay from '../ItemDisplays/EditInventoryItemDisplay.jsx';
import 'bootstrap/dist/css/bootstrap.css';

const marginStyle = {
    marginTop: 25,
    marginBottom: 25
};

/*
    InventoryScreen ...
*/
class InventoryScreen extends React.Component 
{
    constructor(props) 
    {
        super(props);
        this.displayChange = this.displayChange.bind(this);

        this.state = {
            currentItem: <EditInventoryItemDisplay rowID={0} />
        };
    }

    //changes the display of the right side of the screen by
    //taking in a EditInventoryItemDisplay and setting it in the currentItem state
    displayChange(itemDisplay, rowID) {
        if (itemDisplay) 
        { 
            console.log("Inventory Screen-> displayChange> rowID: " + rowID);           
            this.setState({
                currentItem: itemDisplay
            });
        } else 
        {
            console.log("check what 'itemDisplay' is");
        }

    }

    render() {
        return (
            <div>
                <Row style={marginStyle}>
                    <Col lg={{ size: 5, offset: 1 }}>
                        <InventoryTable displayChange={this.displayChange} />
                    </Col>
                    <Col lg={{ size: 5}}>
                        <Card body>
                            {this.state.currentItem}
                        </Card>
                    </Col>

                </Row>
            </div>
        );
    }
};

export default InventoryScreen;