import React from 'react';
import ItemDisplay from './ItemDisplay.jsx';
import RentButton from '../Buttons/RentButton.jsx';
// import EditableInput from 'react-editable-input';
// import PropTypes from 'prop-types';
import { Form, FormGroup, Input, Row, Col, InputGroup, InputGroupAddon } from 'reactstrap';
import { rootURL } from '../restInfo.js';
// import InlineEdit from 'react-edit-inline';


// var EditableInput = require('react-editable-input').default; 
export default class EditInventoryItemDisplay extends React.Component 
{
    constructor(props) 
    {
        super(props);
        //since the URL section is not directly related to rendering,
        //it shouldn't be part of state. Save it in a class variable.
        this.URLsection = "/editInventoryItemDisplay";

        this.inventoryItemNumChanged = this.inventoryItemNumChanged.bind(this);
        this.state = {
            itemNum:  this.props.number //'' // initially is number that's passed
        }
    }

    inventoryItemNumChanged(e) {
        this.setState({ itemNum: this.props.number // saved into state var, so it rerenders
            // itemNum: e.target.value,
        });
        
        // var editInvItem = document.getElementById('editInventoryItem');
        // editInvItem.value = this.state.itemNum;
      }

    saveToState()
    {
        this.setState({ itemNum: this.props.number // saved into state var, so it rerenders
            // itemNum: e.target.value,
        });
       // return this.state.itemNum;
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
                                                <InputGroup>
                                                    <InputGroupAddon >Item #: </InputGroupAddon>
                                                    <Input id="editInventoryItem" type='text' value={this.props.number} onChange={this.inventoryItemNumChanged}  />
                                                </InputGroup>
                                                <br />
                                                <InputGroup>
                                                    <InputGroupAddon >Rented By: </InputGroupAddon>
                                                    <Input id="itemRenterName" type='text' value={this.props.renterName} onChange={this.inventoryItemNumChanged}  />
                                                </InputGroup>
                                                
                                            </div>
                                        </Col>
                                        <Col>
                                            <div>
                                                <InputGroup>
                                                    <InputGroupAddon >Item Description: </InputGroupAddon>
                                                    <Input id="itemDesc" type='text' value={this.props.desc} onChange={this.inventoryItemNumChanged}  />
                                                </InputGroup>
                                                <br />
                                                <InputGroup>
                                                    <InputGroupAddon >Item Type: </InputGroupAddon>
                                                    <Input id="itemType" type='text' value={this.props.type} onChange={this.inventoryItemNumChanged}  />
                                                </InputGroup>
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