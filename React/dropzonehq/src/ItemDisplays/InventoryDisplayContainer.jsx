import React from 'react';
import ItemDisplay from './ItemDisplay.jsx';
import { Form, FormGroup, Input, Row, Col, InputGroup, InputGroupAddon } from 'reactstrap';
import { rootURL } from '../restInfo.js';
import UncontrolledTextInput from '../UnControlledTextInput.jsx';
import SaveItemDetailsBtn from '../Buttons/SaveItemDetailsBtn.jsx';

// import EditableInput from 'react-editable-input';
// import PropTypes from 'prop-types';
// import InlineEdit from 'react-edit-inline';
// var EditableInput = require('react-editable-input').default; 

export default class InventoryDisplayContainer extends React.Component {
    constructor(props) {
        super(props);

        //since the URL section is not directly related to rendering,
        //it shouldn't be part of state. Save it in a class variable.
        this.URLsection = "/items";

        this.manufacturerChanged = this.manufacturerChanged.bind(this);
        this.brandChanged = this.brandChanged.bind(this);
        this.descriptionChanged = this.descriptionChanged.bind(this);
        this.is_rentableChanged = this.is_rentableChanged.bind(this);
        
        this.is_on_rigChanged = this.is_on_rigChanged.bind(this);
        this.is_availableChanged = this.is_availableChanged.bind(this);
        this.item_typeChanged = this.item_typeChanged.bind(this);
        this.rig_numberChanged = this.rig_numberChanged.bind(this);
        
        this.aadChanged = this.aadChanged.bind(this);
        this.containerChanged = this.containerChanged.bind(this);      
        this.isTandemChanged = this.isTandemChanged.bind(this);
        this.canopy_on_rigChanged = this.canopy_on_rigChanged.bind(this);
        
        this.jump_countChanged = this.jump_countChanged.bind(this);
        this.date_of_manufactureChanged = this.date_of_manufactureChanged.bind(this);
        this.sizeChanged = this.sizeChanged.bind(this);        
        this.canopy_snChanged = this.canopy_snChanged.bind(this);
        
        this.next_repack_dateChanged = this.next_repack_dateChanged.bind(this);
        this.packed_by_employee_idChanged = this.packed_by_employee_idChanged.bind(this);
        this.ride_countChanged = this.ride_countChanged.bind(this);
        this.container_snChanged = this.container_snChanged.bind(this);
        
        this.deployment_timestampChanged = this.deployment_timestampChanged.bind(this);
        this.aad_snChanged = this.aad_snChanged.bind(this);
        this.lifespanChanged = this.lifespanChanged.bind(this);

        this.save = this.save.bind(this);

        this.state = {
            // initially is manufacturer that's passed
            // values returned from 'all_items' View in DB
            manufacturer: this.props.manufacturer,
            brand: this.props.brand,
            description: this.props.description,
            is_rentable: this.props.is_rentable,
            is_on_rig: this.props.is_on_rig,
            is_available: this.props.is_available,
            item_type: this.props.item_type,
            rig_number: this.props.rig_number,
            aad: this.props.aad,
            container: this.props.container,
            isTandem: this.props.isTandem,
            canopy_on_rig: this.props.canopy_on_rig,
            jump_count: this.props.jump_count,
            date_of_manufacture: this.props.date_of_manufacture,
            size: this.props.size,
            canopy_sn: this.props.canopy_sn,
            next_repack_date: this.props.next_repack_date,
            packed_by_employee_id: this.props.packed_by_employee_id,
            ride_count: this.props.ride_count,
            container_sn: this.props.container_sn,
            deployment_timestamp: this.props.deployment_timestamp,
            aad_sn: this.props.aad_sn,
            lifespan: this.props.lifespan
            
        };

/*         this.manufacturer = this.props.manufacturer;
        this.brand = this.props.brand;
        this.description = this.props.description;
        this.is_rentable = this.props.is_rentable; */
    }

    manufacturerChanged(e) 
    {
        console.log("in manufacturerChanged:  " + e.target.value);
        console.log("old manufacturer value:  " + this.state.manufacturer);

        this.setState({
            manufacturer: e.target.value
        });

        console.log("new manufacturer value:  " + this.state.manufacturer);
    }

      brandChanged(e) 
      {
        console.log("in brandChanged:  " + e.target.value);

        this.setState({
            brand: e.target.value
        });

        console.log("new brand value:  " + this.state.brand);
      }

