import React from 'react';
import ItemDisplay from './ItemDisplay.jsx';
import RentButton from '../Buttons/RentButton.jsx';
// import EditableInput from 'react-editable-input';
// import PropTypes from 'prop-types';
import { Form, FormGroup, Input, Row, Col, InputGroup, InputGroupAddon } from 'reactstrap';
import { rootURL } from '../restInfo.js';
import UncontrolledTextInput from '../UnControlledTextInput.jsx';
import SaveItemDetailsBtn from '../Buttons/SaveItemDetailsBtn.jsx';
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
            itemNum:  this.props.number // initially is number that's passed
        }
    }

    inventoryItemNumChanged(e) {
        console.log("in inventoryItemNumChanged ");
        this.setState({ itemNum: e.target.value
        });
        
        // var editInvItem = document.getElementById('editInventoryItem');
        // editInvItem.value = this.state.itemNum;
      }

      // TODO for each Item Detail field: 
      //    onBlur: inventoryItemNumChanged(e)
      // inventoryItemNumChanged()
      // {
            // this.setState itemNum 
      // }

      // CONTINUE TODO: 
      // save(){
      //    this.props.saveFunction(this.state.itemNum, this.state.itemDesc, .... this.state.itemType);
      // }

      // IN INVENTORYSCREEN:
      // <EditInventoryItemDisplay saveFunction={this.addItem}

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
                                                    {/* <Input id="editInventoryItem" type='text' value={this.props.number} onChange={this.inventoryItemNumChanged}  /> */}
                                                    <UncontrolledTextInput
                                                        // inputProps      = {{className: 'inputTxtBoxes'}}
                                                        onBlur          = {this.inventoryItemNumChanged}
                                                        id              = "myID"
                                                        defaultText     = {this.props.number}
                                                       // newTextValue        = {this.inventoryItemNumChanged}
                                                       // changeIndicator = {this.props.number}
                                                    />
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
                                            
                                        </Col>
                                    </Row>
                                </div>
                            } 
                            footerText = {
                                <SaveItemDetailsBtn buttonText={"SAVE"} itemDetailsFields={this.props} onClick={this.save} newFieldsValue={<UncontrolledTextInput />} />
                            }
                            />
                    </Col>
                </Row>
            </div>
        );
    }
};