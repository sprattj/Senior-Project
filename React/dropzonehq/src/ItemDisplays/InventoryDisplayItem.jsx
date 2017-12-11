import React from 'react';
import ItemDisplay from './ItemDisplay.jsx';
import { Form, FormGroup, Input, Row, Col, InputGroup, InputGroupAddon, Button } from 'reactstrap';
import { rootURL } from '../restInfo.js';
import UncontrolledTextInput from '../UnControlledTextInput.jsx';
import UnControlledSelectDDL from '../UnControlledSelectDDL.jsx';
import Checkbox from '../CheckBox/Checkbox.js';
import 'bootstrap/dist/css/bootstrap.css';
import "../Checkboxes.css"; 
import Binder from '../Binder.js';


var rentalOptions = [
    { text: "Is Rentable" },
    { text: "Is NOT Rentable" }
];

var rigOptions = [
    { text: "Is on a Rig" },
    { text: "Is NOT on a Rig" }
];

export default class InventoryDisplayItem extends React.Component {
    constructor(props) {
        super(props);

        //create a new binder and bind all of the methods in this class
        var binder = new Binder();
        binder.bindAll(this, InventoryDisplayItem);

        this.state = 
        {
            item_id: this.props.defaultItemInfo.item_id,
            item_type_id: this.props.defaultItemInfo.item_type_id,
            manufacturer: this.props.defaultItemInfo.manufacturer,
            brand: this.props.defaultItemInfo.brand,
            description: this.props.defaultItemInfo.description,
            is_rentable: this.props.defaultItemInfo.is_rentable,
            is_on_rig: this.props.defaultItemInfo.is_on_rig,
            is_available: this.props.defaultItemInfo.is_available
        }

        console.log("ITEM.STATE CONSTRUCTOR: " + JSON.stringify(this.state));
    }

 /*    componentDidMount() {
        this.setState({
            manufacturer: this.props.defaultItemInfo.manufacturer,
            brand: this.props.defaultItemInfo.brand,
            description: this.props.defaultItemInfo.description,
            is_rentable: this.props.defaultItemInfo.is_rentable,
            is_on_rig: this.props.defaultItemInfo.is_on_rig,
            is_available: this.props.defaultItemInfo.is_available
        })

        console.log("in componentDidMount (InvDisplayItem)");
        console.log("is_rentable: " + this.state.is_rentable + " is_on_rig: " + this.state.is_on_rig);
    } */

    componentWillReceiveProps(newProps)
    {
        console.log("in componentWillReceiveProps (InvDisplayItem) newProps: " + JSON.stringify(newProps) + "\n");

        this.setState({
            item_id: newProps.defaultItemInfo.item_id,
            item_type_id: newProps.defaultItemInfo.item_type_id,            
            manufacturer: newProps.defaultItemInfo.manufacturer,
            brand: newProps.defaultItemInfo.brand,
            description: newProps.defaultItemInfo.description,
            is_rentable: newProps.defaultItemInfo.is_rentable,
            is_on_rig: newProps.defaultItemInfo.is_on_rig,
            is_available: newProps.defaultItemInfo.is_available
        }) 
    }

    manufacturerChanged(e) {
        this.setState({
            manufacturer: e.target.value
        });
    }

    brandChanged(e) {
        this.setState({
            brand: e.target.value
        });
    }

    descriptionChanged(e) {
        this.setState({
            description: e.target.value
        });
    }

    // THIS was using Select from link (react-select)
/*     handle_is_rentableChanged = (selectedOption) => {
        this.setState({ is_rentable: selectedOption });
        console.log("is_rentable: " + this.state.is_rentable.value);
        console.log(`Selected: ${selectedOption.label}`);
    } */