      descriptionChanged(e) 
      {
        console.log("in descriptionChanged:  " + e.target.value);

        this.setState({
            description: e.target.value
        });

        console.log("new description value:  " + this.state.description);
      }

      is_rentableChanged(e) 
      {
        console.log("in is_rentableChanged:  " + e.target.value);

        this.setState({
            is_rentable: e.target.value
        });

        console.log("new is_rentable value:  " + this.state.is_rentable);
      }

      is_on_rigChanged(e)
      {
        console.log("in is_on_rigChanged:  " + e.target.value);

        this.setState({
            is_on_rig: e.target.value
        });

        console.log("new is_on_rig value:  " + this.state.is_on_rig);       
      }

      is_availableChanged(e)
      {
        console.log("in is_availableChanged:  " + e.target.value);

        this.setState({
            is_available: e.target.value
        });

        console.log("new is_available value:  " + this.state.is_available);       
      }

      item_typeChanged(e)
      {
        console.log("in item_typeChanged:  " + e.target.value);

        this.setState({
            item_type: e.target.value
        });

        console.log("new item_type value:  " + this.state.item_type);       
      }

      rig_numberChanged(e)
      {
        console.log("in rig_numberChanged:  " + e.target.value);

        this.setState({
            rig_number: e.target.value
        });

        console.log("new rig_number value:  " + this.state.rig_number);       
      }

      aadChanged(e)
      {
        console.log("in aadChanged:  " + e.target.value);

        this.setState({
            aad: e.target.value
        });

        console.log("new aad value:  " + this.state.aad);       
      }

      containerChanged(e)
      {
        console.log("in containerChanged:  " + e.target.value);

        this.setState({
            container: e.target.value
        });

        console.log("new container value:  " + this.state.container);       
      }

      isTandemChanged(e)
      {
        console.log("in isTandemChanged:  " + e.target.value);

        this.setState({
            isTandem: e.target.value
        });

        console.log("new isTandem value:  " + this.state.isTandem);       
      }

      canopy_on_rigChanged(e)
      {
        console.log("in canopy_on_rigChanged:  " + e.target.value);

        this.setState({
            canopy_on_rig: e.target.value
        });

        console.log("new canopy_on_rig value:  " + this.state.canopy_on_rig);       
      }

      jump_countChanged(e)
      {
        console.log("in jump_countChanged:  " + e.target.value);

        this.setState({
            jump_count: e.target.value
        });

        console.log("new jump_count value:  " + this.state.jump_count);       
      }

      date_of_manufactureChanged(e)
      {
        console.log("in date_of_manufactureChanged:  " + e.target.value);

        this.setState({
            date_of_manufacture: e.target.value
        });

        console.log("new date_of_manufacture value:  " + this.state.date_of_manufacture);       
      }

      sizeChanged(e)
      {
        console.log("in sizeChanged:  " + e.target.value);

        this.setState({
            size: e.target.value
        });

        console.log("new size value:  " + this.state.size);       
      }

      canopy_snChanged(e)
      {
        console.log("in canopy_snChanged:  " + e.target.value);

        this.setState({
            canopy_sn: e.target.value
        });

        console.log("new canopy_sn value:  " + this.state.canopy_sn);       
      }

      next_repack_dateChanged(e)
      {
        console.log("in next_repack_dateChanged:  " + e.target.value);

        this.setState({
            next_repack_date: e.target.value
        });

        console.log("new next_repack_date value:  " + this.state.next_repack_date);       
      }

      packed_by_employee_idChanged(e)
      {
        console.log("in packed_by_employee_idChanged:  " + e.target.value);

        this.setState({
            packed_by_employee_id: e.target.value
        });

        console.log("new packed_by_employee_id value:  " + this.state.packed_by_employee_id);       
      }

      ride_countChanged(e)
      {
        console.log("in ride_countChanged:  " + e.target.value);

        this.setState({
            ride_count: e.target.value
        });

        console.log("new ride_count value:  " + this.state.ride_count);       
      }

      container_snChanged(e)
      {
        console.log("in container_snChanged:  " + e.target.value);

        this.setState({
            container_sn: e.target.value
        });

        console.log("new container_sn value:  " + this.state.container_sn);       
      }

