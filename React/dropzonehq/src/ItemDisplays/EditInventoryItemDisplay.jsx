import React from 'react';
import ItemDisplay from './ItemDisplay.jsx';

// import EditableInput from 'react-editable-input';
// import PropTypes from 'prop-types';
import { Form, FormGroup, Input, Row, Col, InputGroup, InputGroupAddon } from 'reactstrap';
import { rootURL } from '../restInfo.js';
import UncontrolledTextInput from '../UnControlledTextInput.jsx';
import SaveItemDetailsBtn from '../Buttons/SaveItemDetailsBtn.jsx';
// import InlineEdit from 'react-edit-inline';
// var EditableInput = require('react-editable-input').default; 
export default class EditInventoryItemDisplay extends React.Component {
    constructor(props) {
        super(props);

        //since the URL section is not directly related to rendering,
        //it shouldn't be part of state. Save it in a class variable.
        this.URLsection = "/items";

        this.itemNumChanged = this.itemNumChanged.bind(this);
        this.itemRenterNameChanged = this.itemRenterNameChanged.bind(this);
        this.itemDescChanged = this.itemDescChanged.bind(this);
        this.itemTypeChanged = this.itemTypeChanged.bind(this);

        this.save = this.save.bind(this);

        this.state = {
            // initially is number that's passed
         
            itemNum: this.props.number,
            itemRenterName: this.props.renterName,
            itemDesc: this.props.desc,
            itemType: this.props.type

        };

/*         this.itemNum = this.props.number;
        this.itemRenterName = this.props.renterName;
        this.itemDesc = this.props.desc;
        this.itemType = this.props.type; */
    }

    itemNumChanged(e) 
    {
        console.log("in itemNumChanged:  " + e.target.value);
        console.log("old itemNum value:  " + this.state.itemNum);

        this.itemNum = e.target.value;

        this.setState({
            itemNum: e.target.value
        });

        console.log("new itemNum value:  " + this.state.itemNum);
    }

      itemRenterNameChanged(e) 
      {
        console.log("in itemRenterNameChanged:  " + e.target.value);
        this.itemRenterName = e.target.value;

        this.setState({
            itemRenterName: e.target.value
        });

        console.log("new itemRenterName value:  " + this.state.itemRenterName);
      }

      itemDescChanged(e) 
      {
        console.log("in itemDescChanged:  " + e.target.value);
        this.itemDesc = e.target.value;

        this.setState({
            itemDesc: e.target.value
        });

        console.log("new itemDesc value:  " + this.state.itemDesc);
      }

      itemTypeChanged(e) 
      {
        console.log("in itemTypeChanged:  " + e.target.value);
        this.itemType = e.target.value;

        this.setState({
            itemType: e.target.value
        });

        console.log("new itemType value:  " + this.state.itemType);
      }

        // CONTINUE TODO: 
        save()
        {
            console.log("clicked save, index: " + this.props.index);
            this.props.changeRowData(this.props.index, this.state.itemNum, this.state.itemRenterName, this.state.itemDesc, this.state.itemType);
        }
 

      // TODO IN INVENTORYSCREEN:
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
                                                    {/* <Input id="editInventoryItem" type='text' value={this.props.number} onChange={this.itemNumChanged}  />  */}
                                                    <UncontrolledTextInput
                                                        // inputProps      = {{className: 'inputTxtBoxes'}}
                                                        onBlur          = {this.itemNumChanged}
                                                        id              = "itemNumID"
                                                        defaultText     = {this.props.number}
                                                       // newTextValue        = {this.itemNumChanged}
                                                       // changeIndicator = {this.props.number}
                                                    />
                                                </InputGroup>
                                                <br />
                                                <InputGroup>
                                                    <InputGroupAddon >Rented By: </InputGroupAddon>
                                                    <UncontrolledTextInput
                                                        onBlur          = {this.itemRenterNameChanged}
                                                        id              = "itemRenterNameID"
                                                        defaultText     = {this.props.renterName}
                                                    />
                                                </InputGroup>
                                                
                                            </div>
                                        </Col>
                                        <Col>
                                            <div>
                                                <InputGroup>
                                                    <InputGroupAddon >Item Description: </InputGroupAddon>
                                                    <UncontrolledTextInput
                                                        onBlur          = {this.itemDescChanged}
                                                        id              = "itemDescID"
                                                        defaultText     = {this.props.desc}
                                                    />
                                                </InputGroup>
                                                <br />
                                                <InputGroup>
                                                    <InputGroupAddon >Item Type: </InputGroupAddon>
                                                    <UncontrolledTextInput
                                                        onBlur          = {this.itemTypeChanged}
                                                        id              = "itemTypeID"
                                                        defaultText     = {this.props.type}
                                                    />
                                                </InputGroup>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            } 
                            footerText = {
                                <SaveItemDetailsBtn buttonText={"SAVE"} itemDetailsFields={this.props} onClick={this.save} />
                            }
                        />
                    </Col>
                </Row>
            </div>
        );
    }
};