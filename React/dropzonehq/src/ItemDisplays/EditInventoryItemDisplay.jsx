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
export default class EditInventoryItemDisplay extends React.Component {
    constructor(props) {
        super(props);

        this.URLsection = "/editInventoryItemDisplay";
        this.inventoryItemNumChanged = this.inventoryItemNumChanged.bind(this);
        this.save = this.save.bind(this);
        this.itemNumb = this.props.number;
    }
    inventoryItemNumChanged(e) {
        console.log("in inventoryItemNumChanged:  " + e.target.value);
        this.itemNumb = e.target.value;
        console.log("new itemNumb value:  " + this.itemNumb);
    }

    save() {
        console.log("itemNumb: " + this.itemNumb);
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
                                                    <UncontrolledTextInput
                                                        onBlur={this.inventoryItemNumChanged}
                                                        id="myID"
                                                        defaultText={this.props.number}
                                                    />
                                                </InputGroup>
                                                <br />
                                                <InputGroup>
                                                    <InputGroupAddon >Rented By: </InputGroupAddon>
                                                    <Input id="itemRenterName" type='text' value={this.props.renterName} onChange={this.inventoryItemNumChanged} />
                                                </InputGroup>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            }
                            footerText={
                                <SaveItemDetailsBtn buttonText={"SAVE"} itemDetailsFields={this.props} onClick={this.save} />
                            }
                        />
                    </Col>
                </Row>
            </div>
        );
    }
};