      deployment_timestampChanged(e)
      {
        console.log("in deployment_timestampChanged:  " + e.target.value);

        this.setState({
            deployment_timestamp: e.target.value
        });

        console.log("new deployment_timestamp value:  " + this.state.deployment_timestamp);       
      }

      aad_snChanged(e)
      {
        console.log("in aad_snChanged:  " + e.target.value);

        this.setState({
            aad_sn: e.target.value
        });

        console.log("new aad_sn value:  " + this.state.aad_sn);       
      }

      lifespanChanged(e)
      {
        console.log("in lifespanChanged:  " + e.target.value);

        this.setState({
            lifespan: e.target.value
        });

        console.log("new lifespan value:  " + this.state.lifespan);       
      }


    save()
    {
        // TODO: SAVE TO DB, after success update data table view
        
        console.log("clicked save, item_id: " + this.props.item_id);
        this.props.updateContainerRow(this.props.item_id, this.state.manufacturer, this.state.description, this.state.is_on_rig,
                                    this.state.brand, this.state.is_rentable, this.container_sn
                            );
    }
 
    render() {
        return (
                <ItemDisplay headerText="Inventory Item Details"
                    statsToDisplay={
                            <Row>
                                <Col>
                                <br />
                                    <InputGroup>
                                        <InputGroupAddon > Manufacturer: </InputGroupAddon>
                                        {/* <Input id="editInventoryItem" type='text' value={this.props.manufacturer} onChange={this.manufacturerChanged}  />  */}
                                        <UncontrolledTextInput
                                            // inputProps      = {{className: 'inputTxtBoxes'}}
                                            onBlur          = {this.manufacturerChanged}
                                            id              = "manufacturerID"
                                            defaultText     = {this.props.manufacturer}
                                            // newTextValue        = {this.manufacturerChanged}
                                            // changeIndicator = {this.props.manufacturer}
                                        />
                                    </InputGroup>
                                    <br />
                                    <InputGroup>
                                        <InputGroupAddon >Brand: </InputGroupAddon>
                                        <UncontrolledTextInput
                                            onBlur          = {this.brandChanged}
                                            id              = "brandID"
                                            defaultText     = {this.props.brand}
                                        />
                                    </InputGroup>
                        
                                    <br />
                                    <InputGroup>
                                        <InputGroupAddon >On a Rig: </InputGroupAddon>
                                        <Input type="select" 
                                            value={this.props.is_on_rig}
                                            onChange={this.is_on_rigChanged}
                                            id="is_on_rigID"
                                        >
                                        <option value={true}>Is on a rig</option>
                                        <option value={false}>NOT on a rig</option>
                                        </Input>
                                    </InputGroup>

                                    <br />
                                    <InputGroup>
                                        <InputGroupAddon >Container: </InputGroupAddon>
                                        <UncontrolledTextInput
                                            onBlur          = {this.containerChanged}
                                            id              = "brandID"
                                            defaultText     = {this.props.brand}
                                        />
                                    </InputGroup>
                                    <br />
                                </Col>
                                <Col>
                                    <br />
                                    <InputGroup>
                                        <InputGroupAddon >Description: </InputGroupAddon>
                                        <UncontrolledTextInput
                                            onBlur          = {this.descriptionChanged}
                                            id              = "descriptionID"
                                            defaultText     = {this.props.description}
                                        />
                                    </InputGroup>
                                    <br />
                                    <InputGroup>
                                        <InputGroupAddon >Rentable: </InputGroupAddon>
                                            <Input type="select" 
                                            value={this.props.is_rentable}
                                            onChange={this.is_rentableChanged}
                                            id="is_rentableID"
                                        >
                                        <option value={true}>Is rentable</option>
                                        <option value={false}>Is NOT rentable</option>
                                        </Input>
                                    </InputGroup>
                                
                                    <br />
                                    <InputGroup>
                                        <InputGroupAddon >Item Type: </InputGroupAddon>
                                        <UncontrolledTextInput
                                            onBlur          = {this.item_typeChanged}
                                            id              = "item_typeID"
                                            defaultText     = {this.props.item_type}
                                        />
                                    </InputGroup>
                                    <br />
                                </Col>
                            </Row>                 

                    } 
                    footerText = {
                        <SaveItemDetailsBtn buttonText={"SAVE"} itemDetailsFields={this.props} onClick={this.save} />
                    }
                />

        );
    }
};