    is_rentableChanged(e) {
        console.log("in is_rentableChanged new value:" + e.target.checked);
        console.log("passed in props for is_rentable: " + this.props.defaultItemInfo.is_rentable);
        console.log("current is_rentable: " + this.state.is_rentable);
        this.setState({
            is_rentable: e.target.checked
        });
        console.log("after setState is_rentable: " + this.state.is_rentable);
    }

    is_on_rigChanged(e) {
        console.log("in is_on_rigChange e:" + e.target.checked);
        this.setState({
            is_on_rig: e.target.checked
        });
        console.log("is_on_rig: " + this.state.is_on_rig);
    }

    is_availableChanged(e) {
        this.setState({
            is_available: e.target.value
        });
    }

    updateItemInfo() {
        this.props.updateItemInfo(this.state);
        console.log("on Save: is_rentable: " + this.state.is_rentable);
    }

    render() {
        return (
            <div className="form-check mb-2 mr-sm-2 mb-sm-0">
                <Row>
                    <InputGroup>
                        <InputGroupAddon > Manufacturer: </InputGroupAddon>
                        {/* <UncontrolledTextInput
                            onBlur={this.manufacturerChanged}
                            id="manufacturerID"
                            defaultText={this.props.defaultItemInfo.manufacturer}
                        /> */}
                        <input type="text" value={this.state.manufacturer} onChange={this.manufacturerChanged}  />
                    </InputGroup>
                    <InputGroup>
                        <InputGroupAddon >Brand: </InputGroupAddon>
                        {/* <UncontrolledTextInput
                            onBlur={this.brandChanged}
                            id="brandID"
                            defaultText={this.props.defaultItemInfo.brand}
                        /> */}
                        <input type="text" value={this.state.brand} onChange={this.brandChanged}  />
                    </InputGroup>
                </Row>
                <Row>
                    <InputGroup>
                        <InputGroupAddon >Description: </InputGroupAddon>
                        {/* <UncontrolledTextInput
                            onBlur={this.descriptionChanged}
                            id="descriptionID"
                            defaultText={this.props.defaultItemInfo.description}
                        /> */}
                        <input type="text" value={this.state.description} onChange={this.descriptionChanged}  />
                    </InputGroup>
                    <InputGroup>
                        <InputGroupAddon >Rentable: </InputGroupAddon>
                        {/* <select
                            // value={this.props.defaultItemInfo.is_rentable}
                            defaultValue={this.props.defaultItemInfo.is_rentable}
                            onChange={this.is_rentableChanged}
                            id="is_rentableID" >
                        
                            <option value={true}>Is on a rig</option>
                            <option value={false}>NOT on a rig</option>
                           
                        </select> */}
                        {/* <UnControlledSelectDDL 
                            defaultValue={this.props.defaultItemInfo.is_rentable}// ? "true" : "false"}
                            id="is_rentableID"
                            onChange={this.is_rentableChanged }
                            options={rentalOptions}
                            /> */}
                        <label className="form-check-label">
                            <input type="checkbox" className="form-check-input" checked={this.state.is_rentable} onChange={this.is_rentableChanged}  
                            />
                        </label>
                      {/*   <div className="[ btn-group ]">       
                            <label htmlFor="fancy-checkbox-info" className="[ btn btn-info ]">
                                <span className="[ glyphicon glyphicon-ok ]"></span>
                                <span> </span>
                            </label>
                            <label htmlFor="fancy-checkbox-info" className="[ btn btn-default active ]">
                                Info Checkbox
                            </label>
                        </div>    */}
                    </InputGroup>
                </Row>
                <Row>
                    <InputGroup>
                        <InputGroupAddon >On a Rig: </InputGroupAddon>
                        <label className="form-check-label">
                            <input type="checkbox" className="form-check-input" checked={this.state.is_on_rig} onChange={this.is_on_rigChanged}  
                            />
                        </label>
                    </InputGroup>
                </Row>
                <Row>
                    <Button size="lg" color="primary" onClick={this.updateItemInfo}>Save</Button>
                </Row>
            </div>
        );
    }
};